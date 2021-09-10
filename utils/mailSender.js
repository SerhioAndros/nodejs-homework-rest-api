const sgMail = require("@sendgrid/mail");
require("dotenv").config();

const { SG_API_KEY } = process.env;
sgMail.setApiKey(SG_API_KEY);

const mailSender = async ({ to, subject, html }) => {
  try {
    const result = await sgMail.send({
      from: "serhio@remme.io",
      to,
      subject,
      html,
    });
    return result;
  } catch (error) {
    throw error;
  }
};

module.exports = mailSender;
