import { DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import Image from "next/image";
import PromoPoster from "@/public/images/promo-poster.webp";

export default function PromoModal() {
   return (
      <DialogContent>
         <DialogHeader>
            <DialogTitle>
               Newest Promo
            </DialogTitle>
         </DialogHeader>
         <DialogDescription>
            <Image src={PromoPoster} loading="lazy" alt="promo poster image"/>
         </DialogDescription>
      </DialogContent>
   )
}
