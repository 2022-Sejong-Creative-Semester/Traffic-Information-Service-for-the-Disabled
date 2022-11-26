import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainPage from "./page/MainPage.js"
import BusPage from "./page/BusPage.js"
import SubwayPage from "./page/subwaypage/SubwayPage.js"
import SubwayTransferPage from "./page/subwaypage/SubwayTransfer.js";
import SubwayDetailPage from "./page/subwaypage/SubwayDetailPage.js"
import SubwayElevatorPage from "./page/subwaypage/SubwayElevator.js";
import SubwayBathChairPage from "./page/subwaypage/SubwayBathchair.js";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/bus" element={<BusPage />} />
        <Route path="/subway" element={<SubwayPage />} />
        <Route path="/subway/detail" element={<SubwayDetailPage />} />
        <Route path="/subway/elevator" element={<SubwayElevatorPage />} />
        <Route path="/subway/transfer" element={<SubwayTransferPage />} />
        <Route path="/subway/bathchair" element={<SubwayBathChairPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
