import multer, { FileFilterCallback } from "multer";
import { Request, Express } from "express";

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
    const error = new Error(
      "Invalid file type. Only JPEG and PNG are allowed."
    );
    cb(error);
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 10 * 1024 * 1024 },
});

export default upload;
