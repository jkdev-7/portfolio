// Typewriter effect for animated phrases - always keeps placeholder space
const phrases = [
  "Websites",
  "Customs Bots",
  "Automation Tools"
];
const typeSpeed = 110; // ms per character
const eraseSpeed = 60; // ms per character
const delayAfterTyping = 1100; // ms pause after phrase
const delayAfterErasing = 600; // ms pause after erase

let phraseIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typewriterElem = document.getElementById("typewriter");
const longestPhrase = phrases.reduce((a, b) => a.length > b.length ? a : b, '');

// Always reserve space for the longest phrase
if (typewriterElem) {
  typewriterElem.textContent = "";
}

function typewriterLoop() {
  const currentPhrase = phrases[phraseIndex];
  // Always set invisible placeholder for the longest phrase so space is reserved
  typewriterElem.innerHTML =
    '<span style="opacity:0;pointer-events:none;user-select:none;display:inline-block;position:absolute;">' +
    longestPhrase +
    '</span>' +
    currentPhrase.substring(0, charIndex);
  
  if (!isDeleting) {
    charIndex++;
    if (charIndex > currentPhrase.length) {
      isDeleting = true;
      setTimeout(typewriterLoop, delayAfterTyping);
    } else {
      setTimeout(typewriterLoop, typeSpeed);
    }
  } else {
    charIndex--;
    if (charIndex < 0) {
      isDeleting = false;
      phraseIndex = (phraseIndex + 1) % phrases.length;
      setTimeout(typewriterLoop, delayAfterErasing);
    } else {
      setTimeout(typewriterLoop, eraseSpeed);
    }
  }
}
if (typewriterElem) typewriterLoop();

// Contact Popup logic (unchanged)
const popup = document.getElementById("contact-popup");
const form = document.getElementById("contact-form");
const responseMsg = document.getElementById("response-message");

function togglePopup() {
  popup.classList.toggle("hidden");
  responseMsg.classList.add("hidden");
}

if (form) {
  form.addEventListener("submit", function(e) {
    e.preventDefault();
    const data = new FormData(form);
    
    fetch(form.action, {
      method: form.method,
      body: data,
      headers: { 'Accept': 'application/json' }
    }).then(response => {
      form.reset();
      responseMsg.classList.remove("hidden");
    }).catch(error => {
      responseMsg.textContent = "Oops! Something went wrong.";
      responseMsg.classList.remove("hidden");
    });
  });
}

const ctaBtn = document.querySelector(".cta-button");
if (ctaBtn) {
  ctaBtn.addEventListener("click", function(e) {
    e.preventDefault();
    togglePopup();
  });
}