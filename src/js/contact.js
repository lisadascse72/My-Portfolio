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

    const payload = {
      user_name: this.user_name.value,
      user_email: this.user_email.value,
      message: this.message.value,
    };

    try {
      const response = await fetch("/.netlify/functions/sendEmail", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
      });

      const result = await response.json();

      if (result.success) {
        showToast("✅ Message sent successfully!");
        this.reset();
      } else {
        console.error(result.error);
        showToast("❌ Message failed");
      }

    } catch (error) {
      console.error(error);
      showToast("❌ Something went wrong");
    }
  });
}
