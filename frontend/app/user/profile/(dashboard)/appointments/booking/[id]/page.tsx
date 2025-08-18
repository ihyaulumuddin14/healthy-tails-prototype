'use client'

import { getBookingById } from "@/api/booking.actions";
import DashboardContent from "@/components/ui/DashboardContent";
import { Booking } from "@/type/type";
import { useEffect, useState } from "react";
import { set } from "zod";

export default function DetailBookingPage({
   params
}: {
   params: Promise<{ id: string }>
}) {
   const [booking, setBooking] = useState<Booking | null>(null);
   const [isLoading, setIsLoading] = useState(true);
   const [isError, setIsError] = useState(false);
   
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

   return (
      <DashboardContent title="Booking Details" subtitle="Detailed information of your booking is shown below. You may proceed with cancellations if applicable.">
         {isLoading && <div>Loading...</div>}
         {isError && <div>Failed to load</div>}
         {booking && <pre>{JSON.stringify(booking, null, 2)}</pre>}
      </DashboardContent>
   );
}
