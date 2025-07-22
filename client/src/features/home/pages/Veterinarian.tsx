import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import { teamMembers } from "../../../shared/constants/constant"
import { SplitText } from "gsap/SplitText"
import CardProfile from "../components/CardProfile"
import { useRef, useState } from "react"

const Veterinarian = () => {
   const dialogRef = useRef<HTMLDialogElement>(null);
   const [vetOnModal, setVetOnModal] = useState({
      name: '',
      image: '',
      description: ''
   });

   const handleModal = (id: number | undefined) => {
      const member = teamMembers.find(member => member.id === id);
      
      if (member) {
         setVetOnModal({
            name: member.name,
            image: member.image,
            description: member.description
         });

         dialogRef.current?.showModal();
      }
   }

   useGSAP(() => {
      document.fonts.ready.then(() => {
         const memberTitle = new SplitText('.member-title', { type: 'lines' });

         gsap.from(memberTitle.lines, {
            y: 100,
            opacity: 0,
            duration: 1,
            stagger: 0.1,
            ease: 'expo.inOut',
            scrollTrigger: {
               trigger: '.team-wrapper',
               start: 'top 80%',
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
         {/* background */}
         <img src="images/sleep.webp" alt="sleep cat image" className="sleep absolute top-0 w-full h-full opacity-20 object-cover object-center-bottom"/>

         <div className="w-full max-w-[1536px] h-full flex flex-col items-center relative p-10 gap-[5vw]">
            <h1 className="member-title self-start relative text-[clamp(2.5rem,5vw,4rem)] font-bold font-inter text-[var(--text-color)]">
               Meet the Team Members <br /> of {" "}
               <span className="bg-[url('images/texture.jpg')] bg-clip-text text-transparent bg-cover text-shadow-2xs text-[clamp(2.5rem,5vw,4rem)] font-bold font-inter">Healthy Tails</span>
            </h1>

            <div className="w-full max-w-2xl flex flex-wrap justify-center items-center gap-x-5 gap-y-10">
               {teamMembers.map((member) => (
                  <CardProfile
                     key={member.id}
                     id={member.id}
                     onClick={handleModal}
                     srcImg={member.image}
                     name={member.name}
                     no={member.noSIP}
                     footer={member.role}
                     redirectLabel="View Profile"/>
               ))}
            </div>
         </div>

         <dialog ref={dialogRef} id="my_modal_5" className="modal modal-middle">
            <div className="modal-box">
               <h3 className="font-bold text-lg">{vetOnModal.name}</h3>
               <p className="py-4">{vetOnModal.description}</p>
               <div className="modal-action">
                  <form method="dialog">
                  <button className="btn">Close</button>
                  </form>
               </div>
            </div>
         </dialog>
      </section>
   )
}

export default Veterinarian