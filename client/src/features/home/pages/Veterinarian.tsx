import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import { teamMembers } from "../../../shared/constants/constant"
import { SplitText } from "gsap/SplitText"
import CardProfile from "../components/CardProfile"

const Veterinarian = () => {
   useGSAP(() => {
      document.fonts.ready.then(() => {
         const memberTitle = new SplitText('.member-title', { type: 'words' });

         gsap.from(memberTitle.words, {
            y: 100,
            opacity: 0,
            duration: 1,
            stagger: 0.1,
            ease: 'expo.inOut',
            scrollTrigger: {
               trigger: '.team-wrapper',
               start: 'top center',
               once: true
            }
         });

         const timeline = gsap.timeline({
            scrollTrigger: {
               trigger: '.team-wrapper',
               start: 'top top',
               end: 'bottom -20%',
               scrub: true
            }
         });

         timeline.to('.sleep', {
            yPercent: 100,
            scale: 0.5,
            duration: 1,
            ease: 'none'
         });
      });
   }, []);

   return (
      <section id="team" className="team-wrapper w-full h-fit flex justify-center items-center overflow-hidden relative">
         <img src="images/sleep.webp" alt="sleep cat image" className="sleep absolute top-0 w-full h-full opacity-20 object-cover object-center-bottom"/>

         <div className="w-full max-w-[1536px] h-full flex flex-col items-center relative p-10 gap-[5vw]">
            <h1 className="member-title self-start relative text-[clamp(2.5rem,5vw,4rem)] font-bold font-inter text-[var(--text-color)]">Meet the Team Members <br /> of Healthy Tails</h1>
            <div className="w-full max-w-2xl flex flex-wrap justify-center items-center gap-x-5 gap-y-10">
               {teamMembers.map((member, index) => (
                  <CardProfile key={index} srcImg={member.image} name={member.name} no={member.noSIP} footer={member.role} redirectLabel="View Profile" index={index}/>
               ))}
            </div>
         </div>
      </section>
   )
}

export default Veterinarian