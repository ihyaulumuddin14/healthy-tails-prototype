import Loader from "./Loader"

type Props = {
   children: React.ReactNode
   model: 'fill' | 'outline' | 'danger',
   type?: "submit" | "reset" | "button" | undefined
   width?: 'full' | 'auto'
   isLoading?: boolean
   onClick?: () => void
   className?: string
   form?: string
}

export default function BasicButton({ children, model, type, isLoading, width, onClick, className, form }: Props) {
   return (
      <button
         form={form}
         disabled={isLoading}
         type={type}
         onClick={onClick}
         className={`
            flex justify-center items-center gap-2 rounded-md py-3 px-5 text-md shadow-sm active:scale-95 active:shadow-none transition-all duration-100 ease-in-out cursor-pointer font-semibold
            ${width === 'full' ? 'w-full hover:scale-101' : 'w-fit hover:scale-102 active:rotate-2'} ${className}
            ${model === 'fill' ? 'bg-[var(--color-accent)] text-[var(--color-accent-foreground)]' : model === 'danger' ? 'bg-red-500 text-black' : 'border border-[var(--color-tertiary)] text-[var(--color-tertiary)]'}`}
      >
         {isLoading ? (<Loader />) : (children)}
      </button>
   )
}
