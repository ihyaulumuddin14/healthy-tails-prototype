import nodemailer from "nodemailer";

import { HttpError } from "./http-error.js";
import logger from "./logger.js";

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
  } catch (err) {
    logger.error("Failed to send OTP email", err);
    throw new HttpError(500, "Failed to send email");
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
  } catch (err) {
    logger.error("Failed to send reset link email", err);
    throw new HttpError(500, "Failed to send email");
  }
};
