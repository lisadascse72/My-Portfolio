// netlify/functions/sendEmail.js
import emailjs from '@emailjs/nodejs';

export async function handler(event) {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  try {
    const { user_email, user_name, message } = JSON.parse(event.body);

    await emailjs.send(
      process.env.VITE_EMAILJS_SERVICE_ID,
      process.env.VITE_EMAILJS_TEMPLATE_ID,
      { user_email, user_name, message },
      { publicKey: process.env.VITE_EMAILJS_PUBLIC_KEY }
    );

    // Auto-reply
    await emailjs.send(
      process.env.VITE_EMAILJS_REPLY_SERVICE,
      process.env.VITE_EMAILJS_REPLY_TEMPLATE,
      { user_email, user_name },
      { publicKey: process.env.VITE_EMAILJS_PUBLIC_KEY }
    );

    return {
      statusCode: 200,
      body: JSON.stringify({ success: true }),
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ success: false, error: err.message }),
    };
  }
}
