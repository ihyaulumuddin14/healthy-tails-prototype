"use client";

import { CardBody, CardContainer, CardItem } from "@/components/ui/3d-card";
import { useRouter } from "next/navigation";

type Props = {
   name: string;
   link: string;
   color: string;
};

export function ThreeDCardDemo({ name, link, color }: Props) {
   const route = useRouter();

   return (
      <CardContainer className="inter-var w-full aspect-square">
         <CardBody
            className={`${color} relative group/card dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] w-full sm:w-[30rem] h-full rounded-xl p-6 flex flex-col justify-center items-center shadow-xl cursor-pointer active:scale-98 transition-all duration-100 ease-in-out`}
            onClick={() => route.push(link)}
         >
            <CardItem
               translateZ="100"
               className="text-xl font-bold"
            >
               {name === "Edit Profile" ? (
                  <svg className="w-15 h-15 text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" strokeLinecap="square" strokeLinejoin="round" strokeWidth="1" d="M7 19H5a1 1 0 0 1-1-1v-1a3 3 0 0 1 3-3h1m4-6a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm7.441 1.559a1.907 1.907 0 0 1 0 2.698l-6.069 6.069L10 19l.674-3.372 6.07-6.07a1.907 1.907 0 0 1 2.697 0Z"/></svg>
               ) : name === "Live Queue" ? (
                  <svg className="w-15 h-15 text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M11 9H5a1 1 0 0 0-1 1v4a1 1 0 0 0 1 1h6m0-6v6m0-6 5.419-3.87A1 1 0 0 1 18 5.942v12.114a1 1 0 0 1-1.581.814L11 15m7 0a3 3 0 0 0 0-6M6 15h3v5H6v-5Z"/></svg>
               ) : name === "Add Pet" ? (
                  <svg className="w-15 h-15" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" style={{fill: 'rgba(255, 255, 255, 1)'}}><path d="M17 14a5 5 0 0 0 2.71-.81L20 13a3.16 3.16 0 0 0 .45-.37l.21-.2a4.48 4.48 0 0 0 .48-.58l.06-.08a4.28 4.28 0 0 0 .41-.76 1.57 1.57 0 0 0 .09-.23 4.21 4.21 0 0 0 .2-.63l.06-.25A5.5 5.5 0 0 0 22 9V2l-3 3h-4l-3-3v7a5 5 0 0 0 5 5zm2-7a1 1 0 1 1-1 1 1 1 0 0 1 1-1zm-4 0a1 1 0 1 1-1 1 1 1 0 0 1 1-1z"></path><path d="M11 22v-5H8v5H5V11.9a3.49 3.49 0 0 1-2.48-1.64A3.59 3.59 0 0 1 2 8.5 3.65 3.65 0 0 1 6 5a1.89 1.89 0 0 0 2-2 1 1 0 0 1 1-1 1 1 0 0 1 1 1 3.89 3.89 0 0 1-4 4C4.19 7 4 8.16 4 8.51S4.18 10 6 10h5.09A6 6 0 0 0 19 14.65V22h-3v-5h-2v5z"></path></svg>
               ) : (
                  <svg className="w-15 h-15" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" style={{fill: 'rgba(255, 255, 255, 1)'}}><path d="M17 2H7a2 2 0 0 0-2 2v18l7-4.848L19 22V4a2 2 0 0 0-2-2zm-1 9h-3v3h-2v-3H8V9h3V6h2v3h3v2z"></path></svg>
               )}
            </CardItem>
            <CardItem
               as="p"
               translateZ="100"
               className="flex-text-0 max-w-sm mt-2 text-white font-semibold text-center"
            >
               {name}
            </CardItem>
         </CardBody>
      </CardContainer>
   );
}
