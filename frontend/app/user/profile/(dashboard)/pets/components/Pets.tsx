'use client'

import PetCard from "./PetCard";
import { useMemo } from "react";
import { Pet } from "@/type/type";
import PetsSkeleton from "./PetsSkeleton";
import usePets from "@/hooks/usePets";

export default function Pets({ selectedFilter }: { selectedFilter: string }) {
   const { pets, isLoading, error } = usePets();

   const filteredPets: Pet[] = useMemo(() => {
      const petsRaw = pets ?? [];
      if (!selectedFilter) return petsRaw;
      return petsRaw.filter((pet: Pet) => pet.type === selectedFilter);
   }, [selectedFilter, pets])


   if (isLoading) {
      return (
         <div className="w-full grid gap-4 [grid-template-columns:repeat(auto-fit,200px)] sm:[grid-template-columns:repeat(auto-fit,300px)]">
            {[...Array(5)].map((_, index) => (
               <PetsSkeleton key={index} />
            ))}
         </div>
      )
   }

   if (error) {
      return <div className="w-full text-center text-2xl font-bold text-gray-600">Failed to load</div>
   }

   return (
      <div className="w-full grid gap-4 [grid-template-columns:repeat(auto-fit,200px)] sm:[grid-template-columns:repeat(auto-fit,300px)]">
         {filteredPets.length === 0 && <div className="text-center text-2xl font-bold text-gray-600">No pets yet — add one!</div>}

         {filteredPets.map((pet, index) => (
            <PetCard key={index} pet={pet} />
         ))}
      </ div>
   )
}
