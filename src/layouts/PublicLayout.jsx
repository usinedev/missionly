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
      <PublicNavbar onOpenAuthModal={openAuth} />

      <main>
        <Outlet />
      </main>

      <Footer />

      <AuthModal
        isOpen={isAuthOpen}
        onClose={closeAuth}
        onLoginSuccess={closeAuth}
        // onRegisterSuccess={() => {
        //   // tu veux "inscription -> connexion"
        //   // la modale reste ouverte, AuthModal gère juste le switch
        // }}
      />
    </>
  );
}

export default PublicLayout;