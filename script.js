// ------------------------------
// Typewriter Text Effect
// ------------------------------
document.addEventListener("DOMContentLoaded", () => {

  // Initialize AOS (Animate On Scroll)
  AOS.init({
    offset: 90,
    duration: 600,
    once: false, // Animation replays every time you scroll
    easing: 'ease-in-out',
    mirror: true // Animate elements out while scrolling past them
  });

  const typedEl = document.getElementById("typed");
  if (!typedEl) return;

  const words = [
    "Designer",
    "Developer",
    "Coder",
    "Problem Solver",
    "Tech Enthusiast"
  ];

  let wordIndex = 0;
  let charIndex = 0;
  let isDeleting = false;

  function typeLoop() {

    const word = words[wordIndex];

    if (!isDeleting) {
      // Type characters one by one
      charIndex++;
      typedEl.textContent = word.substring(0, charIndex);
    } else {
      // Delete characters one by one
      charIndex--;
      typedEl.textContent = word.substring(0, charIndex);
    }

    // Dynamic typing speed
    let speed = isDeleting ? 50 : 100;
    
    if (!isDeleting && charIndex === word.length) {
      // Pause at the end of the word
      speed = 2000;
      isDeleting = true;
    }

    if (isDeleting && charIndex === 0) {
      // Switch to next word
      isDeleting = false;
      wordIndex = (wordIndex + 1) % words.length;
      speed = 500; // Pause before typing next word
    }

    setTimeout(typeLoop, speed);
  }

  // Start typing effect
  setTimeout(typeLoop, 500);
});


// ------------------------------
// Contact Form Submission
// ------------------------------
document.getElementById("contact-form").addEventListener("submit", async function (e) {
  e.preventDefault();

  const form = e.target;
  const formData = new FormData(form);
  const successMsg = document.getElementById("success-message");

  const res = await fetch(form.action, {
    method: "POST",
    body: formData,
    headers: { "Accept": "application/json" }
  });

  if (res.ok) {

    // Show success message
    successMsg.classList.remove("hidden");

    // Reset form
    form.reset();

    // Auto-hide after 10 seconds
    setTimeout(() => {
      successMsg.classList.add("hidden");
    }, 10000);

  } else {
    alert("Oops! Something went wrong. Please try again.");
  }
});
// -------------------------------------
// Reveal on Scroll Animation (Enhanced)
// -------------------------------------
const observer = new IntersectionObserver(entries => {
  entries.forEach((entry, index) => {
    if (entry.isIntersecting) {
      // Stagger animation for multiple elements
      setTimeout(() => {
        entry.target.classList.add("show");
      }, index * 100); // 100ms delay between each element
    } else {
      // Remove 'show' class when element leaves viewport to allow re-animation
      entry.target.classList.remove("show");
    }
  });
}, {
  threshold: 0.1,   // Trigger when 10% visible
  rootMargin: "0px 0px -50px 0px" // Trigger slightly before entering viewport
});

document.querySelectorAll(".reveal, .fade-text").forEach(el => {
  observer.observe(el);
});

// -------------------------------------
// Scroll-Triggered Skill Bars using Intersection Observer API
// -------------------------------------
const skillObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      // Add 'active' class to trigger CSS transition
      entry.target.classList.add('active');
    } else {
      // Remove 'active' class when element leaves viewport to allow re-animation
      entry.target.classList.remove('active');
    }
  });
}, {
  threshold: 0.5, // Trigger when 50% of element is visible
  rootMargin: '0px'
});

// Observe all skill bar elements
const skillBars = document.querySelectorAll('.skill-bar');
skillBars.forEach(bar => {
  skillObserver.observe(bar);
});

// -------------------------------------
// Smooth Navbar Background on Scroll
// -------------------------------------
const navbar = document.getElementById('navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
  const currentScroll = window.pageYOffset;
  
  if (currentScroll > 100) {
    navbar.style.backgroundColor = 'rgba(0, 0, 0, 0.9)';
  } else {
    navbar.style.backgroundColor = 'rgba(0, 0, 0, 0.2)';
  }
  
  lastScroll = currentScroll;
}, { passive: true });

// -------------------------------------
// Active Section Highlighting in Navigation
// -------------------------------------
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

function updateActiveNavLink() {
  const scrollPosition = window.scrollY;

  // Special case: if at the very top of the page, highlight Home
  if (scrollPosition < 100) {
    navLinks.forEach(link => link.classList.remove('active'));
    const homeLink = document.querySelector('.nav-link[href="#home"]');
    if (homeLink) {
      homeLink.classList.add('active');
    }
    return;
  }

  // For other sections, use normal detection with offset
  const offset = 300; // Offset for better detection

  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.offsetHeight;
    const sectionId = section.getAttribute('id');

    if (scrollPosition + offset >= sectionTop && scrollPosition + offset < sectionTop + sectionHeight) {
      // Remove active class from all nav links
      navLinks.forEach(link => {
        link.classList.remove('active');
      });

      // Add active class to the current section's nav link
      const activeLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);
      if (activeLink) {
        activeLink.classList.add('active');
      }
    }
  });
}

// Run on scroll
window.addEventListener('scroll', updateActiveNavLink, { passive: true });

// Run on page load
updateActiveNavLink();

// -------------------------------------
// Mobile Menu Toggle and Close on Link Click
// -------------------------------------
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const mobileMenu = document.getElementById('mobile-menu');

if (mobileMenuBtn && mobileMenu) {
  // Toggle mobile menu
  mobileMenuBtn.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
  });

  // Close mobile menu when a nav link is clicked
  const mobileNavLinks = mobileMenu.querySelectorAll('.nav-link');
  mobileNavLinks.forEach(link => {
    link.addEventListener('click', () => {
      mobileMenu.classList.add('hidden');
    });
  });
}