'use client'

import { DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { UploadFileDrop } from "@/app/user/profile/components/UploadFileDrop";
import { showErrorToast, showLoadingToast, showSuccessToast } from "@/helpers/toastHelper";
import { useState } from "react";
import { postAvatar } from "@/api/user.actions";
import { User } from "@/type/type"
import Image, { StaticImageData } from "next/image"
import useUser from "@/hooks/useUser";
import BasicButton from "../../../../components/ui/BasicButton";
import ImageDefault from "@/public/images/default_avatar.png";

export default function PhotoDialog({ user }: { user: User }) {
   const { mutateUser } = useUser();
   const [preview, setPreview] = useState<string | StaticImageData>(user?.photoUrl || ImageDefault);
   const [file, setFile] = useState<File | null>(null);

   const handleChangePhoto = (url: string, file: File | null) => {
      setPreview(url);
      setFile(file);
   }

   const handleResponseChangeAvatar = async () => {
      if (!file) return;
      const formData = new FormData();
      formData.append('avatar', file)

      showLoadingToast('Updating avatar...');
      const response = await postAvatar(formData);

      if (response.success) {
         showSuccessToast(response.message)
         mutateUser(
            (prev: {success: string, message: string, user: User}) => ({
               ...prev,
               user: {
                  ...prev.user,
                  photoUrl: response.user.photoUrl
               }
            }),
            false
         );
      } else {
         showErrorToast(response.error as string)
      }
   }

   return (
      <DialogContent>
         <DialogHeader>
            <DialogTitle>Change Photo</DialogTitle>
         </DialogHeader>

         <div className="w-full h-[100px] flex justify-center">
            <Image
               className="rounded-full object-cover"
               src={preview}
               alt="preview"
               width={100}
               height={100}
               loading="lazy"
               placeholder="blur"
               blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAFCAYAAAB4ka1VAAAAAXNSR0IArs4c6QAAAHdJREFUGFdljsEKAiEARJ+aSdKhEtv//6SCuuwHFJZ1WVYtcMO9RDSXN4fHMOJw6ichQAqBtauZw5iotdIijud+asUsNd3eoaTkEiI5l19B6wWd383C9RYp5f2/4N0GpRTh/iDl11cwRuPdlrW1tD9jyoT4JKXCB4LQMpBQYkKgAAAAAElFTkSuQmCC"
               unoptimized
               onError={() => setPreview(ImageDefault)}
            />
         </div>
         <UploadFileDrop handleChangePhoto={handleChangePhoto} />

         <DialogFooter className="flex w-full justify-end gap-5">
            <BasicButton onClick={() => { handleResponseChangeAvatar() }} model='fill' width="auto">Save</BasicButton>
         </DialogFooter>
      </DialogContent>
   )
}
