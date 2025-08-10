import { Pet } from "@/type/type";
import { use } from "react";
import PetCard from "./PetCard";

export default function Pets({
   pets
}: { pets: Promise<Pet[]> }) {
   const allPets = use(pets)

   return (
      <>
         {allPets.map((pet, index) => (
            <PetCard key={index} pet={pet}/>
         ))}
      </>
   )
}
