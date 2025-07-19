import jwt from "jsonwebtoken";
import 'dotenv/config'
import { Request, Response, NextFunction } from "express";

export interface PayloadToken {
   _id: string;
   fullName: string;
   email: string;
   role: string;
   iat: number;
   exp: number;
}

const verifyToken = (req: Request, res: Response, next: NextFunction) => {
   try {
      // check token
      const token = req.cookies?.token;
      if (!token) {
         return res.status(401).json({ error: "Please log in" });
      }

      const JWT_SECRET = process.env.JWT_SECRET;
      if (!JWT_SECRET) throw new Error("JWT_SECRET is not defined");
      
      const decoded = jwt.verify(token, JWT_SECRET);

      (req as any).user = decoded;

      next();
   } catch (err) {
      
      return res.status(403).json({ error: "Invalid or expired token." });
   }
}

export default verifyToken