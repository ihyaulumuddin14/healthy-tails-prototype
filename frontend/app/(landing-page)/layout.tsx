import Navbar from "./components/Navbar";
import ScrollProvider from "./ScrollProvider";
import { gsap } from "gsap";
import { SplitText } from "gsap/SplitText";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(SplitText, ScrollTrigger);

export default function LandingPageLayout({children}: {children: React.ReactNode}) {
   return (
      <>
         <Navbar />
         <ScrollProvider>
            { children }
         </ScrollProvider>
      </>
   );
}
