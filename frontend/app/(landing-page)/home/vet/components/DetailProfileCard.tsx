import Image from "next/image"
import type { SocialMedia } from "../VetSection"

type Props = {
   image: string,
   name: string,
   noSIP: string,
   role: string,
   description: string,
   socialMedia: SocialMedia[]
}

export default function DetailProfileCard({ state }: { state: Props }) {
   return (
      <>
         <div className="w-[30%] aspect-square overflow-hidden rounded-full relative z-1">
            <Image src={state.image} alt="vet profile picture" width={250} height={375} loading="lazy" />
         </div>

         <h2 className="relative z-1 text-xl text-[var(--color-foreground)] mt-2 font-semibold">{state.name}</h2>
         <h3 className="relative z-1 text-xs text-[var(--color-foreground)] break-words mt-1 font-extralight">{state.noSIP}</h3>

         <div className='w-full flex h-fit justify-center gap-5 my-5'>
            {state.socialMedia.map((item: { platform: string, url: string }, index: number) => (
               <SocialMediaButton key={index} link={item.url}>
                  {item.platform === 'linkedin' ? (
                     <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                        <path fill-rule="evenodd" d="M12.51 8.796v1.697a3.738 3.738 0 0 1 3.288-1.684c3.455 0 4.202 2.16 4.202 4.97V19.5h-3.2v-5.072c0-1.21-.244-2.766-2.128-2.766-1.827 0-2.139 1.317-2.139 2.676V19.5h-3.19V8.796h3.168ZM7.2 6.106a1.61 1.61 0 0 1-.988 1.483 1.595 1.595 0 0 1-1.743-.348A1.607 1.607 0 0 1 5.6 4.5a1.601 1.601 0 0 1 1.6 1.606Z" clip-rule="evenodd"/>
                        <path d="M7.2 8.809H4V19.5h3.2V8.809Z"/>
                     </svg>
                  ) : (
                     <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                        <path fill="currentColor" fill-rule="evenodd" d="M3 8a5 5 0 0 1 5-5h8a5 5 0 0 1 5 5v8a5 5 0 0 1-5 5H8a5 5 0 0 1-5-5V8Zm5-3a3 3 0 0 0-3 3v8a3 3 0 0 0 3 3h8a3 3 0 0 0 3-3V8a3 3 0 0 0-3-3H8Zm7.597 2.214a1 1 0 0 1 1-1h.01a1 1 0 1 1 0 2h-.01a1 1 0 0 1-1-1ZM12 9a3 3 0 1 0 0 6 3 3 0 0 0 0-6Zm-5 3a5 5 0 1 1 10 0 5 5 0 0 1-10 0Z" clip-rule="evenodd"/>
                     </svg>
                  )}
                  {item.platform}
               </SocialMediaButton>
            ))}
         </div>

         <hr className="w-full border-[var(--color-tertiary)]/30"/>

         <p className="relative z-1 text-md text-center text-[var(--color-foreground)] my-5">{state.description}</p>
      </>
   )
}


function SocialMediaButton({ children, link }: { children: React.ReactNode, link: string }) {
   return (
      <a
         target="_blank"
         href={link}
         className='flex h-fit gap-2 items-center px-2 py-1 rounded-md border border-[var(--color-tertiary)]/20 bg-[var(--color-foreground)]/10 text-[var(--color-foreground)] hover:scale-102 active:rotate-2 active:scale-95 transition ease-in-out duration-200'>
            {children}
      </a>
   )
}