import { serviceLists } from "@/app/constant";
import Articles from "./articles/Articles";
import Footer from "@/components/ui/Footer";
import Hero from "./hero/Hero";

const Services = () => {
   const sectionIDs = serviceLists.map(section => section.articles.id);

   return (
         <>
            <Hero />
            <Articles />
            <Footer sectionIDs={sectionIDs} />
         </>
   )
}

export default Services