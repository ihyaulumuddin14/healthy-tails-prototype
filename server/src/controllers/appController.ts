import UserModel from "../models/UserModel";
import bcrypt from "bcrypt";
import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import "dotenv/config";
import { PayloadToken } from "../middleware/verifyToken";
import otpGenerator from "otp-generator";
import { sendEmail } from "../utils/email";

const JWT_SECRET = process.env.JWT_SECRET;

// POST: http://localhost:8000/register
export const register = async (req: Request, res: Response) => {
  try {
    const { fullName, email, password } = req.body;
    if (!fullName || !email || !password) {
      return res.status(400).json({ error: "All fields are required" });
    }

    // check the existing user with the same email
    const user = await UserModel.findOne({ email }).exec();
    if (user) {
      return res.status(409).json({ error: "User already exists" });
    }

    // hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // create new user with new hashed password
    const newUser = new UserModel({
      fullName,
      email,
      password: hashedPassword,
    });

    await newUser.save();

    // send success response
    res.status(201).json({ message: "User registered successfully" });
  } catch (error: any) {
    // send error response
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

// POST: http://localhost:8000/login
export const login = async (req: Request, res: Response) => {
  try {
    if (!JWT_SECRET) throw new Error();

    // check email and password
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: "All fields are required" });
    }

    // check the existing user
    const user = await UserModel.findOne({ email }).exec();
    if (!user) {
      return res.status(404).json({ error: "Email not found" });
    }

    // check password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ error: "Invalid password" });
    }

    // check user is already logged in
    const previousToken = req.cookies?.token;
    if (previousToken) {
      const decoded = jwt.verify(previousToken, JWT_SECRET) as PayloadToken;
      const fullName = decoded.fullName;
      return res.status(409).json({
        error: `You are still logged in as ${fullName}, please log out to log in to another account`,
      });
    }

    // create jwt
    const token = jwt.sign(
      {
        _id: user._id,
        fullName: user.fullName,
        email: user.email,
        role: user.role,
      },
      JWT_SECRET,
      { expiresIn: "24h" }
    );

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
      maxAge: 24 * 60 * 60 * 1000,
      path: "/",
    });

    // send success response
    res.status(200).json({ message: "Login successfull" });
  } catch (error: any) {
    // send error response
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// POST: http://localhost:8000/logout
export const logout = async (req: Request, res: Response) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
    });
    res.status(200).json({ message: "Logout successfull" });
  } catch (error: any) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// POST: http://localhost:8000/request-reset
export const requestReset = async (req: Request, res: Response) => {
  try {
    const otp = otpGenerator.generate(6, {
      upperCaseAlphabets: false,
      lowerCaseAlphabets: false,
      specialChars: false,
    });

    const user = (req as any).user;

    user.resetOTP = otp;
    user.resetOTPExpiry = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes
    user.canResetPassword = false;
    user.resetSessionExpiry = null;
    await user.save();

    const result = await sendEmail(user.email, otp);
    if (!result) return res.status(500).json({ error: "Failed to send email" });

    res.status(200).json({ message: "OTP sent successfully" });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// POST: http://localhost:8000/verify-otp
export const verifyOTP = async (req: Request, res: Response) => {
  try {
    const { email, otp } = req.body;

    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: "Email not found" });
    }

    if (parseInt(user.resetOTP as string) !== parseInt(otp)) {
      return res.status(400).json({ error: "Invalid OTP" });
    }

    if (
      !user.resetOTP ||
      !user.resetOTPExpiry ||
      user.resetOTPExpiry < new Date()
    ) {
      user.resetOTP = null;
      user.resetOTPExpiry = null;
      await user.save();
      return res.status(400).json({ error: "OTP expired" });
    }

    user.resetOTP = null;
    user.resetOTPExpiry = null;
    user.canResetPassword = true;
    user.resetSessionExpiry = new Date(Date.now() + 15 * 60 * 1000); // 5 minutes
    await user.save();

    res.status(200).json({ message: "OTP verified successfully" });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// POST: http://localhost:8000/reset-password
export const resetPassword = async (req: Request, res: Response) => {
  try {
    const { email, newPassword } = req.body;

    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: "Email not found" });
    }

    if (
      !user.canResetPassword ||
      !user.resetSessionExpiry ||
      user.resetSessionExpiry < new Date()
    ) {
      return res.status(400).json({ error: "Reset session expired" });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    if (!hashedPassword) throw new Error();

    // clear back end
    user.password = hashedPassword;
    user.resetOTP = null;
    user.resetOTPExpiry = null;
    user.canResetPassword = false;
    user.resetSessionExpiry = null;
    await user.save();

    res.status(201).json({ message: "Password reset successfully" });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// PUT: http://localhost:8000/api/updateUser
export const updateUser = async (req: Request, res: Response) => {
  try {
    const { _id } = (req as any).user;
    const userUpdateData = req.body;

    // update user
    const updatedUser = await UserModel.findByIdAndUpdate(_id, userUpdateData);
    if (!updatedUser) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(201).json({ message: "User updated successfully" });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// GET: http://localhost:8000/users
export const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await UserModel.find();
    res.status(200).json(users);
  } catch (error: any) {
    return res.status(500).send(error.message);
  }
};

// GET: http://localhost:8000/user
export const getUser = async (req: Request, res: Response) => {
  try {
    const user = (req as any).user;

    res.status(200).json(user);
  } catch (error: any) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};
