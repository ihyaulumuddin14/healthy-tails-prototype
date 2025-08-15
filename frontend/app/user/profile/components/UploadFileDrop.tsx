"use client";

import { FileUpload } from "@/components/ui/file-upload";

export function UploadFileDrop({ handleChangePhoto }: { handleChangePhoto: (url: string, file: File) => void }) {
   const handleFileUpload = (file: File | null) => {
      if (file) {
         handleChangePhoto(URL.createObjectURL(file), file);
      }
   };

   return (
      <div className="w-full max-w-4xl mx-auto h-fit border border-dashed border-neutral-200 dark:border-neutral-800 rounded-lg">
         <FileUpload onChange={handleFileUpload} />
      </div>
   );
}
