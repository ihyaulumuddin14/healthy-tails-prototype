import Navbar from "../../shared/components/Navbar"
import Main from "../../shared/components/Main"
import Hero from "./pages/Hero"
import History from "./pages/History"
import Service from "./pages/Service"
import Veterinarian from "./pages/Veterinarian"
import Hours from "./pages/Hours"
import Shop from "./pages/Shop"
import Feedback from "./pages/Feedback"
import Footer from "../../shared/components/Footer"
import useStore from "../../shared/hooks/useStore"
import { useLayoutEffect } from "react"
// import useAuth from "../../shared/hooks/useAuth"
import { Toaster } from "react-hot-toast"


const Index = () => {
   const setIsMobile = useStore(state => state.setIsMobile )
   // const { isLoading } = useAuth();

   useLayoutEffect(() => {
      const checkMobile = () => {
         setIsMobile(window.innerWidth <= 768);
      };

      checkMobile();
      window.addEventListener('resize', checkMobile);
      
      return () => window.removeEventListener('resize', checkMobile);
   }, [setIsMobile]);

   return (
      <div className="w-full h-screen flex flex-col justify-center items-center relative gradient-background">
         <Toaster position="top-center" reverseOrder={false}></Toaster>

         {/* {isLoading ? (
            <>
               <video src="/animation/Loader cat.webm" autoPlay loop muted className=""></video>
               <p className="text-[clamp(0.8rem,1.5vw,1rem)] text-[var(--text-color)] font-inter font-semibold">Wait a minute.. miaw</p>
            </>
         ) : ( */}
            <>
               {/* Navbar di luar smooth wrapper */}
               <Navbar isHome={true} />

               {/* ScrollSmoother wrapper */}
               <Main>
                  <Hero />
                  <History />
                  <Service />
                  <Veterinarian />
                  <Hours />
                  <Feedback />
                  <Shop />
                  <Footer sectionIDs={['home', 'history', 'service', 'veterinarian', 'hours', 'feedback', 'shop']}/>
               </Main>
               
            </>
         {/* )} */}
      </div>
   )
}

export default Index