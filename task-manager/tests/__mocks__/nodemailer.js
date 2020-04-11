const sendMail = () => Promise.resolve({ messageId: "Email Message ID" });

const createTransport = () => ({ sendMail });

const nodemailer = { createTransport };

module.exports = nodemailer;
