import { lazy, Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Appbar from "./components/Appbar";
const LandingPage = lazy(() => import("./pages/LandingPage"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
const Sessions = lazy(() => import("./pages/Sessions"));
const Resources = lazy(() => import("./pages/Resources"));
import { LoaderCircle } from "lucide-react";
import ProtectedRoute from "./utils/ProtectedRoute";
import PublicRoute from "./utils/PublicRoute";
import { Toaster } from "sonner";
import Footer from "./components/Footer";

function App() {
  return (
    <Suspense
      fallback={
        <div className="flex justify-center items-center h-[100vh] w-full">
          <LoaderCircle className="w-10 h-10 animate-spin" />
        </div>
      }
    >
      <BrowserRouter>
        <div className="flex flex-col gap-2 bg-[#F9F9F9]">
          <Appbar />
          <Routes>
            <Route
              index
              element={
                <PublicRoute>
                  <LandingPage />
                </PublicRoute>
              }
            />
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/sessions"
              element={
                <ProtectedRoute>
                  <Sessions />
                </ProtectedRoute>
              }
            />
            <Route
              path="/resources"
              element={
                <ProtectedRoute>
                  <Resources />
                </ProtectedRoute>
              }
            />
          </Routes>
          <Footer />
          <Toaster />
        </div>
      </BrowserRouter>
    </Suspense>
  );
}

export default App;
