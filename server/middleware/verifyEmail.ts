import { Request, Response, NextFunction } from "express";
import UserModel from "../models/UserModel";

const verifyEmail = async (req: Request, res: Response, next: NextFunction) => {
   try {
      const email = req.body.email;

      const user = await UserModel.findOne({ email });
      if (!user) {
         return res.status(404).json({ error: "Email not found or session expired" });
      }

      (req as any).user = user;
      next()
   } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
   }
}

export default verifyEmail