import Navbar from "../../shared/components/Navbar"
import Main from "../../shared/components/Main"
import Hero from "./pages/Hero"



const Index = () => {

   return (
      <div className="w-full h-fit flex flex-col items-center relative">
         {/* Navbar di luar smooth wrapper */}
         <Navbar isHome={true} />

         {/* ScrollSmoother wrapper */}
         <Main>
            <Hero />
         </Main>
      </div>
   )
}

export default Index