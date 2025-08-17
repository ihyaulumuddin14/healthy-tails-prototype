import Loader from "./Loader"

type Props = {
   children: React.ReactNode
   type?: "submit" | "reset" | "button" | undefined
   width?: 'full' | 'auto'
   model: 'fill' | 'danger' | 'outline',
   isLoading?: boolean
   onClick?: () => void
   className?: string
   form?: string
}

export default function AnimateFillButton({ model, children, type, isLoading, width, onClick, className, form }: Props) {
   return (
      <button
         form={form}
         disabled={isLoading}
         type={type}
         className={`
            shrink-0 relative z-0 flex items-center gap-2 py-3 px-5 rounded-4xl hover:rounded-sm font-semibold transition-all duration-400 ease-in-out cursor-pointer group overflow-hidden
            hover:text-[var(--color-background)] justify-center
            ${width === 'full' ? 'w-full' : 'w-fit'} ${className}
            ${model === 'fill' ? 'bg-[var(--color-accent)] text-[var(--color-accent-foreground)]' : model === 'danger' ? 'bg-red-500 text-[var(--color-background)]' : 'border border-[var(--color-tertiary)] text-[var(--color-tertiary)]'}`
         }
         onClick={onClick}>
         <div className="absolute -z-1 top-0 left-0 w-0 group-hover:w-full h-full bg-[var(--color-foreground)] transition-all duration-400 ease-in-out"></div>
            {isLoading ? (<Loader />) : (children)}
      </button>
   )
}
