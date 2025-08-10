

type Props = {
   children: React.ReactNode
   type?: "submit" | "reset" | "button" | undefined
   width?: 'full' | 'auto'
   onClick?: () => void
   className?: string
}

export default function MiniButton({ children, type, width, onClick, className }: Props) {
   return (
      <button
         type={type}
         onClick={onClick}
         className={`
            backdrop-blur-xl text-white py-1 px-3 rounded-xl text-sm
            ${width === 'full' ? 'w-full' : 'w-auto'} group overflow-hidden
            active:scale-95 cursor-pointer ${className}
            transition-all duration-200 ease-in-out flex items-center gap-2 font-semibold`}>
               {/* bg */}
               <div className="absolute -z-1 top-0 left-0 w-0 group-hover:w-full h-full bg-[#3a9b7e] transition-all duration-200 ease-in-out"></div>
            { children }
      </button>
   )
}
