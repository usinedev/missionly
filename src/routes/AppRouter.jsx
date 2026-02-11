import { Routes, Route } from "react-router-dom";

import PublicLayout from "../layouts/PublicLayout";

import Home from "../pages/public/Home";
import Missions from "../pages/public/Missions";
import MissionDetail from "../pages/public/MissionDetail";

function AppRouter() {
  return (
    <Routes>
      <Route element={<PublicLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/missions" element={<Missions />} />
        <Route path="/missions/:id" element={<MissionDetail />} />
      </Route>
    </Routes>
  );
}

export default AppRouter;
