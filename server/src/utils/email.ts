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
    subject: "Healthy Tails - Account Verification OTP",
    text: `Your OTP code is: ${otp}. This code is valid for 5 minutes`,
  };

  try {
    await transporter.sendMail(mailOptions);
  } catch {
    throw new Error("Failed to send email");
  }
};

export const sendResetLinkEmail = async (email: string, resetToken: string) => {
  const resetLink = `${process.env.RESET_PASSWORD_URL}/${resetToken}`;

  const mailOptions = {
    from: process.env.GOOGLE_APP_EMAIL,
    to: email,
    subject: "Healthy Tails - Reset Your Password",
    text: `You requested a password reset.\n\nClick the link below to reset it:\n\n${resetLink}\n\nIf you did not request this, ignore this email.`,
  };

  try {
    await transporter.sendMail(mailOptions);
  } catch {
    throw new Error("Failed to send email");
  }
};
