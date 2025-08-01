'use client'

import { serviceLists } from '@/app/constant'
import Stagger from './components/Stagger'
import Image from 'next/image'
import GMapsImage from '@/public/images/gmaps-icon.svg'
import ServiceCard from './components/ServiceCard'
import HorizontalScroll from './components/HorizontalScroll'

export default function ServiceSection() {
   return (
      <HorizontalScroll.Container id="service">
         <MapReviewsCard/>

         {serviceLists.map((service, index) => (
            <ServiceCard
               key={index}
               title={service.name}
               summary={service.summary}
               link={`/services#${service.articles.id}`}
            />
         ))}
      </HorizontalScroll.Container>
   )
}



const MapReviewsCard = () => {
   return (
      <li className='service-card flex gap-5 bg-[var(--color-foreground)]/10 rounded-4xl hover:bg-[var(--color-foreground)]/20 hover:scale-98 ease-in-out duration-300'>
         <h1 className='flex justify-center items-center gap-5'>
            <Stagger className='font-bold xl:text-8xl lg:text-6xl text-5xl'>700</Stagger>
            <span className='flex-text-1'>
               Pet Parents
            </span>
         </h1>

         <p className='xl:text-4xl lg:text-3xl md:text-2xl text-xl leading-[1.3]'>
            can`t be wrong <br />
            - check our Google Reviews
         </p>

         <a href="https://maps.app.goo.gl/haCJXQjGzteiUURNA" target='_blank' className='relative group'>
            <Image
               loading='lazy'
               src={GMapsImage}
               alt="google maps icon"
               className='peer w-[10rem] mt-10 cursor-pointer hover:scale-110 ease-in-out duration-300 origin-bottom'
            />
            <Image
               loading='lazy'
               aria-hidden="true"
               src={GMapsImage}
               alt="google maps icon"
               className='absolute w-[10rem] bottom-0 pointer-events-none blur-sm animate-pulse peer-hover:scale-110 hover:animate-shake ease-in-out duration-300 origin-bottom brightness-130 opacity-50'
            />
         </a>
      </li>
   )
}