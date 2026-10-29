/**
 * FitNest — Core JavaScript
 * Handles navigation, stats counter, interactive modals, form submission, and cookie consent.
 */

document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initMobileMenu();
  initStatsCounter();
  initPricingToggle();
  initModals();
  initBookingForm();
  initCookieBanner();
  initSmoothScroll();
});

/* ─── 1. Navbar Scroll Effect ─── */
function initNavbar() {
  const header = document.querySelector('header');
  if (!header) return;

  function handleScroll() {
    if (window.scrollY > 40) {
      header.classList.add('header-scrolled');
    } else {
      header.classList.remove('header-scrolled');
    }
  }

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll(); // Initial check
}

/* ─── 2. Mobile Menu Drawer ─── */
function initMobileMenu() {
  const toggleBtn = document.getElementById('mobile-menu-toggle');
  const menu = document.getElementById('mobile-menu');
  const iconOpen = document.getElementById('icon-menu');
  const iconClose = document.getElementById('icon-close');

  if (!toggleBtn || !menu) return;

  function toggle() {
    const isOpen = !menu.classList.contains('hidden');
    if (isOpen) {
      menu.classList.add('hidden');
      if (iconOpen) iconOpen.classList.remove('hidden');
      if (iconClose) iconClose.classList.add('hidden');
    } else {
      menu.classList.remove('hidden');
      if (iconOpen) iconOpen.classList.add('hidden');
      if (iconClose) iconClose.classList.remove('hidden');
    }
  }

  toggleBtn.addEventListener('click', toggle);

  // Close when clicking a link
  menu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      menu.classList.add('hidden');
      if (iconOpen) iconOpen.classList.remove('hidden');
      if (iconClose) iconClose.classList.add('hidden');
    });
  });
}

/* ─── 3. Animated Statistics Counter ─── */
function initStatsCounter() {
  const statElements = document.querySelectorAll('[data-counter-target]');
  if (!statElements.length) return;

  let hasAnimated = false;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !hasAnimated) {
        hasAnimated = true;
        statElements.forEach(el => animateStat(el));
      }
    });
  }, { threshold: 0.2 });

  const statsSection = document.getElementById('stats');
  if (statsSection) {
    observer.observe(statsSection);
  } else if (statElements[0]) {
    observer.observe(statElements[0]);
  }

  function animateStat(el) {
    const target = parseFloat(el.getAttribute('data-counter-target') || '0');
    const isDecimal = target % 1 !== 0;
    const duration = 1800;
    const steps = 60;
    const increment = target / steps;
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        el.textContent = isDecimal ? target.toFixed(1) : Math.round(target);
        clearInterval(timer);
      } else {
        el.textContent = isDecimal ? current.toFixed(1) : Math.floor(current);
      }
    }, duration / steps);
  }
}

/* ─── 4. Pricing Plans Monthly / Quarterly Toggle ─── */
function initPricingToggle() {
  const toggle = document.getElementById('pricing-billing-toggle');
  if (!toggle) return;

  const starterPrice = document.getElementById('price-starter');
  const proPrice = document.getElementById('price-pro');
  const elitePrice = document.getElementById('price-elite');

  toggle.addEventListener('change', () => {
    const isQuarterly = toggle.checked;

    if (starterPrice) {
      starterPrice.textContent = isQuarterly ? '₹2,299' : '₹899';
    }
    if (proPrice) {
      proPrice.textContent = isQuarterly ? '₹9,999' : '₹3,999';
    }
    if (elitePrice) {
      elitePrice.textContent = isQuarterly ? '₹14,999' : '₹5,999';
    }

    document.querySelectorAll('.pricing-period').forEach(el => {
      el.textContent = isQuarterly ? '/quarter (Save 15%)' : '/month';
    });
  });
}

