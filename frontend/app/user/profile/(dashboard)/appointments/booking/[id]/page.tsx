'use client'

import { cancelBookingById, getBookingById } from "@/api/booking.actions";
import { Badge } from "@/components/ui/badge";
import DashboardContent from "@/components/ui/DashboardContent";
import { Booking } from "@/type/type";
import { useEffect, useState } from "react";
import { tabListBookingDetails } from "@/app/constant";
import AnimateFillButton from "@/components/ui/AnimateFillButton";
import useBookings from "@/hooks/useBookings";
import { useNavigation } from "@/hooks/useNavigation";
import { showErrorToast, showLoadingToast, showSuccessToast } from "@/helpers/toastHelper";
import SkeletonBookingDetails from "./SkeletonBookingDetails";


export default function DetailBookingPage({
   params
}: {
   params: Promise<{ id: string }>
}) {
   const { mutateBookings } = useBookings();
   const { goReplace } = useNavigation();
   const [booking, setBooking] = useState<Booking | null>(null);
   const [isLoading, setIsLoading] = useState(true);
   const [isError, setIsError] = useState(false);
   const [menuActive, setMenuActive] = useState<{id: number, name: string}>({ id: 1, name: "Details" });

   useEffect(() => {
      const fetchBooking = async () => {
         const { id } = await params;
         const data = await getBookingById({ id });
         
         if (data.success) setBooking(data.booking);
         else setIsError(true);
         setIsLoading(false);
      };
      fetchBooking();
   }, [])

   const handleCancelBooking = async () => {
      showLoadingToast('Cancelling booking...');
      if (booking) {
         const data = await cancelBookingById({ id: booking._id });

         if (data.success) {
            showSuccessToast(data.message)
            mutateBookings();
            goReplace('/user/profile/appointments');
         } else {
            showErrorToast(data.error as string)
         }
      }
   }

   return (
      <DashboardContent title="Booking Details" subtitle="Detailed information of your booking is shown below. You may proceed with cancellations if applicable.">
         {isLoading && <SkeletonBookingDetails />}
         {isError && <div className="text-center text-2xl font-bold text-gray-600">Failed to load</div>}
         {booking && (
            <section className="w-full h-fit md:max-h-[300px] grid grid-cols-1 lg:grid-cols-[1fr_1.5fr_0.5fr] gap-10 lg:gap-2 relative">
               <div className="w-full h-full border border-border rounded-4xl p-[min(6vw,40px)] items-center flex flex-col gap-5 gradient-card">
                  <h2 className="text-4xl font-semibold">Queue {booking.queueNumber}</h2>

                  <div className="w-full flex flex-col gap-2">
                     <p className="text-md flex gap-2 items-center">
                        <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" style={{ fill: 'var(--color-foreground)' }}><path d="M17 14a5 5 0 0 0 2.71-.81L20 13a3.16 3.16 0 0 0 .45-.37l.21-.2a4.48 4.48 0 0 0 .48-.58l.06-.08a4.28 4.28 0 0 0 .41-.76 1.57 1.57 0 0 0 .09-.23 4.21 4.21 0 0 0 .2-.63l.06-.25A5.5 5.5 0 0 0 22 9V2l-3 3h-4l-3-3v7a5 5 0 0 0 5 5zm2-7a1 1 0 1 1-1 1 1 1 0 0 1 1-1zm-4 0a1 1 0 1 1-1 1 1 1 0 0 1 1-1z"></path><path d="M11 22v-5H8v5H5V11.9a3.49 3.49 0 0 1-2.48-1.64A3.59 3.59 0 0 1 2 8.5 3.65 3.65 0 0 1 6 5a1.89 1.89 0 0 0 2-2 1 1 0 0 1 1-1 1 1 0 0 1 1 1 3.89 3.89 0 0 1-4 4C4.19 7 4 8.16 4 8.51S4.18 10 6 10h5.09A6 6 0 0 0 19 14.65V22h-3v-5h-2v5z"></path></svg>
                        {booking.pet.name} - {booking.pet.race} ({booking.pet.type})
                     </p>
                     <p className="text-md flex gap-2 items-center">
                        <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" style={{ fill: 'var(--color-foreground)' }}><path d="M8.434 20.566c1.335 0 2.591-.52 3.535-1.464l7.134-7.133a5.008 5.008 0 0 0-.001-7.072 4.969 4.969 0 0 0-3.536-1.463c-1.335 0-2.59.52-3.534 1.464l-7.134 7.133a5.01 5.01 0 0 0-.001 7.072 4.971 4.971 0 0 0 3.537 1.463zm5.011-14.254a2.979 2.979 0 0 1 2.12-.878c.802 0 1.556.312 2.122.878a3.004 3.004 0 0 1 .001 4.243l-2.893 2.892-4.242-4.244 2.892-2.891z"></path></svg>
                        {booking.service.name}
                     </p>
                     <p className="text-md flex gap-2 items-center">
                        <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" style={{ fill: 'var(--color-foreground)' }}><path d="M19 4h-3V2h-2v2h-4V2H8v2H5c-1.103 0-2 .897-2 2v14c0 1.103.897 2 2 2h14c1.103 0 2-.897 2-2V6c0-1.103-.897-2-2-2zM5 20V7h14V6l.002 14H5z"></path><path d="M7 9h10v2H7zm0 4h5v2H7z"></path></svg>
                        {booking.bookingDate ? new Date(booking.bookingDate).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" }) : "N/A"}
                     </p>
                  </div>

                  <Badge
                     variant={
                        booking.status === "CANCELLED" ? "destructive" :
                        booking.status === "COMPLETED" ? "default" :
                        booking.status === "WAITING" ? "waiting" :
                        booking.status === "IN_PROGRESS" ? "inProgress" : null
                     }
                     className="text-2xl">
                        {booking.status}
                  </Badge>
               </div>

               <div className="details w-full overflow-auto h-fit md:max-h-[300px] relative">
                  <nav className="sticky top-0 px-5 w-full flex justify-start bg-background">
                     {tabListBookingDetails.map((list, index) => (
                        <button key={index} onClick={() => setMenuActive(list)} className="w-25 relative z-1 cursor-pointer">
                           <h2 className={`text-lg ${menuActive.name === list.name ? "text-tertiary-foreground font-semibold" : "text-muted-foreground"} py-1 transition-all duration-200 ease-in-out`}>{list.name}</h2>
                        </button>
                     ))}
                     <div
                        style={{
                           transform: `translateX(${(menuActive.id - 1) * 100}%)`,
                           transition: 'all .2s cubic-bezier(.41,-0.27,.57,1.28)'
                        }}
                        className={`w-25 absolute bottom-0 left-5 h-9 bg-tertiary rounded-md z-0 transition-all duration-200 shadow-2xl`}>
                     </div>
                  </nav>
                  <main className="w-full h-fit px-5 pt-3">
                     {menuActive.name === 'Details' && (
                        <div className="w-full h-full p-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 text-left">
                           {/* left */}
                           <div className="w-full flex flex-col gap-3">
                              <div>
                                 <h2 className="text-gray-400 text-sm font-semibold">Name:</h2>
                                 <h3 className="text-[var(--color-foreground)] text-md font-semibold">{booking.pet.name}</h3>
                              </div>
                              <div>
                                 <h2 className="text-gray-400 text-sm font-semibold">Type:</h2>
                                 <h3 className="text-[var(--color-foreground)] text-md font-semibold">{booking.pet.type}</h3>
                              </div>
                              <div>
                                 <h2 className="text-gray-400 text-sm font-semibold">Race:</h2>
                                 <h3 className="text-[var(--color-foreground)] text-md font-semibold">{booking.pet.race}</h3>
                              </div>
                              <div>
                                 <h2 className="text-gray-400 text-sm font-semibold">Color:</h2>
                                 <h3 className="text-[var(--color-foreground)] text-md font-semibold">{booking.pet.color}</h3>
                              </div>
                           </div>

                           {/* center */}
                           <div className="w-full flex flex-col gap-3">
                              <div>
                                 <h2 className="text-gray-400 text-sm font-semibold">Birthdate:</h2>
                                 <h3 className="text-[var(--color-foreground)] text-md font-semibold">{booking.pet.birthDate?.split("T")[0] || "-"}</h3>
                              </div>
                              <div>
                                 <h2 className="text-gray-400 text-sm font-semibold">Age:</h2>
                                 <h3 className="text-[var(--color-foreground)] text-md font-semibold">{booking.pet.age}</h3>
                              </div>
                              <div>
                                 <h2 className="text-gray-400 text-sm font-semibold">Gender:</h2>
                                 <h3 className="text-[var(--color-foreground)] text-md font-semibold">{booking.pet.gender}</h3>
                              </div>
                           </div>

                           {/* right */}
                           <div className="w-full flex flex-col gap-3">
                              <div>
                                 <h2 className="text-gray-400 text-sm font-semibold">Service Type:</h2>
                                 <h3 className="text-[var(--color-foreground)] text-md font-semibold">{booking.service.name}</h3>
                              </div>
                              <div>
                                 <h2 className="text-gray-400 text-sm font-semibold">Estimated Waiting Time:</h2>
                                 <h3 className="text-[var(--color-foreground)] text-md font-semibold">{booking.service.estimatedDurationMinutes} min</h3>
                              </div>
                           </div>
                        </div>
                     )}

                     {menuActive.name === 'Notes' && (
                        <div className="w-full h-full p-5 pt-0 text-left">
                           {booking?.notes}
                        </div>
                     )}
                  </main>
               </div>

               <div className="w-full h-fit lg:h-[300px] flex items-end justify-center">
                  <AnimateFillButton model="danger" className={`shrink-0 ${booking.status === 'WAITING' ? '' : 'hidden'}`} onClick={handleCancelBooking}>Cancel Booking</AnimateFillButton>
               </div>
            </section>
         )}
      </DashboardContent>
   );
}
