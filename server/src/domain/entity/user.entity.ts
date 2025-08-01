import mongoose, { Schema, Document } from "mongoose";
import { maxLength } from "zod";

export interface UserItf extends Document {
  _id: string;
  name: string;
  email: string;
  password: string;
  role: "USER" | "ADMIN";
  verified: boolean;
  photoUrl: string;
  refreshToken: string;
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      maxlength: 50,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      maxlength: 255,
      match: /.+@.+\..+/,
    },
    password: {
      type: String,
      required: true,
      maxlength: 255,
    },
    role: {
      type: String,
      enum: ["USER", "ADMIN"],
      default: "USER",
    },
    verified: {
      type: Boolean,
      default: false,
    },
    photoUrl: {
      type: String,
      maxlength: 255,
      default:
        "https://qdtfpohyfsqvunddzoge.supabase.co/storage/v1/object/public/media/profile/default_pfp.jpg",
    },
    refreshToken: {
      type: String,
      maxlength: 255,
    },
  },
  { timestamps: true }
);

const UserModel = mongoose.model<UserItf>("User", UserSchema);

export default UserModel;