/* ─── 5. Rich Content Data for Modals ─── */
const serviceData = {
  'personal-training': {
    title: 'Personal Training (1-on-1 Live)',
    tag: '1-on-1 Live Video',
    image: 'images/personal-training.jpg',
    description: 'Transform your body with dedicated 1-on-1 private video sessions led by an elite NASM/ACE certified personal trainer.',
    features: [
      'Tailored workouts customized to your anatomy, fitness level, and schedule',
      'Real-time form correction through high-definition live video coaching',
      'Personalized strength, fat loss, or mobility progression plan',
      'Regular progress tracking, body circumference logs, and milestone assessments',
      'Direct WhatsApp access to your trainer for daily habit and recovery questions'
    ]
  },
  'couple-workout': {
    title: 'Couple Workouts (Train Together)',
    tag: 'Duo Home Fitness',
    image: 'images/couple-workout.jpg',
    description: 'Double the motivation and make fitness a healthy shared habit. Our couple sessions are tailored to accommodate differing fitness levels in the same session.',
    features: [
      'Customized duo workouts that challenge both partners at their individual fitness levels',
      'Partner workout challenges and accountability milestones',
      'Fun, engaging exercises designed for living room workout spaces',
      'Flexible joint scheduling that fits working couples',
      'Combined nutritional meal guidance for your household'
    ]
  },
  'group-fitness': {
    title: 'Group Fitness Sessions',
    tag: 'Community Energy',
    image: 'images/group-fitness.jpg',
    description: 'Experience the electric energy of high-octane group fitness classes from the comfort of your living room.',
    features: [
      'High-energy live sessions with certified trainers and motivating playlists',
      'HIIT, functional training, core burn, and cardio endurance formats',
      'Small group sizes (max 10 participants) so coach watches your form',
      'Supportive community of like-minded fitness enthusiasts across India',
      'Affordable entry point for consistent weekday workout discipline'
    ]
  },
  'nutrition': {
    title: 'Nutrition & Diet Guidance',
    tag: 'Eat Smart & Sustainable',
    image: 'images/nutrition.jpg',
    description: 'No crash diets, starvation, or cutting out your favorite Indian foods. Practical, science-backed nutrition engineered for lasting results.',
    features: [
      'Calculated macronutrient and caloric targets tailored to your metabolic rate',
      'Balanced meal plans incorporating wholesome Indian home-cooked foods',
      'Practical dining-out guidelines and festival/travel nutrition strategies',
      'Weekly grocery shopping lists and healthy meal prep cheatsheets',
      'Continuous adjustments based on your energy levels and body response'
    ]
  }
};

