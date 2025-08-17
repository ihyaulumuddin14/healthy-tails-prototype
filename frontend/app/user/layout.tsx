
export const metadata: Metadata = {
   title: 'Profile'
}

import Main from "@/components/ui/Main";
import Navbar from "@/components/ui/Navbar";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import AuthGuard from "../AuthGuard";
import LoadingScreen from "../LoadingScreen";
import UnauthorizedPage from "../unauthorized";
import { Metadata } from "next";

export default function UserLayout({ children }: { children: React.ReactNode }) {

   return (
      <AuthGuard
         skeleton={<LoadingScreen />}
         fallback={<UnauthorizedPage />}
         role="USER"
      >
         <Navbar />
         <Main>
            <Breadcrumbs />
            {children}
         </Main>
      </AuthGuard>
   )
}
