// ✅ contact-template.js — Safe to push (uses env variables or placeholders)
import emailjs from 'https://cdn.jsdelivr.net/npm/@emailjs/browser@4/dist/email.min.js';

const showToast = (msg, success = true) => {
  const toast = document.getElementById("toast");
  toast.style.background = success ? "#4BB543" : "#FF3333";
  toast.innerText = msg;
  toast.style.display = "block";
  setTimeout(() => { toast.style.display = "none"; }, 3000);
};

emailjs.init("EMAILJS_PUBLIC_KEY");

document.getElementById("contact-form").addEventListener("submit", function (e) {
  e.preventDefault();

  emailjs.sendForm("EMAILJS_SERVICE_ID", "EMAILJS_TEMPLATE_ID", this)
    .then(() => {
      showToast("✅ Message sent successfully! Check your email.");
      this.reset();
    })
    .catch((error) => {
      console.error("❌ EmailJS error:", error);
      showToast("❌ Oops! Something went wrong.");
    });
});
