'use client'

import { AlertDialog } from '@/components/ui/alert-dialog'
import React, { useEffect } from 'react'

import { type History } from '@/type/type';
import { AlertInfo } from '@/components/ui/AlertInfo';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Badge } from '@/components/ui/badge';
import Divider from '@/components/ui/Divider';

type Props = {
   history: History,
   setHistoryAlert: React.Dispatch<React.SetStateAction<History>>,
   setIsAlertOpen: React.Dispatch<React.SetStateAction<boolean>>,
   isAlertOpen: boolean
}

export default function VisitHistoryAlert({ history, isAlertOpen, setHistoryAlert, setIsAlertOpen }: Props) {
   useEffect(() => {
      console.log(isAlertOpen);
   }, [isAlertOpen])

   return (
      <AlertDialog open={isAlertOpen} onOpenChange={(open) => {
         if (!open) {
            setHistoryAlert({} as History)
            setIsAlertOpen(false)
         }
      }}>
         <AlertInfo
            heading="Visit History Details"
            description={"Here you can review the detailed records of this visit."}>
               {history && (
                  <section className="w-full h-full flex flex-col p-5 gap-5">
                     <div className="w-full h-[min-content] sm:grid-cols-2 grid">
                        {/* left */}
                        <div className="w-full flex flex-col gap-3">
                           <div>
                              <h2 className="text-gray-400 text-sm font-semibold">Pet Name:</h2>
                              <h3 className="text-[var(--color-foreground)] text-md font-semibold">{history.pet?.name}</h3>
                           </div>
                           <div>
                              <h2 className="text-gray-400 text-sm font-semibold">Visit Date:</h2>
                              <h3 className="text-[var(--color-foreground)] text-md font-semibold">{new Date(history.visitDate).toLocaleDateString('en-US', {day: 'numeric', month: 'short', year: 'numeric'})}</h3>
                           </div>
                           <div>
                              <h2 className="text-gray-400 text-sm font-semibold">Body Weight:</h2>
                              <h3 className="text-[var(--color-foreground)] text-md font-semibold">{history.bodyWeight} kg</h3>
                           </div>
                        </div>

                        {/* center */}
                        <div className="w-full flex flex-col gap-3">
                           <div>
                              <h2 className="text-gray-400 text-sm font-semibold">Type:</h2>
                              <h3 className="text-[var(--color-foreground)] text-md font-semibold">{history.pet?.type}</h3>
                           </div>
                           <div>
                              <h2 className="text-gray-400 text-sm font-semibold">Next Visit Date:</h2>
                              <h3 className="text-[var(--color-foreground)] text-md font-semibold">{history ? new Date(history.nextVisitDate as string).toLocaleDateString('en-US', {day: 'numeric', month: 'short', year: 'numeric'}) : '-'}</h3>
                           </div>
                           <div>
                              <h2 className="text-gray-400 text-sm font-semibold">Temperature:</h2>
                              <h3 className="text-[var(--color-foreground)] text-md font-semibold">{history.temperature} °C</h3>
                           </div>
                        </div>
                     </div>

                     <Divider>Result</Divider>
                     
                     <div className="w-full h-[min-content] flex flex-col gap-3">
                           <div>
                              <h2 className="text-gray-400 text-sm font-semibold">Symptoms:</h2>
                              <h3 className="text-[var(--color-foreground)] text-md font-semibold">{history.symptoms}</h3>
                           </div>
                           <div>
                              <h2 className="text-gray-400 text-sm font-semibold">Diagnosis:</h2>
                              <h3 className="text-[var(--color-foreground)] text-md font-semibold">{history.diagnosis}</h3>
                           </div>
                           <div>
                              <h2 className="text-gray-400 text-sm font-semibold">Treatments:</h2>
                              <h3 className="text-[var(--color-foreground)] text-md font-semibold">{history.treatments || '-'}</h3>
                           </div>
                     </div>

                     <Accordion type='single' collapsible className='w-full'>
                        <AccordionItem value="note" className='w-full'>
                           <AccordionTrigger className="border-b border-border">Note</AccordionTrigger>
                           <AccordionContent className="pt-5">{history.notes}</AccordionContent>
                        </AccordionItem>
                     </Accordion>
                  </section>
               )}
         </AlertInfo>
      </AlertDialog>
   )
}
