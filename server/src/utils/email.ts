import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GOOGLE_APP_EMAIL,
    pass: process.env.GOOGLE_APP_PASSWORD,
  },
});

export const sendOTPEmail = async (email: string, otp: string) => {
  const mailOptions = {
    from: process.env.GOOGLE_APP_EMAIL,
    to: email,
    subject: "Healthy Tails Account Verification OTP",
    text: `Your OTP code is: ${otp}. This code is valid for 5 minutes`,
  };

  try {
    await transporter.sendMail(mailOptions);
  } catch (err: any) {
    throw new Error(`Failed to send email: ${err.message}`);
  }
};
