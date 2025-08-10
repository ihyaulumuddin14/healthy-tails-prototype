export interface User {
  name: string
  email: string
  role: "USER" | "ADMIN"
  verified: boolean
}

export interface Pet {
   _id: string
   name: string
   type: string
   race: string
   color: string
   birthDate: Date
   age: number
   gender: string
   owner: string  
}