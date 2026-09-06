require('dotenv').config();
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    type: 'OAuth2',
    user: process.env.EMAIL_USER,
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    refreshToken: process.env.GOOGLE_REFRESH_TOKEN,
  },
});

// Verify the connection configuration
transporter.verify((error, success) => {
  if (error) {
    console.error('Error connecting to email server:', error);
  } else {
    console.log('Email server is ready to send messages');
  }
});


// Function to send email
const sendEmail = async (to, subject, text, html) => {
  try {
    const info = await transporter.sendMail({
      from: `"Backend Ledger" <${process.env.EMAIL_USER}>`, // sender address
      to, // list of receivers
      subject, // Subject line
      text, // plain text body
      html, // html body
    });

    console.log('Message sent: %s', info.messageId);
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
  } catch (error) {
    console.error('Error sending email:', error);
  }
};

const sendRegistrationEmail= async (userEmail,name)=>{
   const subject = 'Welcome to Backend Ledger!';

const text = `Hello ${name},

Thank you for registering at Backend Ledger.
We're excited to have you on board!

Best regards,
The Backend Ledger Team`;

const html = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Welcome to Backend Ledger</title>
</head>

<body style="
  margin: 0;
  padding: 0;
  background-color: #f4f7fb;
  font-family: Arial, Helvetica, sans-serif;
">

  <div style="
    max-width: 600px;
    margin: 40px auto;
    background-color: #ffffff;
    border-radius: 16px;
    overflow: hidden;
    box-shadow: 0 8px 30px rgba(0,0,0,0.08);
  ">

    <!-- Header -->
    <div style="
      background: linear-gradient(135deg, #2563eb, #7c3aed);
      padding: 35px 30px;
      text-align: center;
    ">
      <h1 style="
        margin: 0;
        color: #ffffff;
        font-size: 30px;
        font-weight: 700;
      ">
        Backend Ledger
      </h1>

      <p style="
        margin: 10px 0 0;
        color: #e0e7ff;
        font-size: 15px;
      ">
        Welcome to our platform 🚀
      </p>
    </div>

    <!-- Content -->
    <div style="padding: 40px 35px;">

      <h2 style="
        margin: 0 0 20px;
        color: #111827;
        font-size: 24px;
      ">
        Hello ${name} 👋
      </h2>

      <p style="
        color: #4b5563;
        font-size: 16px;
        line-height: 1.7;
        margin: 0 0 18px;
      ">
        Thank you for registering at
        <strong style="color: #2563eb;">Backend Ledger</strong>.
        We're excited to have you on board!
      </p>

      <!-- Welcome Box -->
      <div style="
        background-color: #eff6ff;
        border-left: 5px solid #2563eb;
        padding: 18px 20px;
        margin: 25px 0;
        border-radius: 8px;
      ">
        <p style="
          margin: 0;
          color: #1e40af;
          font-size: 15px;
          line-height: 1.6;
        ">
          Your account has been successfully created.
          You can now start exploring Backend Ledger.
        </p>
      </div>

      <!-- Button -->
      <div style="
        text-align: center;
        margin: 30px 0;
      ">
        <a href="#"
           style="
             display: inline-block;
             padding: 14px 28px;
             background-color: #2563eb;
             color: #ffffff;
             text-decoration: none;
             border-radius: 8px;
             font-size: 16px;
             font-weight: 600;
           ">
          Get Started →
        </a>
      </div>

      <p style="
        color: #4b5563;
        font-size: 15px;
        line-height: 1.7;
        margin-top: 30px;
      ">
        Best regards,<br>
        <strong style="color: #111827;">
          The Backend Ledger Team
        </strong>
      </p>

    </div>

    <!-- Footer -->
    <div style="
      background-color: #f9fafb;
      padding: 20px;
      text-align: center;
      border-top: 1px solid #e5e7eb;
    ">
      <p style="
        margin: 0;
        color: #9ca3af;
        font-size: 12px;
      ">
        © 2026 Backend Ledger. All rights reserved.
      </p>

      <p style="
        margin: 8px 0 0;
        color: #9ca3af;
        font-size: 12px;
      ">
        This is an automated email. Please do not reply.
      </p>
    </div>

  </div>

</body>
</html>
`;
};

const sendTransactionEmail = async (userEmail, name, amount , toAccount) => {
  const subject = 'transaction Successful!';
  const text = 'hello ${name},your transaction of ${amount} to $(toAccount) has been succesfully completed';
  const html = '<p>hello ${name}</p><p>your transaction of ${amount} to ${toAccount} has been successfully completed</p><p>Best regards,</p><p>the Backend Ledger Team</p>';

  await sendEmail(userEmail, subject,text, html);
}

const sendTransactionFailureEmail = async (userEmail, name, amount, toAccount) => {
  const subject = 'Transaction Failed';
  const text = 'hello ${name}, your transaction of ${amount} to ${toAccount} has failed.';
  const html = '<p>hello ${name}</p><p>your transaction of ${amount} to ${toAccount} has failed.</p><p>Best regards,</p><p>the Backend Ledger Team</p>';

  await sendEmail(userEmail, subject, text, html);
};





module.exports = {
    sendRegistrationEmail,
    transporter,
    sendTransactionEmail,
    sendTransactionFailureEmail
};

