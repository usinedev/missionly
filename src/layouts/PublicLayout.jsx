import { Outlet } from "react-router-dom";
import { useState, useEffect } from "react";
import PublicNavbar from "../components/navigation/PublicNavbar";
import Footer from "../components/navigation/Footer";
import AuthModal from "../components/auth/AuthModal";

//TEMPORAIRE - Mock de données de connexion en attendant le back  
import { getAuth, setAuth, clearAuth } from "@/services/auth.mock.js";
//Fin du bloc temporaire



function PublicLayout() {

    //TEMPORAIRE - Suite
    const [user, setUser] = useState(() => getAuth());
    const isAuthenticated = !!user;

    function login(userData) {
    setAuth(userData);
    setUser(userData);
    setIsAuthOpen(false);
    }

    function logout() {
    clearAuth();
    setUser(null);
    }
    //Fin du deuxième bloc temporaire

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
    <PublicNavbar
    onOpenAuthModal={openAuth}
    isAuthenticated={isAuthenticated}
    user={user}
    onLogout={logout}
    />
    <main>
      <Outlet context={{ openAuth, isAuthenticated }} />
    </main>
    <Footer />
  </div>

  {isAuthOpen && <div className="modalOverlay" onClick={closeAuth} />}

  <AuthModal
  isOpen={isAuthOpen}
  onClose={closeAuth}
  onLoginSuccess={login}
  onRegisterSuccess={(userData) => {
  }}
/>

</>

);
}

export default PublicLayout;
