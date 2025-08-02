import multer, { FileFilterCallback } from "multer";
import { Request, Express } from "express";
import { HttpError } from "../utils/http-error.js";

const storage = multer.memoryStorage();

const allowedMimeTypes = ["image/jpeg", "image/png"];

const fileFilter = (
  _req: Request,
  file: Express.Multer.File,
  cb: FileFilterCallback
) => {
  if (allowedMimeTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new HttpError(400, "Invalid file type. Only JPEG and PNG are allowed."));
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 },
});

export default upload;
