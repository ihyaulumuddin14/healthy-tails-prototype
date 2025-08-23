export interface User {
   _id: string;
   name: string;
   email: string;
   role: "ADMIN" | "USER";
   verified: boolean;
   photoUrl: string;
}

export interface News {
   _id: string;
   title: string;
   imageUrl: string;
   badge: string;
   sourceUrl: string;
   createdAt: string;
   updatedAt: string;
}

export interface Pet {
   _id: string;
   name: string;
   type: "Dog" | "Cat";
   race: string;
   color: string;
   age: number;
   gender: "Male" | "Female";
   birthDate?: string | undefined;
}

export interface Service {
   _id: string;
   name: string;
   estimatedDurationMinutes: number;
   isActive: boolean;
}

export interface History {
   _id: string;
   visitDate: string;
   bodyWeight: number;
   temperature: number;
   symptoms: string;
   pet: {
      _id: string;
      type: "Dog" | "Cat";
      name: string;
      createdAt: string;
      updatedAt: string;
      race: string;
      color: string;
      age: number;
      gender: "Male" | "Female";
      birthDate?: string | undefined;
   };
   owner: {
      _id: string;
      name: string;
      email: string;
      role: "USER" | "ADMIN";
      verified: boolean;
      photoUrl: string;
      createdAt: string;
      updatedAt: string;
   };
   createdAt: string;
   updatedAt: string;
   nextVisitDate?: string | undefined;
   diagnosis?: string | undefined;
   treatments?: string | undefined;
   vaccinesGiven?: string[] | undefined;
   injectionSite?: string | undefined;
   notes?: string | undefined;
}

export interface Booking {
   _id: string;
   bookingDate: string;
   queueNumber: number;
   status: "WAITING" | "IN_PROGRESS" | "COMPLETED" | "CANCELLED";
   pet: {
      type: "Dog" | "Cat";
      _id: string;
      name: string;
      race: string;
      color: string;
      age: number;
      gender: "Male" | "Female";
      createdAt: string;
      updatedAt: string;
      birthDate?: string | undefined;
   };
   service: {
      _id: string;
      name: string;
      estimatedDurationMinutes: number;
      isActive: boolean;
   };
   owner: {
      _id: string;
      name: string;
      email: string;
      role: "USER" | "ADMIN";
      verified: boolean;
      photoUrl: string;
      createdAt: string;
      updatedAt: string;
   };
   createdAt: string;
   updatedAt: string;
   notes?: string | undefined;
}

