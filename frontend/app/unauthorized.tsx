'use client'

import AnimateFillButton from "@/components/ui/AnimateFillButton";
import { Link } from "@/providers/nprogress/Link";

export default function UnauthorizedPage() {
   return (
      <section className="section-wrapper h-screen flex-col gap-4">
         <h1 className="xl:text-8xl lg:text-7xl md:text-6xl sm:text-5xl text-4xl font-extrabold mb-4">
            <span className="text-texture">401{" "}</span>
            <span className="text-stroke">UNAUTHORIZED</span>
         </h1>
         <p className="text-md sm:text-xl text-[var(--color-muted-foreground)]">Access Denied, What you want to do next?</p>
         <div className="flex gap-5">
            <AnimateFillButton model='outline'>
               <Link isAnimated={true} href={"/home"}>
                  Back to Home
               </Link>
            </AnimateFillButton>
            <AnimateFillButton model='fill'>
               <Link isAnimated={true} href="/login">
                  Login
               </Link>
            </AnimateFillButton>
         </div>
      </section>
   )
}
