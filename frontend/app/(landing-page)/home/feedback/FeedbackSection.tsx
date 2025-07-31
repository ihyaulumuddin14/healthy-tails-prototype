import { reviewClients } from "@/app/constant"
import AnimatedText from "../../components/AnimatedText"
import Carousel from './components/Carousel'

export default function FeedbackSection() {
   return (
      <section id='feedback' className="section-wrapper">
         <div className="content-wrapper p-[min(7vw,100px)] flex flex-col gap-10 items-center">
            <AnimatedText
               triggerWrapper='#feedback'
               type='h1'
               splitBy='lines'
               className='flex-text-1 text-[var(--color-foreground)] mb-10 self-start border-b'
            >
               <span className='bg-[url(/images/texture.jpg)] bg-cover text-shadow-2xs bg-clip-text text-transparent text-texture'>Your feedback</span>
               {" "}keeps us going
            </AnimatedText>

            <Carousel slides={reviewClients} />
         </div>
      </section>
   )
}