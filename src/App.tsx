import { lazy, Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Appbar from "./components/Appbar";
const LandingPage = lazy(() => import("./pages/LandingPage"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
const Sessions = lazy(() => import("./pages/Sessions"));
const Resources = lazy(() => import("./pages/Resources"));
import ProtectedRoute from "./utils/ProtectedRoute";
import PublicRoute from "./utils/PublicRoute";
import { Toaster } from "sonner";
import Footer from "./components/Footer";
import UserProfile from "./pages/UserProfile";
import { NotificationProvider } from "./context/NotificationsProvider";
import { useAuth } from "./hooks/useAuth";
import CallInfo from "./pages/CallInfo";
import { PageLoader } from "./shared/Loader";
import ScrollToTop from "./utils/scrollToTop";

function App() {
  const { user, authLoading } = useAuth();

  if (authLoading) {
    return <PageLoader />;
  }

  return (
    <Suspense fallback={<PageLoader />}>
      <BrowserRouter>
        <ScrollToTop />
        <NotificationProvider userId={user?.uid ?? ""}>
          <div className="flex flex-col bg-[#F9F9F9] min-h-screen">
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
              <Route>
                <Route
                  index
                  path="/sessions"
                  element={
                    <ProtectedRoute>
                      <Sessions />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/sessions/:type/:id"
                  element={
                    <ProtectedRoute>
                      <CallInfo />
                    </ProtectedRoute>
                  }
                />
              </Route>
              <Route
                path="/resources"
                element={
                  <ProtectedRoute>
                    <Resources />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/profile"
                element={
                  <ProtectedRoute>
                    <UserProfile />
                  </ProtectedRoute>
                }
              />
            </Routes>
            <Footer />
            <Toaster />
          </div>
        </NotificationProvider>
      </BrowserRouter>
    </Suspense>
  );
}

export default App;
