import RedirectButton from "../components/RedirectButton"


type Props = {
   srcImg: string,
   name: string,
   no?: string,
   footer: string,
   redirectLabel: string
   link?: string,
   index?: number
}

const CardProfile = ( {srcImg, name, no, footer, redirectLabel, link = "/", index}: Props ) => {
   return (
      <div className="w-[250px] aspect-4/6 overflow-hidden rounded-2xl relative shrink-0 flex flex-col items-center p-5 border border-white group cursor-pointer shadow-md"  key={index}>
         <img aria-hidden="true" src={srcImg} alt="bg-vet" className="w-full h-full object-cover absolute top-0 z-0 brightness-20 group-hover:scale-110 group-hover:brightness-100 ease-in-out duration-500"/>

         <div className="w-[50%] aspect-square overflow-hidden rounded-full relative z-1 group-hover:-translate-y-50 ease-in-out duration-500">
            <img src={srcImg} alt="vet profile picture" />
         </div>
         <h2 className="relative z-1 text-lg text-slate-100 mt-2 font-semibold group-hover:-translate-y-50 ease-in-out duration-500">{name}</h2>
         <h3 className="relative z-1 text-xs text-slate-100 break-words mt-1 font-extralight group-hover:-translate-y-50 ease-in-out duration-500">{no}</h3>

         <p className="relative z-1 text-md text-slate-100 mt-auto group-hover:translate-y-50 ease-in-out duration-500">{footer}</p>

         <RedirectButton label={redirectLabel} onClick={() => window.location.href = link} />
      </div>
   )
}

export default CardProfile