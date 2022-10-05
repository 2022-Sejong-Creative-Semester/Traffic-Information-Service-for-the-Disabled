import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainPage from "./page/MainPage"
import BusPage from "./page/BusPage"
import SubwayPage from "./page/SubwayPage"


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/bus" element={<BusPage />} />
        <Route path="/subway" element={<SubwayPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
