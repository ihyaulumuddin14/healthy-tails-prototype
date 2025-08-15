'use client'

import Main from "@/components/ui/Main";
import Navbar from "@/components/ui/Navbar";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import AuthGuard from "../AuthGuard";
import loading from "../loading";
import UnauthorizedPage from "../unauthorized";

export default function UserLayout({ children }: { children: React.ReactNode }) {

   return (
      // <AuthGuard
      //    skeleton={loading()}
      //    fallback={<UnauthorizedPage />}
      //    role="USER"
      //    >
      <>
         <Navbar />
         <Main>
            <Breadcrumbs />
            {children}
         </Main>
      </>
      // {/* </AuthGuard> */}
   )
}
