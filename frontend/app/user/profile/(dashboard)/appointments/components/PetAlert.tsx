import { dialogStore } from "@/stores/dialogStore";
import { AlertDialog } from "@/components/ui/alert-dialog";
import { AlertInfo } from "@/components/ui/AlertInfo";
import { Badge } from "@/components/ui/badge";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";

export default function PetAlert() {
   const dialogPetMode = dialogStore((state) => state.dialogPetMode)
   const setDialogPetMode = dialogStore((state) => state.setDialogPetMode)
   const booking = dialogStore((state) => state.booking)
   const setBooking = dialogStore((state) => state.setBooking)

   return (
      <AlertDialog open={dialogPetMode === 'booked'} onOpenChange={(open) => {
         if (!open) {
            setDialogPetMode(null)
            setBooking(null)
         }
      }}>
         {dialogPetMode === 'booked' &&
            <AlertInfo
               heading="Appointment Details"
               description={`${booking ? "Your appointment has been successfully booked. You will be notified via email." : "Failed to book your appointment."} `}>
               {booking && (
                  <section className="w-full h-full flex flex-col p-5">
                     <div className="w-full h-[min-content] sm:grid-cols-2 grid">
                        <div className="w-full h-fit flex flex-col text-center sm:text-left">
                           <h2 className="font-semibold">Queue Number</h2>
                           <p className="font-bold text-9xl">{booking.queueNumber}</p>
                        </div>
                        <div className="w-full h-full flex flex-col-reverse sm:flex-col justify-between gap-5 py-4 min-w-[210px]">
                           <Badge
                              variant={
                                 booking.status === "CANCELLED" ? "destructive" :
                                 booking.status === "COMPLETED" ? "default" :
                                 booking.status === "WAITING" ? "waiting" :
                                 booking.status === "IN_PROGRESS" ? "inProgress" : null
                              }
                              className="self-end">
                                 {booking.status}
                           </Badge>
                           <div className="w-full flex flex-col">
                              <p className="text-xs flex gap-2 items-center">
                                 <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" style={{ fill: 'var(--color-foreground)' }}><path d="M17 14a5 5 0 0 0 2.71-.81L20 13a3.16 3.16 0 0 0 .45-.37l.21-.2a4.48 4.48 0 0 0 .48-.58l.06-.08a4.28 4.28 0 0 0 .41-.76 1.57 1.57 0 0 0 .09-.23 4.21 4.21 0 0 0 .2-.63l.06-.25A5.5 5.5 0 0 0 22 9V2l-3 3h-4l-3-3v7a5 5 0 0 0 5 5zm2-7a1 1 0 1 1-1 1 1 1 0 0 1 1-1zm-4 0a1 1 0 1 1-1 1 1 1 0 0 1 1-1z"></path><path d="M11 22v-5H8v5H5V11.9a3.49 3.49 0 0 1-2.48-1.64A3.59 3.59 0 0 1 2 8.5 3.65 3.65 0 0 1 6 5a1.89 1.89 0 0 0 2-2 1 1 0 0 1 1-1 1 1 0 0 1 1 1 3.89 3.89 0 0 1-4 4C4.19 7 4 8.16 4 8.51S4.18 10 6 10h5.09A6 6 0 0 0 19 14.65V22h-3v-5h-2v5z"></path></svg>
                                 {booking.pet.name} - {booking.pet.race} ({booking.pet.type})
                              </p>
                              <p className="text-xs flex gap-2 items-center">
                                 <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" style={{ fill: 'var(--color-foreground)' }}><path d="M8.434 20.566c1.335 0 2.591-.52 3.535-1.464l7.134-7.133a5.008 5.008 0 0 0-.001-7.072 4.969 4.969 0 0 0-3.536-1.463c-1.335 0-2.59.52-3.534 1.464l-7.134 7.133a5.01 5.01 0 0 0-.001 7.072 4.971 4.971 0 0 0 3.537 1.463zm5.011-14.254a2.979 2.979 0 0 1 2.12-.878c.802 0 1.556.312 2.122.878a3.004 3.004 0 0 1 .001 4.243l-2.893 2.892-4.242-4.244 2.892-2.891z"></path></svg>
                                 {booking.service.name}
                              </p>
                              <p className="text-xs flex gap-2 items-center">
                                 <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" style={{ fill: 'var(--color-foreground)' }}><path d="M19 4h-3V2h-2v2h-4V2H8v2H5c-1.103 0-2 .897-2 2v14c0 1.103.897 2 2 2h14c1.103 0 2-.897 2-2V6c0-1.103-.897-2-2-2zM5 20V7h14V6l.002 14H5z"></path><path d="M7 9h10v2H7zm0 4h5v2H7z"></path></svg>
                                 {booking.bookingDate.toLocaleString().split("T")[0]}
                              </p>
                           </div>
                        </div>
                     </div>

                     <Accordion type='single' collapsible className='w-full'>
                        <AccordionItem value="note" className='w-full'>
                           <AccordionTrigger className="border-b border-border">Note</AccordionTrigger>
                           <AccordionContent className="pt-5">{booking.notes}</AccordionContent>
                        </AccordionItem>
                     </Accordion>
                  </section>
               )}
            </AlertInfo>
         }
      </AlertDialog>
   )
}
