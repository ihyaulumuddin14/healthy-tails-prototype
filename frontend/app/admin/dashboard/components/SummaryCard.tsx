
type Props = {
   title: string
   children: React.ReactNode
   subtitle?: string
   className?: string
}

export default function SummaryCard({ title, children, subtitle, className }: Props) {
   return (
      <div className={`${className} w-full h-full flex flex-col gap-2 border-2 border-border p-[min(3vw,30px)] rounded-xl bg-muted hover:brightness-120 transition-all duration-300 ease-in-out text-2xl md:text-3xl font-bold`}>
         <h1 className="text-lg font-semibold">{ title }</h1>
         { children }
         { subtitle && <p className="text-sm italic">{ subtitle }</p> }
      </div>
   )
}
