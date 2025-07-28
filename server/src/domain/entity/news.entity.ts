import mongoose, { Schema, Document } from "mongoose";

export interface NewsItf extends Document {
  _id: string;
  title: string;
  imageUrl: string;
  badge: string;
  sourceUrl: string;
  createdAt: Date;
  updatedAt: Date;
}

const NewsSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      maxlength: 100,
    },
    imageUrl: {
      type: String,
      required: true,
      maxlength: 255,
    },
    badge: {
      type: String,
      required: true,
      maxlength: 50,
    },
    sourceUrl: {
      type: String,
      required: true,
      maxlength: 255,
    },
  },
  { timestamps: true }
);

const NewsModel = mongoose.model<NewsItf>("News", NewsSchema);

export default NewsModel;
