import { Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

type ProtectedRouteProps = {
   children: React.ReactNode
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
   const { user, loading } = useAuth();

   if (loading) return (
      <div className="w-full h-screen flex justify-center items-center bg-[var(--primary-color)]">
         <video src="/animation/Loader cat.webm" autoPlay loop muted className="w-full h-full"></video>
      </div>
   )
   if (!user) return <Navigate to="/login" replace />;

   return children;
}

export default ProtectedRoute;