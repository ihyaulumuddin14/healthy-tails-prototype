'use client'

import BasicButton from "@/components/ui/BasicButton";
import { useRouter } from "next/navigation";

export default function ForbiddenPage() {
   const router = useRouter();

   return (
      <section className="section-wrapper h-screen flex-col gap-4">
         <h1 className="xl:text-9xl lg:text-8xl md:text-7xl sm:text-6xl text-4xl font-extrabold mb-4">
            <span className="text-texture">403{" "}</span>
            <span className="text-stroke">FORBIDDEN</span>
         </h1>
         <p className="text-md sm:text-xl text-[var(--color-foreground)]">Access Restricted, You don`t have permission to access this page</p>
         <BasicButton model='outline' onClick={() => router.replace('/')}>Back to Home</BasicButton>
      </section>
   )
}
