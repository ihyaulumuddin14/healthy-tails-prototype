import React from 'react'
import { useNavigate } from 'react-router-dom'

type Props = {
   type: "fill" | "outline",
   children: React.ReactNode,
   link?: string,
}

const BasicButton = ({ type, children, link = '/' }: Props) => {
   const nagivate = useNavigate();

   return (
      <button
         onClick={() => nagivate({ pathname: link })}
         className={`
         font-inter text-center text-md py-3 px-6 rounded-2xl hover:scale-95 ease-in-out duration-100 cursor-pointer
         ${type === "fill" ? "bg-[var(--tertiary-color)] text-slate-900" : "bg-transparent border border-[var(--tertiary-color)] text-[var(--tertiary-color)]"}
         `}>
            {children}
      </button>
   )
}

export default BasicButton