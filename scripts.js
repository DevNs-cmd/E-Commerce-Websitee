/* === scripts.js — NovaMart Pro v2 ===
   Features:
   - Smooth theme switching with flash & indicator
   - Cart & wishlist micro-interactions with sparkle & bounce
   - Hero/product staggered fade-in
   - Smooth scrolling & scroll-based parallax
   - Tooltip hover effects on products
   - Search suggestion simulation
   - Dynamic footer year
*/

function ready(fn) {
  if (document.readyState !== 'loading') fn();
  else document.addEventListener('DOMContentLoaded', fn);
}

ready(() => {
  const body = document.body;
  const themeToggle = document.getElementById('themeToggle');

  // --- THEME HANDLING ---
  const savedTheme = localStorage.getItem('theme') || 'light';
  setTheme(savedTheme);

  themeToggle?.addEventListener('click', () => {
    const nextTheme = body.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    setTheme(nextTheme);
  });

  function setTheme(theme) {
    body.classList.add('theme-transition');
    body.setAttribute('data-theme', theme);
    themeToggle.setAttribute('aria-pressed', theme === 'dark');
    localStorage.setItem('theme', theme);
    setTimeout(() => body.classList.remove('theme-transition'), 400);
  }

  // --- CART FUNCTIONALITY ---
  const cartLink = document.querySelector('[data-action="open-cart"]');
  const cartBadge = cartLink?.querySelector('.badge');
  let cartCount = parseInt(cartBadge?.textContent || '0');

  document.querySelectorAll('[data-action="add-to-cart"]').forEach(btn => {
    btn.addEventListener('click', () => {
      cartCount++;
      if (cartBadge) {
        cartBadge.textContent = cartCount;
        cartBadge.classList.add('bounce');
        setTimeout(() => cartBadge.classList.remove('bounce'), 400);
      }
      // Product card feedback
      const card = btn.closest('.product-card');
      card?.classList.add('added-to-cart');
      setTimeout(() => card?.classList.remove('added-to-cart'), 600);
    });
  });

  // --- WISHLIST FUNCTIONALITY ---
  const wishLink = document.querySelector('[data-action="open-wishlist"]');
  const wishBadge = wishLink?.querySelector('.badge');
  let wishCount = parseInt(wishBadge?.textContent || '0');

  document.querySelectorAll('[data-action="wishlist"]').forEach(btn => {
    btn.addEventListener('click', () => {
      const active = btn.classList.toggle('active');
      btn.textContent = active ? '❤' : '♡';
      wishCount += active ? 1 : -1;
      if (wishBadge) {
        wishBadge.textContent = wishCount;
        wishBadge.classList.add('bounce');
        setTimeout(() => wishBadge.classList.remove('bounce'), 400);
      }
      if (active) createSparkle(btn);
    });
  });

  // --- SEARCH SIMULATION ---
  const searchForm = document.getElementById('searchForm');
  const searchInput = document.getElementById('searchInput');
  searchForm?.addEventListener('submit', e => {
    e.preventDefault();
    const q = searchInput.value.trim();
    if (q) alert(`Searching for: "${q}" ... (demo UX)`); 
  });

  searchInput?.addEventListener('input', e => {
    const val = e.target.value.toLowerCase();
    // Suggestion simulation
    // Here you could add a real suggestion dropdown
    if (val.length > 1) console.log(`Suggesting results for: ${val}`);
  });

  // --- DYNAMIC FOOTER YEAR ---
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // --- SMOOTH SCROLLING ---
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const target = document.querySelector(a.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  // --- STAGGERED FADE-IN & INTERSECTION OBSERVER ---
  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });

  document.querySelectorAll('.product-card, .hero-left').forEach((el, i) => {
    el.style.transitionDelay = `${i * 100}ms`;
    observer.observe(el);
  });

  // --- SPARKLE EFFECT ---
  function createSparkle(btn) {
    const sparkle = document.createElement('span');
    sparkle.className = 'sparkle';
    sparkle.style.left = `${Math.random() * 80 + 10}%`;
    sparkle.style.top = `${Math.random() * 80 + 10}%`;
    sparkle.style.background = `hsl(${Math.random() * 360}, 80%, 60%)`;
    btn.appendChild(sparkle);
    setTimeout(() => sparkle.remove(), 600);
  }

  // --- PRODUCT CARD MICRO-HOVER ---
  document.querySelectorAll('.product-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
      card.style.transform = 'translateY(-6px) scale(1.03)';
      card.style.boxShadow = '0 14px 28px rgba(0,0,0,0.18)';
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
      card.style.boxShadow = '';
    });

    // Tooltip simulation
    const title = card.querySelector('.product-title')?.textContent;
    if (title) card.setAttribute('title', title);
  });

  // --- HERO PARALLAX & FLOAT ---
  const heroImg = document.querySelector('.hero-right img');
  if (heroImg) {
    window.addEventListener('scroll', () => {
      const offset = window.scrollY * 0.18;
      heroImg.style.transform = `translateY(${offset}px) scale(1.02)`;
    });
  }

  // --- OPTIONAL: Floating sparkle background for hero ---
  setInterval(() => {
    const hero = document.querySelector('.hero');
    if (!hero) return;
    const sparkle = document.createElement('span');
    sparkle.className = 'sparkle';
    sparkle.style.left = `${Math.random() * 100}%`;
    sparkle.style.top = `${Math.random() * 100}%`;
    sparkle.style.background = `hsl(${Math.random() * 360}, 80%, 60%)`;
    hero.appendChild(sparkle);
    setTimeout(() => sparkle.remove(), 1500);
  }, 800);
});
