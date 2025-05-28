import { BrowserRouter, Route, Routes } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import Appbar from "./components/Appbar";

function App() {
  return (
    <>
      <BrowserRouter>
        <div className="flex flex-col gap-2">
          <Appbar />
          <Routes>
            <Route index element={<LandingPage />} />
          </Routes>
        </div>
      </BrowserRouter>
    </>
  );
}

export default App;
