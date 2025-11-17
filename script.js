
document.addEventListener('DOMContentLoaded', () => {
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const toTopBtn = document.getElementById('to-top-btn');
    const navbar = document.getElementById('navbar');
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section, header');

    // Mobile Menu Toggle
    mobileMenuBtn.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
    });

    // Close mobile menu when a link is clicked
    document.querySelectorAll('#mobile-menu .nav-link').forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.add('hidden');
        });
    });

    // Back to Top Button Show/Hide
    window.addEventListener('scroll', () => {
        if (window.scrollY > 200) {
            toTopBtn.classList.remove('opacity-0', 'scale-0');
            toTopBtn.classList.add('opacity-100', 'scale-100');
        } else {
            toTopBtn.classList.remove('opacity-100', 'scale-100');
            toTopBtn.classList.add('opacity-0', 'scale-0');
        }
    });

    // Active Nav Link on Scroll
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.6 // 60% of the section must be visible
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.id;
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    // Check href attribute, which might contain '#'
                    const href = link.getAttribute('href');
                    if (href === `#${id}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }, observerOptions);

    // Observe all sections
    sections.forEach(section => {
        observer.observe(section);
    });

    // Typing effect Javascript
    const words = ["Web Developer!", , "Coder!", "Softwere Developer!" , "Problem Solver"];
    let i = 0;
    let j = 0;
    let currentWord = "";
    let isDeleting = false;
    const typedTextSpan = document.getElementById("typed");

    function typeLoop() {
        const currentText = words[i];

        if (isDeleting) {
            // Remove char
            currentWord = currentText.substring(0, currentWord.length - 1);
        } else {
            // Add char
            currentWord = currentText.substring(0, currentWord.length + 1);
        }

        typedTextSpan.innerHTML = currentWord;

        let typeSpeed = 150;
        if (isDeleting) {
            typeSpeed /= 2;
        }

        if (!isDeleting && currentWord === currentText) {
            // Pause at end of word
            typeSpeed = 2000;
            isDeleting = true;
        } else if (isDeleting && currentWord === "") {
            isDeleting = false;
            i++;
            if (i === words.length) {
                i = 0;
            }
            typeSpeed = 500;
        }

        setTimeout(typeLoop, typeSpeed);
    }

    // Start the typing loop
    // We replace the CSS animation with this JS-powered one.
    typedTextSpan.classList.remove('typed-text'); // Remove CSS animation class
    typedTextSpan.style.borderRight = "0.15em solid var(--brand-red)";
    typedTextSpan.style.animation = "blink-caret .75s step-end infinite";
    typeLoop();

});
document.addEventListener('DOMContentLoaded', () => {
  const typedEl = document.getElementById('typed');
  if (!typedEl) {
    console.warn('Typed element (#typed) not found.');
    return;
  }

  const words = ["Java Developer", "Full Stack Developer", "Coder", "Tech Explorer"];
  let wordIndex = 0;
  let charIndex = 0;
  let isDeleting = false;

  function tick() {
    const currentWord = words[wordIndex];
    // update charIndex
    if (isDeleting) {
      charIndex = Math.max(0, charIndex - 1);
    } else {
      charIndex = Math.min(currentWord.length, charIndex + 1);
    }

    // set visible text
    typedEl.textContent = currentWord.slice(0, charIndex);

    // choose delay
    let delay = isDeleting ? 80 : 120;

    // reached end of word -> pause then start deleting
    if (!isDeleting && charIndex === currentWord.length) {
      delay = 1500;
      isDeleting = true;
    }
    // finished deleting -> next word
    else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      wordIndex = (wordIndex + 1) % words.length;
      delay = 500;
    }

    setTimeout(tick, delay);
  }

  // start
  tick();
});
