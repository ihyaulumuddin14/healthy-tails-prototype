import { URL } from "url";

import logger from "../utils/logger.js";

export const extractFilePathFromUrl = (url: string): string | null => {
  try {
    const urlObj = new URL(url);
    const pathname = urlObj.pathname;

    const mediaIndex = pathname.indexOf("/media/");
    if (mediaIndex === -1) return null;

    let filePath = pathname.substring(mediaIndex + 7);

    filePath = decodeURIComponent(filePath);

    return filePath;
  } catch (error) {
    logger.error("Error extracting file path:", error);
    return null;
  }
};
