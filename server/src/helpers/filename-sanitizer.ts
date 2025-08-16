export const sanitizeFilename = (filename: string): string => {
  return filename
    .replace(/\s+/g, "_")
    .replace(/[^a-zA-Z0-9._-]/g, "")
    .toLowerCase()
    .substring(0, 100);
};
