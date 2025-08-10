import React from 'react'

export default function Divider({ children }: { children?: React.ReactNode }) {
   return (
      <div className='divider w-full flex items-center gap-3 text-gray-300 my-4' aria-hidden="true">
         <hr className='w-full'/>
         <p>{children}</p>
         <hr className='w-full'/>
      </div>
   )
}
