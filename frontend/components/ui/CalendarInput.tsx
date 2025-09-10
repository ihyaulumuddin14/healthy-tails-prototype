"use client"

import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Calendar } from "@/components/ui/calendar"
import { Control, Controller, FieldValues, Path } from "react-hook-form"

type Props<T extends FieldValues> = {
   name: Path<T>
   control: Control<T>
   label: string
   error?: string
   optional?: boolean
}

export default function CalendarInput<T extends FieldValues>({ name, control, label, error, optional = false }: Props<T>) {

   return (
      <Controller
         name={name}
         control={control}
         render={({ field }) => (
            <div className="w-full flex flex-col gap-1">
               <DropdownMenu>
                  <label htmlFor={name} className="w-full flex justify-start font-bold gap-1">
                     {label}
                     {optional ? (<span className="font-light">(optional)</span>) : (<span className='text-red-600'>*</span>)}
                  </label>
                  <DropdownMenuTrigger>
                     <button className="w-full text-[var(--color-foreground)] border py-2 px-4 rounded-md border-border flex items-center justify-between hover:bg-border shadow-sm shadow-border">
                        {field.value ? field.value.toLocaleDateString('id') : "Select date"}
                        <svg className="rotate-180" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" style={{fill: 'var(--color-muted-foreground)'}}><path d="m6.293 13.293 1.414 1.414L12 10.414l4.293 4.293 1.414-1.414L12 7.586z"></path></svg>
                     </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                     <Calendar
                        mode="single"
                        captionLayout="dropdown"
                        onSelect={(date) => {
                           date?.setHours(7)
                           field.onChange(date);
                        }}
                     />
                  </DropdownMenuContent>
               </DropdownMenu>
               <footer className="w-full flex items-center justify-start">
                  <p className={`text-pink-600 text-xs ml-2 ${error ? 'visible' : 'invisible'}`}>
                     {error ?? 'placeholder'}
                  </p>
               </footer>
            </div>
         )}
      />
   )
}
