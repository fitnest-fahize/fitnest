#!/usr/bin/env perl
use strict;
use warnings;
use IO::Socket::INET;
use File::Basename;
use Cwd qw(abs_path);

$SIG{PIPE} = 'IGNORE';

my $port = $ENV{PORT} || 3000;
my $root = abs_path(dirname(__FILE__));

my %mime_types = (
    'html' => 'text/html; charset=utf-8',
    'css'  => 'text/css; charset=utf-8',
    'js'   => 'application/javascript; charset=utf-8',
    'json' => 'application/json; charset=utf-8',
    'png'  => 'image/png',
    'jpg'  => 'image/jpeg',
    'jpeg' => 'image/jpeg',
    'ico'  => 'image/x-icon',
    'svg'  => 'image/svg+xml',
    'txt'  => 'text/plain; charset=utf-8',
);

my $server = IO::Socket::INET->new(
    LocalHost => '127.0.0.1',
    LocalPort => $port,
    Proto     => 'tcp',
    Listen    => 32,
    Reuse     => 1,
) or die "Cannot create socket on port $port: $!\n";

print "FitNest Dev Server running at http://127.0.0.1:$port/ (or http://localhost:$port/)\n";
print "Serving root directory: $root\n";
$| = 1;

while (my $client = $server->accept()) {
    my $req_line = <$client>;
    next unless $req_line;

    my ($method, $path) = split(/\s+/, $req_line);
    $path //= '/';
    $path =~ s/\?.*$//; # Remove query string

    # Drain remaining headers
    while (my $h = <$client>) {
        last if $h =~ /^\r?\n$/;
    }

    # Map paths
    if ($path eq '/' || $path eq '') {
        $path = '/index.html';
    } elsif ($path !~ /\.[a-zA-Z0-9]+$/) {
        # Clean URLs: /about -> /about.html
        if (-f "$root$path.html") {
            $path .= '.html';
        }
    }

    my $file_path = "$root$path";

    if (! -f $file_path) {
        # Check 404
        $file_path = "$root/404.html";
        if (-f $file_path) {
            serve_file($client, $file_path, 404, 'text/html; charset=utf-8');
        } else {
            print $client "HTTP/1.1 404 Not Found\r\nContent-Type: text/plain\r\nConnection: close\r\n\r\n404 Not Found\n";
        }
    } else {
        my ($ext) = $file_path =~ /\.([a-zA-Z0-9]+)$/;
        $ext = lc($ext // '');
        my $ct = $mime_types{$ext} || 'application/octet-stream';
        serve_file($client, $file_path, 200, $ct);
    }

    close $client;
}

sub serve_file {
    my ($client, $path, $status, $ct) = @_;
    my $status_text = ($status == 200) ? '200 OK' : '404 Not Found';
    my $size = -s $path;

    if (open my $fh, '<:raw', $path) {
        print $client "HTTP/1.1 $status_text\r\n";
        print $client "Content-Type: $ct\r\n";
        print $client "Content-Length: $size\r\n";
        print $client "Access-Control-Allow-Origin: *\r\n";
        print $client "Connection: close\r\n\r\n";

        my $buffer;
        while (my $bytes = read($fh, $buffer, 65536)) {
            print $client $buffer;
        }
        close $fh;
    } else {
        print $client "HTTP/1.1 500 Internal Error\r\nContent-Type: text/plain\r\nConnection: close\r\n\r\nError reading file\n";
    }
}
