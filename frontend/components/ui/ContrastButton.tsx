import Loader from "./Loader"

type Props = {
   children: React.ReactNode
   model: 'fill' | 'outline',
   type?: "submit" | "reset" | "button" | undefined
   width?: 'full' | 'auto'
   isLoading?: boolean
   onClick?: () => void
}

export default function ContrastButton({ children, model, type, isLoading, width, onClick }: Props) {
   return (
      <button
         disabled={isLoading}
         type={type}
         onClick={onClick}
         className={`
            flex justify-center items-center gap-2 rounded-md py-3 px-5 text-md shadow-sm active:scale-95 active:shadow-none transition-all duration-100 ease-in-out cursor-pointer
            ${width === 'full' ? 'w-full hover:scale-101' : 'w-auto hover:scale-102 active:rotate-2'}
            ${model === 'fill' ? 'bg-[var(--color-background)] text-[var(--color-foreground)]' : 'border border-[var(--color-foreground)] text-[var(--color-foreground)]'}`}
      >
         {isLoading ? (<Loader />) : (children)}
      </button>
   )
}
