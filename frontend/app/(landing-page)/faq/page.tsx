import AnimatedText from '../components/AnimatedText'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { faqData } from '@/app/constant'
import Footer from '@/components/ui/Footer'

export default function page() {
   return (
      <section id='faq' className='section-wrapper'>
         <div className='w-full mt-18 flex flex-col items-center justify-center'>
            <header className='w-full h-fit pt-15'>
               <AnimatedText triggerWrapper='#faq' type='h1' splitBy='lines' className='xl:text-7xl lg:text-6xl md:text-5xl text-4xl font-bold text-[var(--color-foreground)] text-center mb-5'>
                     Frequently Asked <span className=' text-transparent bg-clip-text bg-[url(/images/bg-hero.webp)] bg-top-right bg-cover'>Questions</span>
               </AnimatedText>

               <AnimatedText triggerWrapper='#faq' type='p' splitBy='lines' className='text-[var(--color-foreground)] text-center'>
                  Do you need some help with something <br /> or do you have questions on some service?
               </AnimatedText>
            </header>

            <main className='bg-[var(--color-background)] w-full min-h-screen flex justify-center items-start p-[min(7vw,60px)] pt-20 mask-t-from-80%'>
               <div className='w-full max-w-[900px] p-[min(7vw,60px)] bg-[var(--color-muted)] rounded-4xl'>
                  <Accordion type='single' collapsible className='w-full'>
                     {faqData.map((faq, index) => (
                        <AccordionItem value={`item-${index}`} key={index} className='w-full'>
                           <AccordionTrigger className='flex-text-1'>{faq.question}</AccordionTrigger>
                           <AccordionContent>{faq.answer}</AccordionContent>
                        </AccordionItem>
                     ))}
                  </Accordion>
               </div>
            </main>

            <Footer sectionIDs={['faq']}/>
         </div>
      </section>
   )
}
