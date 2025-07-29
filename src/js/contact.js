// ✅ contact.js — Secure and Deployment-Ready
import * as emailjs from '@emailjs/browser';

emailjs.init(import.meta.env.VITE_EMAILJS_PUBLIC_KEY);

// Toast Notification
const showToast = (msg, success = true) => {
  const toast = document.getElementById("toast");
  if (!toast) return;
  toast.style.background = success ? "#4BB543" : "#FF3333";
  toast.innerText = msg;
  toast.style.display = "block";
  setTimeout(() => {
    toast.style.display = "none";
  }, 3000);
};

// Contact Form Submission
const form = document.getElementById("contact-form");

if (form) {
  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const serviceID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
    const templateID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
    const replyServiceID = import.meta.env.VITE_EMAILJS_REPLY_SERVICE;
    const replyTemplateID = import.meta.env.VITE_EMAILJS_REPLY_TEMPLATE;

    // Step 1: Send mail to your inbox
    emailjs.sendForm(serviceID, templateID, this)
      .then(() => {
        showToast("✅ Message sent successfully!");

        // Step 2: Auto-reply
        const userEmail = this.user_email.value;
        const userName = this.user_name.value;

        emailjs.send(replyServiceID, replyTemplateID, {
          user_email: userEmail,
          user_name: userName,
        }).then(() => {
          console.log("✅ Auto-reply sent");
        }).catch((error) => {
          console.error("❌ Auto-reply error:", error);
        });

        this.reset();
      })
      .catch((error) => {
        console.error("❌ EmailJS error:", error);
        showToast("❌ Oops! Something went wrong.");
      });
  });
}