const tipData = {
  'tip-1': {
    category: 'Nutrition',
    title: '5 Easy High-Protein Meals You Can Make in 15 Minutes',
    image: 'images/tips-nutrition.jpg',
    readTime: '4 min read',
    content: `
      <p class="text-gray-600 mb-4 leading-relaxed">Getting enough protein is essential for muscle repair, fat loss, and sustained energy. You don't need hours in the kitchen to hit your daily protein targets. Here are 5 delicious Indian and continental meal ideas you can whip up in 15 minutes:</p>
      <div class="space-y-4 my-6">
        <div class="p-4 bg-gray-50 rounded-xl border border-gray-100">
          <h4 class="font-bold text-gray-900 mb-1">1. Paneer & Veggie Sauté with Jeera</h4>
          <p class="text-sm text-gray-600">200g low-fat paneer cubed, tossed in 1 tsp olive oil with bell peppers, onions, tomatoes, and jeera. Yields ~36g protein in 10 minutes.</p>
        </div>
        <div class="p-4 bg-gray-50 rounded-xl border border-gray-100">
          <h4 class="font-bold text-gray-900 mb-1">2. Spiced Moong Sprout Bowl</h4>
          <p class="text-sm text-gray-600">Steamed green moong sprouts tossed with diced cucumber, tomatoes, green chilies, lemon juice, chaat masala, and roasted peanuts. Packed with fiber and 20g clean plant protein.</p>
        </div>
        <div class="p-4 bg-gray-50 rounded-xl border border-gray-100">
          <h4 class="font-bold text-gray-900 mb-1">3. Masala Egg Bhurji on Whole Wheat Toast</h4>
          <p class="text-sm text-gray-600">3 whole eggs scrambled with onions, tomatoes, turmeric, and coriander. Served on 2 slices of multigrain toast. Delivers 24g bioavailable protein.</p>
        </div>
        <div class="p-4 bg-gray-50 rounded-xl border border-gray-100">
          <h4 class="font-bold text-gray-900 mb-1">4. Greek Yogurt Smoothie Power Bowl</h4>
          <p class="text-sm text-gray-600">200g unflavored Greek yogurt blended with half a banana, cinnamon, and 1 scoop of whey or sattu. Top with chia seeds and almonds for 32g protein.</p>
        </div>
        <div class="p-4 bg-gray-50 rounded-xl border border-gray-100">
          <h4 class="font-bold text-gray-900 mb-1">5. Tofu & Spinach Scramble</h4>
          <p class="text-sm text-gray-600">Crumbled firm tofu sauteed with garlic, turmeric, black pepper, and baby spinach. Quick, light, anti-inflammatory, and 25g 100% plant protein.</p>
        </div>
      </div>
      <p class="text-gray-600 leading-relaxed">Remember: Consistency in meeting your daily protein targets beats perfection. Aim for 1.2 to 1.8 grams of protein per kilogram of body weight depending on your activity level.</p>
    `
  },
  'tip-2': {
    category: 'Workout',
    title: 'The 20-Minute Home HIIT Routine That Actually Works',
    image: 'images/tips-workout.jpg',
    readTime: '5 min read',
    content: `
      <p class="text-gray-600 mb-4 leading-relaxed">High-Intensity Interval Training (HIIT) is scientifically proven to maximize calorie burn and cardiovascular endurance in minimal time through the EPOC effect (excess post-exercise oxygen consumption).</p>
      <div class="bg-emerald-50 border border-emerald-100 rounded-xl p-4 mb-6">
        <p class="text-emerald-800 text-sm font-semibold">Protocol: 40 seconds work, 20 seconds rest. 4 rounds total with 60 seconds rest between rounds. Total time: 20 minutes.</p>
      </div>
      <div class="space-y-3 my-6">
        <div class="flex items-start gap-3 p-3 border-b border-gray-100">
          <span class="w-7 h-7 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold text-xs shrink-0">1</span>
          <div>
            <h5 class="font-bold text-gray-900">High Knees / Modified Marching</h5>
            <p class="text-xs text-gray-600">Engage your core and drive knees upward in a rhythmic sprint pattern.</p>
          </div>
        </div>
        <div class="flex items-start gap-3 p-3 border-b border-gray-100">
          <span class="w-7 h-7 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold text-xs shrink-0">2</span>
          <div>
            <h5 class="font-bold text-gray-900">Bodyweight Squats to Pulse</h5>
            <p class="text-xs text-gray-600">Lower into a deep squat, perform one pulse at the bottom, then drive through heels to stand.</p>
          </div>
        </div>
        <div class="flex items-start gap-3 p-3 border-b border-gray-100">
          <span class="w-7 h-7 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold text-xs shrink-0">3</span>
          <div>
            <h5 class="font-bold text-gray-900">Incline or Floor Push-ups</h5>
            <p class="text-xs text-gray-600">Keep elbows tucked at 45 degrees. Drop to knees or use a sturdy sofa for regression.</p>
          </div>
        </div>
        <div class="flex items-start gap-3 p-3 border-b border-gray-100">
          <span class="w-7 h-7 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold text-xs shrink-0">4</span>
          <div>
            <h5 class="font-bold text-gray-900">Mountain Climbers</h5>
            <p class="text-xs text-gray-600">Maintain a rigid plank while driving alternate knees toward your chest at pace.</p>
          </div>
        </div>
      </div>
      <p class="text-gray-600 text-sm leading-relaxed">Perform this routine 3 times a week. Make sure you hydrate properly and spend 3 minutes cooling down with quad and hamstring stretches.</p>
    `
  },
  'tip-3': {
    category: 'Wellness',
    title: 'Why Sleep Is Your Most Powerful Recovery Tool',
    image: 'images/tips-wellness.jpg',
    readTime: '3 min read',
    content: `
      <p class="text-gray-600 mb-4 leading-relaxed">You don't build muscle or burn fat in the gym — you break tissue down. Growth, cellular repair, and hormone regulation happen while you sleep.</p>
      <div class="space-y-4 my-6">
        <div class="p-4 bg-gray-50 rounded-xl border border-gray-100">
          <h4 class="font-bold text-gray-900 mb-1">Human Growth Hormone (HGH) Surge</h4>
          <p class="text-sm text-gray-600">Over 70% of daily growth hormone pulses occur during deep Stage 3 slow-wave sleep. Short sleep cuts this recovery cascade drastically.</p>
        </div>
        <div class="p-4 bg-gray-50 rounded-xl border border-gray-100">
          <h4 class="font-bold text-gray-900 mb-1">Cortisol & Ghrelin Control</h4>
          <p class="text-sm text-gray-600">Sleeping under 6 hours raises the hunger hormone ghrelin and suppresses leptin (satiety), triggering intense sugar and junk food cravings throughout the day.</p>
        </div>
        <div class="p-4 bg-gray-50 rounded-xl border border-gray-100">
          <h4 class="font-bold text-gray-900 mb-1">Top 3 Sleep Hygiene Tips</h4>
          <ul class="text-sm text-gray-600 list-disc list-inside space-y-1">
            <li>Cut off blue light screens 45 minutes before bedtime</li>
            <li>Keep the bedroom temperature cool (around 20-22°C)</li>
            <li>Avoid caffeine intake past 2:00 PM</li>
          </ul>
        </div>
      </div>
      <p class="text-gray-600 leading-relaxed">Prioritize 7 to 8 hours of uninterrupted rest every single night for transformative physical progress.</p>
    `
  }
};

