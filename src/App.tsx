import { lazy, Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Appbar from "./components/Appbar";
const LandingPage = lazy(() => import("./pages/LandingPage"));
const Login = lazy(() => import("./pages/auth/Login"));
const CreateAccount = lazy(() => import("./pages/auth/CreateAccount"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
const Sessions = lazy(() => import("./pages/Sessions"));
const Resources = lazy(() => import("./pages/Resources"));
import { LoaderCircle } from "lucide-react";

function App() {
  return (
    <Suspense
      fallback={
        <div className="flex justify-center items-center h-[100vh] w-full">
          <LoaderCircle className="w-20 h-20" />
        </div>
      }
    >
      <BrowserRouter>
        <div className="flex flex-col gap-2">
          <Appbar />
          <Routes>
            <Route index element={<LandingPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="create-account" element={<CreateAccount />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/sessions" element={<Sessions />} />
            <Route path="/resources" element={<Resources />} />
          </Routes>
        </div>
      </BrowserRouter>
    </Suspense>
  );
}

export default App;
