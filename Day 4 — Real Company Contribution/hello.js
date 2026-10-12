const menuToggle = document.querySelector("#menu-toggle");
const navLinks = document.querySelector("#nav-links");

// Mobile navigation
function closeMenu() {
  navLinks.classList.remove("open");
  menuToggle.setAttribute("aria-expanded", "false");
  menuToggle.setAttribute("aria-label", "Open navigation menu");
}

menuToggle.addEventListener("click", () => {
  const isOpen = menuToggle.getAttribute("aria-expanded") === "true";

  menuToggle.setAttribute("aria-expanded", String(!isOpen));
  menuToggle.setAttribute(
    "aria-label",
    isOpen ? "Open navigation menu" : "Close navigation menu"
  );
  navLinks.classList.toggle("open", !isOpen);
});

navLinks.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", closeMenu);
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") closeMenu();
});

document.addEventListener("click", (event) => {
  if (!navLinks.contains(event.target) && !menuToggle.contains(event.target)) {
    closeMenu();
  }
});

// Accessible FAQ accordion
const faqQuestions = document.querySelectorAll(".faq-question");

faqQuestions.forEach((button) => {
  button.addEventListener("click", () => {
    const currentItem = button.closest(".faq-item");
    const currentAnswer = currentItem.querySelector(".faq-answer");

    const willOpen =
      button.getAttribute("aria-expanded") !== "true";

    faqQuestions.forEach((otherButton) => {
      const item = otherButton.closest(".faq-item");
      const answer = item.querySelector(".faq-answer");

      otherButton.setAttribute("aria-expanded", "false");
      item.classList.remove("open");
      answer.inert = true;
    });

    if (willOpen) {
      button.setAttribute("aria-expanded", "true");
      currentItem.classList.add("open");
      currentAnswer.inert = false;
    }
  });
});

// Reveal elements as they enter the viewport
const revealElements = document.querySelectorAll(".reveal");
const reducedMotion = window.matchMedia(
  "(prefers-reduced-motion: reduce)"
).matches;

if ("IntersectionObserver" in window && !reducedMotion) {
  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );

  revealElements.forEach((element) => revealObserver.observe(element));
} else {
  revealElements.forEach((element) => element.classList.add("visible"));
}

// Automatically update copyright year
document.querySelector("#year").textContent = new Date().getFullYear();

// Accessible contact form validation
const contactForm = document.querySelector("#contact-form");
const formStatus = document.querySelector("#form-status");

const formFields = contactForm.querySelectorAll(
  "input, textarea"
);

formFields.forEach((field) => {
  field.addEventListener("input", () => {
    field.removeAttribute("aria-invalid");
  });
});

contactForm.addEventListener("submit", (event) => {
  event.preventDefault();

  formStatus.textContent = "";
  formStatus.className = "form-status";

  formFields.forEach((field) => {
    field.removeAttribute("aria-invalid");
  });

  if (!contactForm.checkValidity()) {
    const invalidField =
      contactForm.querySelector(":invalid");

    invalidField.setAttribute("aria-invalid", "true");

    formStatus.classList.add("error");
    formStatus.textContent =
      "Please correct the highlighted field: " +
      invalidField.validationMessage;

    invalidField.focus();
    return;
  }

  formStatus.classList.add("success");
  formStatus.textContent =
    "Validation successful! This demo form does not send messages.";

  contactForm.reset();
});