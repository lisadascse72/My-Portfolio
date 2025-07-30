exports.handler = async function (event, context) {
  try {
    const { user_name, user_email, message } = JSON.parse(event.body);

    if (!user_name || !user_email || !message) {
      return {
        statusCode: 400,
        body: JSON.stringify({ success: false, error: "Missing fields" }),
      };
    }

    const baseBody = {
      from_name: user_name,
      reply_to: user_email,
      message,
    };

    // Send message to YOU (receiver)
    const toYou = await fetch("https://api.emailjs.com/api/v1.0/email/send", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        service_id: process.env.EMAILJS_SERVICE_ID,
        template_id: process.env.EMAILJS_TEMPLATE_ID,
        user_id: process.env.EMAILJS_PUBLIC_KEY,
        template_params: baseBody,
      }),
    });

    // Send auto-reply to USER
    const toUser = await fetch("https://api.emailjs.com/api/v1.0/email/send", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        service_id: process.env.EMAILJS_REPLY_SERVICE,
        template_id: process.env.EMAILJS_REPLY_TEMPLATE,
        user_id: process.env.EMAILJS_PUBLIC_KEY,
        template_params: {
          to_name: user_name,
          user_email: user_email,
        },
      }),
    });

    if (toYou.ok && toUser.ok) {
      return {
        statusCode: 200,
        body: JSON.stringify({ success: true }),
      };
    } else {
      const errorData = await toYou.text();
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
