import { LenisDialog } from "@/components/ui/dialog";
import Navbar from "../../components/ui/Navbar";
import Main from "../../components/ui/Main";
import Footer from "@/components/ui/Footer";

export default function LandingPageLayout({children}: {children: React.ReactNode}) {
   return (
      <LenisDialog>
         <Navbar />
         <Main> { children } </Main>
         <Footer />
      </LenisDialog>
   );
}
