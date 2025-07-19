import jwt from "jsonwebtoken";
import 'dotenv/config'
import UserModel from "../models/UserModel";
import { Request, Response, NextFunction } from "express";


const verifyUser = async (req: Request, res: Response, next: NextFunction) => {
   try {
      // check user
      const { _id } = (req as any).user;
      const user = await UserModel.findById(_id).select("-password");

      if (!user) return res.status(404).json({ error: "User not found" });

      (req as any).user = user;
      
      next();
   } catch (err) {
      
      return res.status(403).json({ error: "Invalid or expired token." });
   }
}

export default verifyUser;