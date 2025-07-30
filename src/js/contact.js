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

    const formData = {
      user_name: form.name.value,
      user_email: form.email.value,
      message: form.message.value,
    };

    try {
      const res = await fetch("/.netlify/functions/sendEmail", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await res.json();
      if (result.success) {
        showToast("✅ Message sent successfully!");
        form.reset();
      } else {
        console.error(result.error);
        showToast("❌ Failed to send message.");
      }
    } catch (err) {
      console.error("Network error:", err);
      showToast("❌ Failed to send message.");
    }
  });
}
