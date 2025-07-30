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
  form.addEventListener("submit", async function (e) {
    e.preventDefault();

    const data = {
      user_name: this.user_name.value,
      user_email: this.user_email.value,
      message: this.message.value,
    };

    try {
      const res = await fetch("/.netlify/functions/sendEmail", {
        method: "POST",
        body: JSON.stringify(data),
      });

      const result = await res.json();

      if (result.success) {
        showToast("✅ Message sent successfully!");
        form.reset();
      } else {
        showToast("❌ Failed to send message");
        console.error(result.error);
      }
    } catch (err) {
      showToast("❌ Error occurred");
      console.error("❌ Error:", err);
    }
  });
}
