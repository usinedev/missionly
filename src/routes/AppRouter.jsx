import { Routes, Route } from "react-router-dom";

import PublicLayout from "../layouts/PublicLayout";
import DashboardLayout from "../layouts/DashboardLayout";

import Home from "../pages/public/Home";
import Missions from "../pages/public/Missions";
import MissionDetail from "../pages/public/MissionDetail";
import DashboardHome from "../pages/dashboard/DashboardHome";

function AppRouter() {
  return (
    <Routes>
      <Route element={<PublicLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/missions" element={<Missions />} />
        <Route path="/missions/:id" element={<MissionDetail />} />
      </Route>
      <Route element={<DashboardLayout />}>
        <Route path="/dashboard/" element={<DashboardHome />} />
      </Route>
    </Routes>
  );
}

export default AppRouter;