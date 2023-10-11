import React from "react"
import { HashRouter, Routes, Route } from "react-router-dom";
import MainPage from "./page/MainPage.tsx"
import BusPage from "./page/BusPage.tsx"
import SubwayPage from "./page/subwaypage/SubwayPage.tsx"
import SubwayTransferPage from "./page/subwaypage/SubwayTransfer.tsx";
import SubwayDetailPage from "./page/subwaypage/SubwayDetailPage.tsx"
import SubwayElevatorPage from "./page/subwaypage/SubwayElevator.tsx";
import SubwayBathChairPage from "./page/subwaypage/SubwayBathchair.tsx";

//page마다 url을 따로 지정, 페이지에서 api를 호출할 때 필요한 파라미터를 제공
function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/bus" element={<BusPage />} />
        <Route path="/subway" element={<SubwayPage />} />
        <Route path="/subway/detail/:stCd/:stNm" element={<SubwayDetailPage />} />
        <Route path="/subway/elevator/:stCd/:stNm/:railCd/:lnCd" element={<SubwayElevatorPage />} />
        <Route path="/subway/transfer/:stCd/:stNm/:railCd/:lnCd" element={<SubwayTransferPage />} />
        <Route path="/subway/bathchair/:stCd/:stNm/:railCd/:lnCd" element={<SubwayBathChairPage />} />
      </Routes>
    </HashRouter>
  );
}

export default App;
