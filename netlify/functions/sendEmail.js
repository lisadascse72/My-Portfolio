exports.handler = async function (event, context) {
  try {
    const { user_name, user_email, message } = JSON.parse(event.body);

    if (!user_name || !user_email || !message) {
      return {
        statusCode: 400,
        body: JSON.stringify({ success: false, error: "Missing fields" }),
      };
    }

    const res = await fetch("https://api.emailjs.com/api/v1.0/email/send", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        service_id: process.env.VITE_EMAILJS_SERVICE_ID,
        template_id: process.env.VITE_EMAILJS_TEMPLATE_ID,
        user_id: process.env.VITE_EMAILJS_PUBLIC_KEY,
        template_params: {
          from_name: user_name,
          reply_to: user_email,
          message: message,
        },
      }),
    });

    if (res.ok) {
      return {
        statusCode: 200,
        body: JSON.stringify({ success: true }),
      };
    } else {
      const errorData = await res.text();
      return {
        statusCode: 500,
        body: JSON.stringify({ success: false, error: errorData }),
      };
    }
  } catch (err) {
    console.error("❌ Email send error:", err);
    return {
      statusCode: 500,
      body: JSON.stringify({ success: false, error: err.message }),
    };
  }
};