/* ─── 6. Interactive Modals Management ─── */
function initModals() {
  const modalOverlay = document.getElementById('global-modal');
  const modalCloseBtn = document.getElementById('modal-close-btn');
  const modalBody = document.getElementById('modal-body-container');

  if (!modalOverlay || !modalBody) return;

  function closeModal() {
    modalOverlay.classList.remove('active');
    document.body.style.overflow = '';
  }

  if (modalCloseBtn) {
    modalCloseBtn.addEventListener('click', closeModal);
  }

  modalOverlay.addEventListener('click', (e) => {
    if (e.target === modalOverlay) {
      closeModal();
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalOverlay.classList.contains('active')) {
      closeModal();
    }
  });

  // Service details click
  document.querySelectorAll('[data-service-trigger]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const serviceKey = btn.getAttribute('data-service-trigger');
      const data = serviceData[serviceKey];
      if (!data) return;

      modalBody.innerHTML = `
        <div class="relative overflow-hidden rounded-t-xl" style="height: 220px;">
          <img src="${data.image}" alt="${data.title}" class="w-full h-full object-cover">
          <div class="absolute inset-0 bg-gradient-to-t from-gray-900/80 to-transparent"></div>
          <span class="absolute bottom-4 left-6 bg-emerald-600 text-white text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full">${data.tag}</span>
        </div>
        <div class="p-6 md:p-8">
          <h3 class="text-2xl font-black text-gray-900 mb-3 font-heading">${data.title}</h3>
          <p class="text-gray-600 mb-6 leading-relaxed">${data.description}</p>
          <h4 class="font-bold text-gray-900 uppercase tracking-wider text-xs mb-3">What's Included:</h4>
          <ul class="space-y-2.5 mb-8">
            ${data.features.map(f => `
              <li class="flex items-start gap-2.5 text-sm text-gray-700">
                <svg class="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7"></path></svg>
                <span>${f}</span>
              </li>
            `).join('')}
          </ul>
          <div class="flex flex-col sm:flex-row gap-3">
            <button onclick="openBookingForPlan('${data.title}')" class="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3.5 px-6 rounded-full text-center transition-all shadow-lg shadow-emerald-600/20">
              Book a Free Trial Session
            </button>
            <a href="https://wa.me/916238188277?text=Hi%20FitNest!%20I'm%20interested%20in%20learning%20more%20about%20${encodeURIComponent(data.title)}" target="_blank" class="inline-flex items-center justify-center gap-2 border border-gray-200 text-gray-700 hover:bg-gray-50 font-bold py-3.5 px-6 rounded-full text-center transition-colors">
              <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18" class="text-emerald-600"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
              Chat on WhatsApp
            </a>
          </div>
        </div>
      `;

      modalOverlay.classList.add('active');
      document.body.style.overflow = 'hidden';
    });
  });

  // Tip / article details click
  document.querySelectorAll('[data-tip-trigger]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const tipKey = btn.getAttribute('data-tip-trigger');
      const data = tipData[tipKey];
      if (!data) return;

      modalBody.innerHTML = `
        <div class="relative overflow-hidden rounded-t-xl" style="height: 240px;">
          <img src="${data.image}" alt="${data.title}" class="w-full h-full object-cover">
          <div class="absolute inset-0 bg-gradient-to-t from-gray-900/80 to-transparent"></div>
          <div class="absolute bottom-4 left-6 right-6 flex items-center justify-between">
            <span class="bg-emerald-600 text-white text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full">${data.category}</span>
            <span class="text-white/80 text-xs font-semibold">${data.readTime}</span>
          </div>
        </div>
        <div class="p-6 md:p-8">
          <h3 class="text-2xl font-black text-gray-900 mb-4 font-heading">${data.title}</h3>
          <div class="prose max-w-none text-gray-600 text-sm">
            ${data.content}
          </div>
          <div class="mt-8 pt-6 border-t border-gray-100 flex items-center justify-between">
            <p class="text-xs text-gray-500 font-medium">Have questions about this topic?</p>
            <a href="https://wa.me/916238188277?text=Hi%20FitNest!%20I%20just%20read%20your%20tip%20on%20${encodeURIComponent(data.title)}" target="_blank" class="inline-flex items-center gap-1.5 text-emerald-600 font-bold text-sm hover:underline">
              Ask Our Coach on WhatsApp &rarr;
            </a>
          </div>
        </div>
      `;

      modalOverlay.classList.add('active');
      document.body.style.overflow = 'hidden';
    });
  });
}

