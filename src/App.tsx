import { BrowserRouter, Route, Routes } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import Appbar from "./components/Appbar";
import Login from "./pages/auth/Login";
import CreateAccount from "./pages/auth/CreateAccount";

function App() {
  return (
    <>
      <BrowserRouter>
        <div className="flex flex-col gap-2">
          <Appbar />
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="create-account" element={<CreateAccount />} />
            <Route index element={<LandingPage />} />
          </Routes>
        </div>
      </BrowserRouter>
    </>
  );
}

export default App;
