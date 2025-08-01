import Navbar from "./components/Navbar";
import Main from "./Main";
import { gsap } from "gsap";
import { SplitText } from "gsap/SplitText";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(SplitText, ScrollTrigger);

export default function LandingPageLayout({children}: {children: React.ReactNode}) {
   return (
      <>
         <Navbar />
         <Main> { children } </Main>
      </>
   );
}
