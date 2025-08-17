"use client";

import { CardBody, CardContainer, CardItem } from "@/components/ui/3d-card";
import { dialogStore } from "@/stores/dialogStore";
import Link from "next/link";

type Props = {
   name: string;
   link: string;
   color: string;
   children: React.ReactNode;
};

export function ThreeDCard({ name, link, color, children }: Props) {
   const setDialogPetMode = dialogStore((state) => state.setDialogPetMode);

   return (
      <CardContainer className="inter-var w-full aspect-square">
         <Link href={link}>
            <CardBody
               className={`bg-linear-to-br from-[var(--color-muted)] to-[var(--color-tertiary)] to-400% hover:to-100% relative group/card dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] w-full sm:w-[30rem] h-full rounded-4xl p-6 flex flex-col justify-center items-center shadow-xl cursor-pointer active:scale-98 transition-all duration-500 ease-in-out`}
               onClick={() => {
                  setDialogPetMode(
                     link === '/user/profile/pets' ? 'petAdd' :
                        link === '/user/profile/appointments' ? 'book' : null
                  )
               }}
            >
               <CardItem
                  translateZ="100"
                  className="text-xl text-[var(--color-foreground)] font-bold"
               >
                  {children}
               </CardItem>
               <CardItem
                  as="p"
                  translateZ="100"
                  className="flex-text-0 max-w-sm mt-2 text-[var(--color-foreground)] font-semibold text-center"
               >
                  {name}
               </CardItem>
            </CardBody>
         </Link>
      </CardContainer>
   );
}
