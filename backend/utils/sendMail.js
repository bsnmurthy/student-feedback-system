const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

const sendOTP = async (email, otp) => {
  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: email,
    subject: "Password Reset OTP",
    html: `
      <h2>Student Feedback System</h2>
      <p>Your OTP for password reset:</p>
      <h1>${otp}</h1>
      <p>Valid for 10 minutes.</p>
    `
  });
};

module.exports = sendOTP;