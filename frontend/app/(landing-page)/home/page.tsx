import HeroSection from "./hero/HeroSection";
import VetSection from "./vet/VetSection";
import ShopSection from "./shop/ShopSection";
import HoursSection from "./hours/HoursSection";
import ServiceSection from "./service/ServiceSection";
import HistorySection from "./history/HistorySection";
import FeedbackSection from "./feedback/FeedbackSection";
import Footer from "@/components/ui/Footer";

export default function Home() {

   return (
      <>
         <HeroSection />
         <HistorySection />
         <ServiceSection />
         <VetSection />
         <HoursSection />
         <FeedbackSection />
         <ShopSection />
         <Footer sectionIDs={['home', 'history', 'service', 'team', 'hours', 'feedback', 'shop']} />
      </>
   );
}