// Global helper to open booking modal for a plan
window.openBookingForPlan = function(planName) {
  const modalOverlay = document.getElementById('global-modal');
  if (modalOverlay) modalOverlay.classList.remove('active');

  const contactSection = document.getElementById('contact');
  if (contactSection) {
    contactSection.scrollIntoView({ behavior: 'smooth' });
    const planSelect = document.getElementById('booking-plan-select');
    if (planSelect) {
      for (let i = 0; i < planSelect.options.length; i++) {
        if (planSelect.options[i].text.toLowerCase().includes(planName.toLowerCase())) {
          planSelect.selectedIndex = i;
          break;
        }
      }
    }
  } else {
    window.location.href = `contact.html?plan=${encodeURIComponent(planName)}`;
  }
};

/* ─── 7. Consultation Booking Form ─── */
function initBookingForm() {
  const form = document.getElementById('booking-form');
  if (!form) return;

  const successMessage = document.getElementById('booking-success-message');

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = form.querySelector('[name="name"]')?.value.trim() || '';
    const phone = form.querySelector('[name="phone"]')?.value.trim() || '';
    const email = form.querySelector('[name="email"]')?.value.trim() || '';
    const goal = form.querySelector('[name="goal"]')?.value || 'General Fitness';
    const plan = form.querySelector('[name="plan"]')?.value || 'Not Specified';
    const slot = form.querySelector('[name="slot"]')?.value || '';
    const notes = form.querySelector('[name="notes"]')?.value.trim() || '';

    // Build neatly formatted WhatsApp message
    let message = `🏋️‍♂️ *New FitNest Consultation Booking*\n`;
    message += `━━━━━━━━━━━━━━━━━━━━\n`;
    message += `👤 *Name:* ${name}\n`;
    message += `📞 *Phone:* ${phone}\n`;
    if (email) message += `📧 *Email:* ${email}\n`;
    message += `🎯 *Fitness Goal:* ${goal}\n`;
    message += `📋 *Selected Plan:* ${plan}\n`;
    if (slot) message += `⏰ *Preferred Slot:* ${slot}\n`;
    if (notes) message += `📝 *Notes:* ${notes}\n`;
    message += `━━━━━━━━━━━━━━━━━━━━\n`;
    message += `Hi Coach! I just submitted my booking request on fitnestonline.in. Looking forward to connecting!`;

    const waUrl = `https://wa.me/916238188277?text=${encodeURIComponent(message)}`;

    // Show inline success message
    if (successMessage) {
      form.classList.add('hidden');
      successMessage.classList.remove('hidden');

      const waBtn = successMessage.querySelector('a');
      if (waBtn) {
        waBtn.href = waUrl;
        waBtn.textContent = 'Send Details Directly on WhatsApp';
      }
    }

    // Instantly launch WhatsApp with pre-filled details
    window.open(waUrl, '_blank');
  });
}

/* ─── 8. Cookie Consent Banner ─── */
function initCookieBanner() {
  const banner = document.getElementById('cookie-consent-banner');
  if (!banner) return;

  const COOKIE_KEY = 'c2_analytics_consent';
  const consent = localStorage.getItem(COOKIE_KEY);

  if (!consent) {
    banner.classList.remove('hidden');
  }

  const acceptBtn = document.getElementById('cookie-accept');
  const declineBtn = document.getElementById('cookie-decline');

  if (acceptBtn) {
    acceptBtn.addEventListener('click', () => {
      localStorage.setItem(COOKIE_KEY, 'true');
      banner.classList.add('hidden');
    });
  }

  if (declineBtn) {
    declineBtn.addEventListener('click', () => {
      localStorage.setItem(COOKIE_KEY, 'false');
      banner.classList.add('hidden');
    });
  }
}

/* ─── 9. Smooth Scroll for Anchor Links ─── */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#' || targetId === '') return;
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        e.preventDefault();
        targetElement.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
}

