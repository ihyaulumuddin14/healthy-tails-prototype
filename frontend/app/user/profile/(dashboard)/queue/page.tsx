'use client'

import DashboardContent from '@/components/ui/DashboardContent'

export default function AppointmentsPage() {

   return (
      <DashboardContent type='user' subtitle='Track your real-time queue status and estimated waiting time.'>
         <h2 className="text-center flex-text-2 font-bold italic text-gray-600 mb-2">Coming Soon!</h2>
         <p className='text-center text-sm sm:text-lg opacity-50 font-extralight'>We’re working hard to bring you a live queue of your appointments here. Stay tuned—it’s on the way!</p>
      </DashboardContent>
   )
}
