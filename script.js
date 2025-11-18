// ------------------------------
// Typing Animation
// ------------------------------
document.addEventListener("DOMContentLoaded", () => {

  const typedEl = document.getElementById("typed");
  if (!typedEl) return;

  const words = [
    "Web Developer!",
    "Java Developer!",
    "Coder!",
    "Problem Solver!",
    "Tech Enthusiast!"
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