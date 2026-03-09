import { Routes, Route } from "react-router-dom";

import PublicLayout from "../layouts/PublicLayout";
import DashboardLayout from "../layouts/DashboardLayout";

import Home from "../pages/public/Home";
import Missions from "../pages/public/Missions";
import MissionDetail from "../pages/public/MissionDetail";
import DashboardHome from "../pages/dashboard/DashboardHome";
import DashboardMissions from "@/pages/dashboard/DashboardMissions";
import DashboardCandidacy from "@/pages/dashboard/DashboardCandidacy";
import DashboardMyAccount from "@/pages/dashboard/DashboardMyAccount";
import DashboardMessages from "@/pages/dashboard/DashboardMessages";

function AppRouter() {
  return (
    <Routes>
      <Route element={<PublicLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/missions" element={<Missions />} />
        <Route path="/missions/:id" element={<MissionDetail />} />
      </Route>
      <Route element={<DashboardLayout />}>
        <Route path="/dashboard/home" element={<DashboardHome />} />
        <Route path="/dashboard/missions" element={<DashboardMissions />} />
        <Route path="/dashboard/candidacy" element={<DashboardCandidacy />} />
        <Route path="/dashboard/my-account" element={<DashboardMyAccount />} />
        <Route path="/dashboard/messages" element={<DashboardMessages />} />
      </Route>
    </Routes>
  );
}

export default AppRouter;
