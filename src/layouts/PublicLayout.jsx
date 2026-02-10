import { Outlet } from "react-router-dom";

import PublicNavbar from "../components/navigation/PublicNavbar";
import Footer from "../components/navigation/Footer";

function PublicLayout() {
  return (
    <>
      <PublicNavbar />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
}

export default PublicLayout;