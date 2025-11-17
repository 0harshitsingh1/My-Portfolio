document.addEventListener("DOMContentLoaded", () => {

  const typedEl = document.getElementById("typed");
  if (!typedEl) return;

  const words = [
    "Web Developer",
    "Java Developer",
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
      charIndex++;
      typedEl.textContent = word.substring(0, charIndex);
    } else {
      charIndex--;
      typedEl.textContent = word.substring(0, charIndex);
    }

    let speed = isDeleting ? 60 : 120;

    if (!isDeleting && charIndex === word.length) {
      speed = 1200;
      isDeleting = true;
    }

    if (isDeleting && charIndex === 0) {
      isDeleting = false;
      wordIndex = (wordIndex + 1) % words.length;
      speed = 500;
    }

    setTimeout(typeLoop, speed);
  }

  typeLoop();

});