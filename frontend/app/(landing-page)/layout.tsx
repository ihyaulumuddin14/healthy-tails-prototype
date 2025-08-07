import { Dialog } from "@/components/ui/dialog";
import Navbar from "../../components/ui/Navbar";
import Main from "../../components/ui/Main";
// import { gsap } from "gsap";
// import { SplitText } from "gsap/SplitText";
// import { ScrollTrigger } from "gsap/ScrollTrigger";

// gsap.registerPlugin(SplitText, ScrollTrigger);

export default function LandingPageLayout({children}: {children: React.ReactNode}) {
   return (
      <Dialog>
         <Navbar />
         <Main> { children } </Main>
      </Dialog>
   );
}
