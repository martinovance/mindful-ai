import { useAuth } from "@/hooks/useAuth";
import { LoaderCircle } from "lucide-react";
import { JSX } from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const { user } = useAuth();

  if (user === undefined) {
    return (
      <div className="flex justify-center items-center h-[100vh] w-full">
        <LoaderCircle className="w-20 h-20" />
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
