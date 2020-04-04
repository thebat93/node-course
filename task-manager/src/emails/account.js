const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: process.env.MAIL_SERVICE,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASSWORD,
  },
});

const sendWelcomeEmail = (email, name) => {
  transporter
    .sendMail({
      from: process.env.MAIL_DISTRIBUTION_ADDRESS,
      to: email,
      subject: "Thanks for joining us!",
      text: `Welcome to the app, ${name}. Let me know how you get along with the app.`,
    })
    .then((info) => console.log("Message sent: %s", info.messageId))
    .catch((error) => console.log("Error occurred. " + error.message));
};

const sendCancellationEmail = (email, name) => {
  transporter
    .sendMail({
      from: process.env.MAIL_DISTRIBUTION_ADDRESS,
      to: email,
      subject: "Sorry to see you go!",
      text: `Goodbye, ${name}. I hope to see you back sometime soon.`,
    })
    .then((info) => console.log("Message sent: %s", info.messageId))
    .catch((error) => console.log("Error occurred. " + error.message));
};

module.exports = {
  sendWelcomeEmail,
  sendCancellationEmail,
};
