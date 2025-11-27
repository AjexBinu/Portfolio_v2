/*================= HAMBURGER MENU =================*/
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('active');
  mobileMenu.classList.toggle('active');
});

// Close mobile menu when a link is clicked
document.querySelectorAll('#mobileMenu a').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('active');
    mobileMenu.classList.remove('active');
  });
});

// Hide mobile menu if window is resized above breakpoint
window.addEventListener('resize', () => {
  if (window.innerWidth > 900) {
    hamburger.classList.remove('active');
    mobileMenu.classList.remove('active');
  }
});

/*================= TYPING EFFECT =================*/
const roles = [
  'Future Data Scientist',
  'Future Data Analyst',
  'Future Software Engineer',
  'Future Machine Learning Enthusiast',
  'Future Web Developer',
  'Future Music Producer'
];

const typedEl = document.getElementById('typed-role');
let rIndex = 0, charIndex = 0, deleting = false;

function tick() {
  const current = roles[rIndex % roles.length];
  if (!deleting) {
    typedEl.textContent = current.slice(0, ++charIndex);
    if (charIndex === current.length) {
      deleting = true;
      setTimeout(tick, 1200);
      return;
    }
  } else {
    typedEl.textContent = current.slice(0, --charIndex);
    if (charIndex === 0) {
      deleting = false;
      rIndex++;
    }
  }
  setTimeout(tick, deleting ? 60 : 90);
}
setTimeout(tick, 600);

/*================= REVEAL ON SCROLL =================*/
const revealEls = document.querySelectorAll('.reveal, .achievement-card');

function revealOnScroll() {
  const windowH = window.innerHeight;
  revealEls.forEach((el, index) => {
    const rect = el.getBoundingClientRect();
    if (rect.top < windowH - 100 && !el.classList.contains('active')) {
      // Stagger delay for achievement cards
      const delay = window.innerWidth < 900 ? index * 100 : index * 150;
      setTimeout(() => el.classList.add('active'), delay);
    }
  });
}

/*================= PROGRESS BARS =================*/
const progressBars = document.querySelectorAll('.progress');

function handleProgressAnimation() {
  progressBars.forEach(bar => {
    if (bar.dataset.animated) return; // animate only once
    const rect = bar.getBoundingClientRect();
    if (rect.top < window.innerHeight - 80) {
      const target = +bar.getAttribute('data-target') || 0;
      bar.style.width = target + '%';
      bar.dataset.animated = 'true';
    }
  });
}

/*================= SCROLL-TO-TOP BUTTON =================*/
const scrollTopBtn = document.getElementById('scrollTopBtn');

window.addEventListener('scroll', () => {
  // Show/hide button
  if (window.scrollY > 400) {
    scrollTopBtn.style.display = 'flex';
  } else {
    scrollTopBtn.style.display = 'none';
  }
  // Trigger reveal + progress animation
  revealOnScroll();
  handleProgressAnimation();
});

scrollTopBtn.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

/*================= SMOOTH SCROLL FOR INTERNAL LINKS =================*/
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const href = a.getAttribute('href');
    if (href.length > 1) {
      e.preventDefault();
      document.querySelector(href).scrollIntoView({ behavior: 'smooth', block: 'start' });
      // Close mobile menu on link click
      if (window.innerWidth <= 900) {
        hamburger.classList.remove('active');
        mobileMenu.classList.remove('active');
      }
    }
  });
});

/*================= INITIAL TRIGGER ON PAGE LOAD =================*/
window.addEventListener('load', () => {
  revealOnScroll();
  handleProgressAnimation();
});
