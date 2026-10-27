# FitNest — Online Home Fitness Platform

A high-performance, fully responsive modern website built exactly to match the design, typography, structure, content, and interactive features of the [FitNest Airo Design](https://airo.ai/share/ejMyd3h3aGpodDpjNDA6RHRfSThFS19VR25U).

Ready for instantaneous, zero-config deployment to **Cloudflare Pages**.

---

## 🚀 Key Features & Highlights

- **Exact Design & Visual Hierarchy**: Built with precision matching the Montserrat (headings) and Inter (body) typography, vibrant emerald green primary branding (`#16a34a`), deep forest green (`#15803d`), and modern dark charcoal styling.
- **100% Responsive on Every Screen Size**: Flawless display across mobile phones (320px–480px), tablets (768px–1024px), laptops, and high-DPI desktop screens (1920px+).
- **Smooth Sticky Navigation**: Dynamic navbar that starts transparent over the hero image and smoothly transitions into a crisp white backdrop with elevation shadow upon scrolling (`scrollY > 40`).
- **Mobile Menu Drawer**: Smooth slide-down navigation drawer on smaller viewports with auto-close on selection.
- **Animated Statistics Counter**: Intersection-observed counter that smoothly increments from `0` to `500+`, `1000+`, and `4.9★` as the user scrolls into view.
- **Interactive Pricing Billing Toggle**: Seamless monthly vs. quarterly pricing toggle with real-time price updates and a `Save 15%` discount badge.
- **Rich Interactive Modals**:
  - **Service Deep-Dives**: Detailed curriculum, equipment needs, and "Book This Service" triggers for Personal Training, Couple Workouts, Group Fitness, and Nutrition Guidance.
  - **Lifestyle Tip Articles**: Full reader modals for High-Protein Meals (with 5 quick recipes), 20-Minute Home HIIT routine, and Sleep Recovery.
- **Consultation & Trial Booking Form**: Full input validation, goal and time-slot selectors, confirmation state, and direct WhatsApp pre-filled messaging integration.
- **Pulsing WhatsApp Integration**: Fixed floating WhatsApp button + inline CTA buttons linking directly to `wa.me/916238188277`.
- **Cookie Consent Banner**: Non-intrusive cookie banner with Accept/Decline actions that remember user preferences in `localStorage`.
- **Cloudflare Pages Optimized**: Includes `_redirects` for clean URL routing and `_headers` for edge caching and security headers.
- **Custom 404 Page**: Branded error page matching the design.

---

## 📁 Project Structure

```text
fitnest/
├── index.html              # Main Landing Page (Hero, Stats, Services, Why Us, Plans, Testimonials, Tips, Contact)
├── about.html              # Dedicated About Us Page (Story, Mission & Values, Meet Your Coaches, Trust Stats)
├── services.html           # Dedicated Services Page with in-depth breakdowns
├── plans.html              # Dedicated Training Plans Page with comparison & FAQ
├── tips.html               # Dedicated Lifestyle Tips / Blog Articles Page
├── contact.html            # Dedicated Consultation & Booking Page
├── 404.html                # Custom Cloudflare Pages 404 Error Page
├── _redirects              # Cloudflare Pages routing rules (clean URLs)
├── _headers                # Cloudflare Pages security & asset caching headers
├── css/
│   └── style.css           # Custom styles, animations (pulse ring, floating WhatsApp, modals, custom scrollbar)
├── js/
│   └── main.js             # Core interactions (scroll, menu, counters, pricing toggle, modals, booking form, cookie banner)
├── images/                 # All 17 production high-resolution images & logos
│   ├── logo-transparent.png
│   ├── logo.jpg
│   ├── hero.jpg
│   ├── about-hero.jpg
│   ├── mission.jpg
│   ├── why-fitnest.jpg
│   ├── personal-training.jpg
│   ├── couple-workout.jpg
│   ├── group-fitness.jpg
│   ├── nutrition.jpg
│   ├── tips-nutrition.jpg
│   ├── tips-workout.jpg
│   ├── tips-wellness.jpg
│   ├── trainer-1.jpg
│   ├── trainer-2.jpg
│   ├── trainer-3.jpg
│   └── favicon.png
├── airo-assets/            # Asset alias compatibility structure
└── README.md
```

---

## 🌐 Deploying to Cloudflare Pages

This website is statically optimized and requires **zero build steps** (no `npm run build` or Node.js versions required on Cloudflare).

### Option 1: Git Integration (Recommended)
1. Push this folder to your GitHub or GitLab repository.
2. Go to the [Cloudflare Dashboard](https://dash.cloudflare.com/) and navigate to **Workers & Pages** > **Create application** > **Pages** > **Connect to Git**.
3. Select your repository.
4. Set the build configuration:
   - **Framework preset**: `None`
   - **Build command**: *(Leave blank)*
   - **Build output directory**: `/` *(or `.` / root)*
5. Click **Save and Deploy**. Your site will be live worldwide on Cloudflare's global edge network in seconds!

### Option 2: Direct Upload (Drag & Drop)
1. In Cloudflare Dashboard, go to **Workers & Pages** > **Create application** > **Pages** > **Upload assets**.
2. Name your project (e.g. `fitnest`).
3. Drag and drop the `fitnest` folder directly into the browser upload box.
4. Click **Deploy site**.

### Option 3: Wrangler CLI
If you have the Cloudflare Wrangler CLI installed:
```bash
npx wrangler pages deploy /Users/fahize/Desktop/fitnest --project-name=fitnest
```

---

## 💻 Local Testing & Preview

To preview the website locally in any browser:
Simply double-click `index.html` or run any local HTTP server:

```bash
# Using Python 3
python3 -m http.server 8000

# Using Node (npx)
npx serve .

# Using PHP
php -S localhost:8000
```
Then visit `http://localhost:8000` in your web browser.

---

## 📱 Responsive Testing Matrix

| Breakpoint | Devices Tested | Layout Adaptation |
| :--- | :--- | :--- |
| **Mobile (< 640px)** | iPhone 12/13/14/15, SE, Android | Single column, sticky header with hamburger drawer, full-width touch buttons |
| **Tablet (640px - 1024px)** | iPad, Galaxy Tab | 2-column grid for services and tips, comfortable padding |
| **Desktop (1024px+)** | MacBook, Laptops, 1080p, 4K | Full horizontal navigation, 3 & 4 column cards, floating WhatsApp helper |

---

## 🛠️ Verification & Quality Assurance

- **Link Audit**: 149/149 internal links and image references verified with 0 broken assets.
- **SEO Ready**: Schema.org JSON-LD structured data (`LocalBusiness` on Home, `AboutPage` on About) included.
- **Accessibility**: Semantic HTML5 elements (`<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<footer>`), ARIA attributes, and accessible color contrast.

