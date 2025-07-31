'use client'

import Image from "next/image"
import RedirectButton from "@/app/(landing-page)/components/RedirectButton";


type Props = {
   id: number,
   srcImg: string,
   name: string,
   no?: string,
   footer: string,
   redirectLabel: string,
   onClick?: (id?: number) => void,
}

const CardProfile = ( {id, srcImg, name, no, footer, redirectLabel, onClick = () => {}}: Props ) => {
   return (
      <div className="w-[250px] aspect-4/6 overflow-hidden rounded-2xl relative shrink-0 flex flex-col items-center p-5 border-5 border-[var(--color-tertiary)] group cursor-pointer shadow-md" onClick={() => onClick(id)}>
         <Image aria-hidden="true" src={srcImg} alt="bg-vet" width={250} height={375} className="w-full h-full object-cover absolute top-0 z-0 brightness-20 group-hover:scale-110 group-hover:brightness-100 ease-in-out duration-500"/>

         <div className="w-[50%] aspect-square overflow-hidden rounded-full relative z-1 group-hover:-translate-y-50 ease-in-out duration-500">
            <Image src={srcImg} alt="vet profile picture" width={250} height={375} loading="lazy" />
         </div>
         <h2 className="relative z-1 text-lg text-slate-100 mt-2 font-semibold group-hover:-translate-y-50 ease-in-out duration-500">{name}</h2>
         <h3 className="relative z-1 text-xs text-slate-100 break-words mt-1 font-extralight group-hover:-translate-y-50 ease-in-out duration-500">{no}</h3>

         <p className="relative z-1 text-md text-slate-100 mt-auto group-hover:translate-y-50 ease-in-out duration-500">{footer}</p>

         <RedirectButton addGapBottom={true} label={redirectLabel} onClick={() => onClick(id)} />
      </div>
   )
}

export default CardProfile