import Navbar from "../../shared/components/Navbar"
import Main from "../../shared/components/Main"
import useStore from "../../shared/hooks/useStore"
import { useLayoutEffect } from "react"
import { Toaster } from "react-hot-toast"
import { serviceLists } from "../../shared/constants/constant"
import Footer from "../../shared/components/Footer"
import Hero from "./pages/Hero"
import Articles from "./pages/Articles"
import useAuth from "../../shared/hooks/useAuth"


const Index = () => {
   const setIsMobile = useStore(state => state.setIsMobile )
   const sectionIDs = serviceLists.map(section => section.articles.id);
   const { isLoading } = useAuth();

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

         {isLoading ? (
            <>
               <video src="/animation/Loader cat.webm" autoPlay loop muted className=""></video>
               <p className="text-[clamp(0.8rem,1.5vw,1rem)] text-[var(--text-color)] font-inter font-semibold">Wait a minute.. miaw</p>
            </>
         ) : (
            <>
               {/* Navbar di luar smooth wrapper */}
               <Navbar isHome={false} />

               {/* ScrollSmoother wrapper */}
               <Main>
                  <Hero />
                  <Articles />
                  <Footer sectionIDs={sectionIDs} />
               </Main>
               
            </>
      )}
      </div>
   )
}

export default Index