const nodemailer = require('nodemailer');

// Configure your email transport
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'onatunde.samuel@gmail.com', // your email
    pass: 'ritf bvwj cllh rnbg' // use an app password, not your main password
  }
});

async function sendContactMail({ name, email, message }) {
  const mailOptions = {
    from: email,
    to: 'onatunde.samuel@gmail.com',
    subject: `New Contact Message from ${name}`,
    text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`
  };
  return transporter.sendMail(mailOptions);
}

module.exports = { sendContactMail };
