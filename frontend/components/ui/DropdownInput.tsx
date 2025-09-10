'use client'

import { DropdownMenu, DropdownMenuContent, DropdownMenuRadioGroup, DropdownMenuRadioItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useMemo } from "react";
import { Controller, Control, FieldValues, Path } from "react-hook-form";

type Props<T extends FieldValues> = {
   control?: Control<T>,
   name: Path<T>,
   label: string,
   options: { value: string | string[] | undefined, label: string }[],
   error?: string | undefined,
   disabled?: boolean,
   allowNone?: boolean,
   optional?: boolean
}

export default function DropdownInput<T extends FieldValues>({ control, name, label, options, error, disabled = false, allowNone = false, optional = false}: Props<T>) {

    const PLACEHOLDER_VALUE = "null-value";

    const displayOptions = useMemo(() => {
      return allowNone ? options.concat({ value: undefined, label: "None" }) : options;
    }, [options, allowNone]);

   return (
      <Controller
         name={name}
         control={control}
         render={({ field }) => {

            const selectedOption = displayOptions.find(option => typeof field.value === 'string' || typeof field.value === 'undefined' ? option.value == field.value : option.value![0] === field.value![0]);

            return (
               <div className="w-full flex flex-col gap-1">
                  <DropdownMenu>
                     <label htmlFor={name} className="w-full flex justify-start font-bold gap-1">
                        {label}
                        {optional ? (<span className="font-light">(optional)</span>) : (<span className='text-red-600'>*</span>)}
                     </label>
                     <DropdownMenuTrigger id={name} asChild className={`w-full ${disabled ? 'cursor-not-allowed opacity-60' : ''}`} disabled={disabled}>
                        <button className={`w-full justify-between text-[var(--color-foreground)] border py-2 px-4 rounded-md border-border flex items-center hover:bg-border shadow-sm shadow-border`}>
                           {selectedOption && selectedOption.label}
                           <svg className="rotate-180" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" style={{fill: 'var(--color-muted-foreground)'}}><path d="m6.293 13.293 1.414 1.414L12 10.414l4.293 4.293 1.414-1.414L12 7.586z"></path></svg>
                        </button>
                     </DropdownMenuTrigger>
                     <DropdownMenuContent>
                        <DropdownMenuRadioGroup
                           value={field.value}
                           onValueChange={(value) => {
                              field.onChange(
                                 value === PLACEHOLDER_VALUE ? undefined : 
                                 options.some(option => typeof option === 'object') ? [value] :
                                 value
                              )}}>
                           {displayOptions.map((option, index) => (
                              <DropdownMenuRadioItem key={index} value={option.value ? typeof option.value == 'string' ? option.value : option.value[0] : PLACEHOLDER_VALUE}>
                                 {option.label}
                              </DropdownMenuRadioItem>
                           ))}
                        </DropdownMenuRadioGroup>
                     </DropdownMenuContent>
                  </DropdownMenu>
                  <footer className="w-full flex items-center justify-start">
                     <p className={`text-pink-600 text-xs ml-2 ${error ? 'block' : 'hidden'}`}>
                        {error ?? 'placeholder'}
                     </p>
                  </footer>
               </div>
            )
      }}/>
   )
}
