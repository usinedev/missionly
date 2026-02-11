import { Outlet } from "react-router-dom";
import { useState, useEffect } from "react";
import PublicNavbar from "../components/navigation/PublicNavbar";
import Footer from "../components/navigation/Footer";
import AuthModal from "../components/auth/AuthModal";


function PublicLayout() {
  const [isAuthOpen, setIsAuthOpen] = useState(false);

  useEffect(() => {
    if (isAuthOpen) {
      document.body.classList.add("no-scroll");
    } else {
      document.body.classList.remove("no-scroll");
    }

    return () => {
      document.body.classList.remove("no-scroll");
    };
  }, [isAuthOpen]);

  const openAuth = () => setIsAuthOpen(true);
  const closeAuth = () => setIsAuthOpen(false);

  return (
<>
  <div className={isAuthOpen ? "app-disabled" : ""}>
    <PublicNavbar onOpenAuthModal={openAuth} />
    <main>
      <Outlet />
    </main>
    <Footer />
  </div>

  {isAuthOpen && <div className="modalOverlay" onClick={closeAuth} />}

  <AuthModal
    isOpen={isAuthOpen}
    onClose={closeAuth}
    onLoginSuccess={closeAuth}
  />
</>

);
}

export default PublicLayout;