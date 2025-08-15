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

export interface Booking {
   _id: string;
   bookingDate: Date;
   queueNumber: number;
   status: "WAITING" | "IN_PROGRESS" | "COMPLETED" | "CANCELLED";
   pet: {
      _id: string;
      name: string;
      type: "Dog" | "Cat";
      race: string;
      color: string;
      age: number;
      gender: "Male" | "Female";
      birthDate?: string | undefined;
   };
   service: {
      _id: string;
      name: string;
      estimatedDurationMinutes: number;
      isActive: boolean;
   };
   createdAt: string;
   updatedAt: string;
   notes?: string | undefined;
}

export interface Service {
   _id: string;
   name: string;
   estimatedDurationMinutes: number;
   isActive: boolean;
}