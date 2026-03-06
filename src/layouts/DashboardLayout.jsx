import { Outlet } from "react-router-dom";
import DashboardSidebar from "@/components/navigation/DashboardSidebar";

function DashboardLayout() {
  return (
    <>
        <DashboardSidebar/>
        <Outlet />
    </>
  );
}

export default DashboardLayout;
