import CardProfile from './components/CardProfile'
import { teamMembers } from '@/app/constant'
import Image from 'next/image'
import SleepImage from '@/public/images/sleep.webp'
import AnimatedText from '../../components/AnimatedText'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"


export default function VetSection() {
   return (
      <section id="team" className="team-wrapper w-full h-fit flex justify-center items-center overflow-hidden relative">
         <Image src={SleepImage} alt="sleep cat image" className="sleep absolute top-0 w-full h-full opacity-5 object-cover object-center-bottom"/>

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
                  <CardProfile
                     key={member.id}
                     id={member.id}
                     // onClick={handleModal}
                     srcImg={member.image}
                     name={member.name}
                     no={member.noSIP}
                     footer={member.role}
                     redirectLabel="View Profile"/>
               ))}
            </div>
         </div>

         <Dialog>
            <DialogTrigger asChild>
               <button>Open</button>
            </DialogTrigger>
            <DialogContent>
               <DialogHeader>
                  <DialogTitle>Are you absolutely sure?</DialogTitle>
                  <DialogDescription>
                  This action cannot be undone. This will permanently delete your account
                  and remove your data from our servers.
                  </DialogDescription>
               </DialogHeader>
            </DialogContent>
         </Dialog>
      </section>
   )
}