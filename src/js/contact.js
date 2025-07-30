import emailjs from '@emailjs/browser';

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

const form = document.getElementById("contact-form");

if (form) {
  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const serviceID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
    const templateID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

    if (!serviceID || !templateID || !publicKey) {
      console.error("EmailJS keys missing");
      showToast("❌ Configuration error.", false);
      return;
    }

    // ✅ Store values BEFORE reset
    const userName = form.user_name.value;
    const userEmail = form.user_email.value;

    try {
      await emailjs.sendForm(serviceID, templateID, form, publicKey);
      showToast("✅ Message sent successfully!", true);
      form.reset();

      // ✅ Auto-reply (only if env variables present)
      const replyService = import.meta.env.VITE_EMAILJS_REPLY_SERVICE;
      const replyTemplate = import.meta.env.VITE_EMAILJS_REPLY_TEMPLATE;
      if (replyService && replyTemplate) {
        await emailjs.send(replyService, replyTemplate, {
          to_email: userEmail,
          to_name: userName
        }, publicKey);
      }

    } catch (err) {
      console.error("EmailJS Error:", err);
      showToast("❌ Failed to send message.", false);
    }
  });
}
