export interface User {
  name: string
  email: string
  role: "USER" | "ADMIN"
  verified: boolean
}