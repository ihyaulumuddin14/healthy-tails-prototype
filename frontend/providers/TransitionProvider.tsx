'use client'

import useGlobalLoading from '@/stores/loadingStore';
import { TransitionRouter } from 'next-transition-router'

export function TransitionProvider({ children }: { children: React.ReactNode }) {
   const setTransitioning = useGlobalLoading((state) => state.setTransitioning);

   return (
      <TransitionRouter
         auto={true}
         leave={(next) => {
            setTransitioning(true);

            const main = document.getElementById('main');
            const loading = document.getElementById('loading');
            if (main) {
               main.style.transition = 'all 500ms ease-in-out';
               main.style.opacity= '0';
               loading!.style.transition = 'all 500ms ease-in-out';
               loading!.style.opacity= '1';
            }
            
            setTimeout(() => {
               next()
            }, 500);
         }}
         
         enter={(next) => {
            const main = document.getElementById('main');
            const loading = document.getElementById('loading');

            if (main) main.style.opacity= '0';

            setTimeout(() => {
               if (main) {
                  main.style.transition = 'all 500ms ease-in-out';
                  main.style.opacity= '1';
               }
               loading!.style.transform = 'translateY(100%)';
               
               setTimeout(() => {
                  setTransitioning(false);
                  loading!.style.transition = 'none';
                  loading!.style.transform = 'translateY(0%)';
                  loading!.style.opacity= '0';
                  next();
               }, 500);
            }, 50);
         }}
         >
         <section id="loading" className={`fixed z-2 top-0 left-0 w-full h-screen flex flex-col justify-center items-center bg-[var(--color-background)] opacity-0 pointer-events-none`}>
            <h1 className='relative z-2 text-texture xl:text-8xl lg:text-7xl md:text-6xl text-5xl font-bold text-[var(--color-foreground)] text-center split-line'>
               Healthy Tails
            </h1>
         </section>

         { children }
      </TransitionRouter>
   )
}