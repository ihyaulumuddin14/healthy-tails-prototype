'use client'

import { teamMembers } from '@/app/constant'
import Image from 'next/image'
import SleepImage from '@/public/images/sleep.webp'
import AnimatedText from '../../components/AnimatedText'
import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { useReducer } from 'react'
import DetailProfileCard from './components/DetailProfileCard'
import ProfileCard from './components/ProfileCard'


export type SocialMedia = {
   platform: string,
   url: string
}

type ReducerState = {
   name: string,
   noSIP: string,
   role: string,
   image: string,
   description: string
   socialMedia: SocialMedia[]
}

export default function VetSection() {
   const reducer = ( state: ReducerState, action: {id: number} ): ReducerState  => {
      const { name, noSIP, role, image, description, socialMedia } = 
      teamMembers.filter(teamMembers => teamMembers.id === action.id)[0];
      return { name, noSIP, role, image, description, socialMedia }
   }

   const [state,dispatch] = useReducer(reducer,{
      name: '',
      noSIP: '',
      role: '',
      image: '',
      description: '',
      socialMedia: [] as SocialMedia[]
   });

   return (
      <section id="team" className="team-wrapper w-full h-fit flex justify-center items-center overflow-hidden relative">
         <Image src={SleepImage} alt="sleep cat image" loading='lazy' className="sleep absolute top-0 w-full h-full opacity-5 object-cover object-center-bottom"/>

         <div className="content-wrapper flex flex-col items-center relative p-10 gap-[5vw]">
            <AnimatedText
               triggerWrapper='#team'
               type="h1"
               splitBy="lines"
               className="self-start relative text-[clamp(2.5rem,5vw,4rem)] font-bold font-inter text-[var(--color-foreground)]"
               >
                  Meet the Team Members <br /> of {" "}
                  <span className="text-texture">Healthy Tails</span>
            </AnimatedText>

            <div className="w-full max-w-2xl flex flex-wrap justify-center items-center gap-x-5 gap-y-10">
               {teamMembers.map((member) => (
                  <ProfileCard
                     key={member.id}
                     id={member.id}
                     onClick={() => dispatch({id: member.id})}
                     srcImg={member.image}
                     name={member.name}
                     no={member.noSIP}
                     footer={member.role}
                     redirectLabel="View Profile"/>
               ))}
            </div>
         </div>

         <DialogContent>
            <DialogHeader>
               <DialogTitle>Profile Detail</DialogTitle>
            </DialogHeader>
            <DialogDescription>
               <DetailProfileCard state={state} />
            </DialogDescription>
         </DialogContent>
      </section>
   )
}