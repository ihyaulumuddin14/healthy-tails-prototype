'use client'

import { Link } from "@/providers/nprogress/Link"
import AnimateFillButton from "@/components/ui/AnimateFillButton"
import { dialogStore } from "@/stores/dialogStore";

export default function AppointmentButton() {
   const setDialogPetMode = dialogStore((state) => state.setDialogPetMode);

   return (
      <AnimateFillButton model='fill' type="button" onClick={() => setDialogPetMode('book')}>
         <Link isAnimated={true} href={'/user/profile/appointments'}>
            Get an Appointment
         </Link>
      </AnimateFillButton>
   )
}
