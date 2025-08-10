'use client'

import { UploadFileDrop } from "@/app/user/profile/components/UploadFileDrop";
import { DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Pet, User } from "@/type/type"
import Image from "next/image"
import { useState } from "react";
import BasicButton from "./BasicButton";

export default function ProfilePhotoDialog( {user, pet}: {user?: User, pet?: Pet} ) {
   const [preview, setPreview] = useState<string | null>(null);
   const [file, setFile] = useState<File | null>(null);

   const handleChangePhoto = (url: string, file: File) => {
      setPreview(url);
   }

   return (
      <DialogContent>
         <DialogHeader>
            <DialogTitle>Change Photo</DialogTitle>
         </DialogHeader>
         
         <div className="w-full h-[100px] flex justify-center">
            <Image
               className="rounded-full object-cover"
               src={preview ? preview : "https://www.gravatar.com/avatar/2c7d99fe281ecd3bcd65ab915bac6dd5?s=250"}
               alt="preview"
               width={100}
               height={100}
               loading="lazy"
               placeholder="blur"
               blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAFCAYAAAB4ka1VAAAAAXNSR0IArs4c6QAAAHdJREFUGFdljsEKAiEARJ+aSdKhEtv//6SCuuwHFJZ1WVYtcMO9RDSXN4fHMOJw6ichQAqBtauZw5iotdIijud+asUsNd3eoaTkEiI5l19B6wWd383C9RYp5f2/4N0GpRTh/iDl11cwRuPdlrW1tD9jyoT4JKXCB4LQMpBQYkKgAAAAAElFTkSuQmCC"
               />
         </div>
         <UploadFileDrop handleChangePhoto={handleChangePhoto}/>

         <DialogFooter className="flex w-full justify-end gap-5">
            <BasicButton model='fill' width="auto">Save</BasicButton>
         </DialogFooter>
      </DialogContent>
   )
}
