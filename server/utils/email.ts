import nodemailer from "nodemailer";

const user = process.env.GOOGLE_APP_EMAIL;
const pass = process.env.GOOGLE_APP_PASSWORD;

const transporter = nodemailer.createTransport({
   service: "gmail",
   auth: {
      user: user,
      pass: pass,
   },
});


export const sendEmail = async (email: string, otp: string) => {
   const mailOptions = {
      from: process.env.GOOGLE_APP_EMAIL,
      to: email,
      subject: "Healthy Tails Account Verification OTP",
      text: `Your OTP code is: ${otp}. This code is valid for 15 minutes.`,
   };

   try {
      await transporter.sendMail(mailOptions);
      return true
   } catch (err: any) {
      return false
   }
}