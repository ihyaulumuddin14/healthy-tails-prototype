import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import useBookings from '@/hooks/useBookings';
import TableSkeleton from './TableSkeleton';
import { useNavigation } from '@/hooks/useNavigation';
import { useMemo } from 'react';

export default function AppointmentsList({ searchTerm, selectedFilter }: { searchTerm: string, selectedFilter: string }) {
   const { bookings, isLoading, error } = useBookings();
   const { goPush } = useNavigation();

   const filteredBookings = useMemo(() => {
      let result = bookings ?? [];
      
      result = result.filter(booking => {
         if (selectedFilter === "ALL") return true
         else if (selectedFilter === "UPCOMING") return booking.status === "WAITING" || booking.status === "IN_PROGRESS" || booking.status === "CANCELLED"
         else if (selectedFilter === "COMPLETED") return booking.status === "COMPLETED"
      })
      
      if (searchTerm !== '') {
         result = result.filter(booking => booking.pet.name.toLowerCase().includes(searchTerm.toLowerCase()))
      }
      
      return result;
   }, [searchTerm, selectedFilter, bookings])

   if (isLoading) {
      return (
         <TableSkeleton />
      )
   }

   if (error) {
      return <div className="text-center text-2xl font-bold text-gray-600">Failed to load</div>
   }

   return (
      <section className='w-full h-fit rounded-2xl overflow-hidden border-2 border-border'>
         <div className='w-full h-fit relative overflow-x-auto'>
            <table className='w-full text-sm text-left'>
               <thead>
                  <tr className='text-xs text-[var(--color-muted-foreground)] border-b-2 border-border bg-muted'>
                     <th scope='col' className='px-6 py-4 whitespace-nowrap'>Queue</th>
                     <th scope='col' className='px-6 py-4 whitespace-nowrap'>Pet`s Name</th>
                     <th scope='col' className='px-6 py-4 whitespace-nowrap'>Date</th>
                     <th scope='col' className='px-6 py-4 whitespace-nowrap'>Status</th>
                     <th scope='col' className='px-6 py-4 whitespace-nowrap'>Service Type</th>
                     <th></th>
                  </tr>
               </thead>
               <tbody>
                  {filteredBookings.map((booking, index) => (
                     <tr key={index} className='hover:bg-[var(--color-muted)]'>
                        <td className='px-6 py-4 whitespace-nowrap'>{booking.queueNumber}</td>
                        <td className='px-6 py-4 whitespace-nowrap'>{booking.pet.name}</td>
                        <td className='px-6 py-4 whitespace-nowrap'>
                           {booking.bookingDate ? new Date(booking.bookingDate).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" }) : "N/A"}<br />
                        </td>
                        <td className='px-6 py-4 whitespace-nowrap'>
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
                        </td>
                        <td className='px-6 py-4 whitespace-nowrap'>{booking.service.name}</td>
                        <td className='px-6 py-4 flex gap-3'>
                           <Button variant={"secondary"} onClick={() => {
                              goPush(`/user/profile/appointments/booking/${booking._id}`)
                           }}>Details</Button>
                           <Button variant={"default"} disabled={booking.status !== "COMPLETED"}>Visit Result</Button>
                        </td>
                     </tr>
                  ))}
               </tbody>
            </table>
         </div>
      </section>
   )
}
