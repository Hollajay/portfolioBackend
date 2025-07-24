const sendMail = require("../utils/mail");
const messageModel = require("../Model/Model");

const messageController = async (req, res) => {
  const { firstName, email, subject, message } = req.body;

  try {
    if (!firstName || !email || !subject || !message) {
      return res.status(400).json("All fields must be filled");
    }

    const newMessage = await messageModel.create({
      firstName,
      email,
      subject,
      message,
    });

    const notifyOptions = {
      from: process.env.EMAIL,
      subject: `New message from ${firstName}`,
      email_to: process.env.EMAIL,
      body_message: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>New Message Notification</title>
</head>
<body style="margin: 0; padding: 0; background-color: #f4f4f4; font-family: Arial, sans-serif;">

  <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%">
    <tr>
      <td align="center" style="padding: 20px 0;">
        <table cellpadding="0" cellspacing="0" border="0" width="100%" style="max-width: 600px; background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);">
          
          <tr style="background-color: #D4EBF8;">
            <td style="padding: 20px; text-align: center;">
              <img src="https://res.cloudinary.com/dildvxb4h/image/upload/v1752578001/logo2_jqmb8r.png" alt="Olajide Logo" width="100" style="margin-bottom: 10px;" />
              <h2 style="margin: 0; font-size: 24px; color: #0A3981;">You've got a message</h2>
            </td>
          </tr>
          <tr style="background-color: #D4EBF8; border-radius: 10px;">
            <td style="padding: 30px; color: #0A3981;">
              <p style="font-size: 18px; ">Hello,</p>
              <p style="font-size: 16px;">You have received a new message via your contact form:</p>
              <p><strong>Name:</strong> <span style="color: #E38E49;">${firstName}</span></p>
              <p><strong>Email:</strong> <span style="color: #E38E49;"> ${email}</span></p>
              <p><strong>Subject:</strong> <span style="color: #E38E49;">${subject}</span></p>
              <p><strong>Message:</strong><br /><span style="color: #E38E49;">${message}</span></p>
            </td>
          </tr>
          <tr style="background-color: #0A3981;">
            <td style="padding: 20px; text-align: center; font-size: 12px; color: #E38E49;">
              © ${new Date().getFullYear()} Hincas. All rights reserved.
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>

</body>
</html>
`,
    };

    // Email options for confirming to the user
    const confirmOptions = {
      from: process.env.EMAIL,
      subject: "Thank you for your message",
      email_to: email,
      body_message: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>New Message Notification</title>
</head>
<body style="margin: 0; padding: 0; background-color: #f4f4f4; font-family: Arial, sans-serif;">

  <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%">
    <tr>
      <td align="center" style="padding: 20px 0;">
        <table cellpadding="0" cellspacing="0" border="0" width="100%" style="max-width: 600px; background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);">
          
          <tr style="background-color: #D4EBF8;">
            <td style="padding: 20px; text-align: center;">
              <img src="https://res.cloudinary.com/dildvxb4h/image/upload/v1752578001/logo2_jqmb8r.png" alt="Olajide Logo" width="100" style="margin-bottom: 10px;" />
              <h2 style="margin: 0; font-size: 24px; color: #0A3981;">Thanks for you messages</h2>
            </td>
          </tr>        
         <tr style="background-color: #D4EBF8; border-radius: 10px;">
  <td style="padding: 30px; color: #0A3981;">
    <p style="font-size: 18px;">Dear <span style="color: #E38E49";>${firstName},</span></p>

    <p style="font-size: 16px;">
      Thank you for reaching out I truly appreciate you taking the time to contact me through my portfolio.
    </p>

    <p style="font-size: 16px;">
      It's always a pleasure to connect with thoughtful individuals like you. Your message means a lot, and I’m currently reviewing it.
    </p>

    <p style="font-size: 16px;">
      I'll get back to you as soon as possible. In the meantime, feel free to explore more of my work or connect with me professionally.
    </p>
    <div style="margin-top: 20px; text-align: center;">
      <a href="https://www.linkedin.com/in/ologunagba-olajide-786b94307?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app " target="_blank" 
         style="background-color: #0A3981; color: #fff;  text-decoration: none; padding: 10px 20px; border-radius: 6px; font-size: 14px; display: inline-block;">
        Connect on LinkedIn
      </a>
    </div>
    <p style="font-size: 16px; margin-top: 30px;">Warm regards,</p>
    <p style="font-size: 16px; font-weight: bold; color: #E38E49;">Ologunagba Olajide</p>
  </td>
</tr>
<tr style="background-color: #0A3981;">
            <td style="padding: 20px; text-align: center; font-size: 12px; color: #E38E49;">
              © ${new Date().getFullYear()} Hincas. All rights reserved.
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
`,
    };

    await sendMail(notifyOptions);

    await sendMail(confirmOptions);

    // Respond to the user
    return res.status(201).json("successful✅✅🎉");
  } catch (error) {
    if (!res.headersSent) {
      return res.status(500).json(error.message);
    } else {
      console.error("Headers already sent, unable to send error response.");
    }
  }
};

module.exports = messageController;
