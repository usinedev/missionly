import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import Button from "../ui/Button";
import HomeLogoLink from "./HomeLogoLink";

function PublicNavbar({ onOpenAuthModal, isAuthenticated, user, onLogout }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const linkClass = ({ isActive }) => (isActive ? "active-link" : undefined);

  const closeMenu = () => setIsMenuOpen(false);

  useEffect(() => {
    if (!isMenuOpen) return;

    const onKeyDown = (e) => e.key === "Escape" && closeMenu();
    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  return (
    <header className={`section ${isMenuOpen ? "is-open" : ""}`}>
      <div className="container">
        <HomeLogoLink
            className="navbar-logoBtn"
            onBeforeNavigate={closeMenu}
        />

        <button
          className="burger"
          type="button"
          aria-label="Ouvrir le menu"
          aria-expanded={isMenuOpen}
          onClick={() => setIsMenuOpen(true)}
        >
          <div className="burger-line"></div>
          <div className="burger-line"></div>
          <div className="burger-line"></div>
        </button>

        <nav className="desktopNav">
            <NavLink to="/" end className={linkClass}>
                Accueil
            </NavLink>
            <NavLink to="/missions" className={linkClass}>
                Missions
            </NavLink>
            { isAuthenticated && (
            <NavLink to="/dashboard" className={linkClass}>
                Dashboard
            </NavLink>
            )}
            {!isAuthenticated ? (
            <Button size="small" onClick={onOpenAuthModal}>
                S'identifier
            </Button>
            ) : (
            <Button size="small" variant="primary" onClick={onLogout}>
                Se déconnecter
            </Button>
            )}
        </nav>
      </div>

      {/* Overlay (toujours là, mais “inactif” quand fermé) */}
      <div
        className="mobileOverlay"
        onClick={closeMenu}
        aria-hidden={!isMenuOpen}
      />

      {/* Sidebar (toujours là) */}
      <aside className="mobileSidebar" aria-label="Menu mobile">
        <div className="mobileSidebar__top">
          <span className="mobileSidebar__title">Menu</span>
          <button
            className="mobileSidebar__close"
            type="button"
            aria-label="Fermer le menu"
            onClick={closeMenu}
          >
            ✕
          </button>
        </div>

        <nav className="mobileNav">
          <NavLink to="/" end className={linkClass} onClick={closeMenu}>
            Accueil
          </NavLink>
          <NavLink to="/missions" className={linkClass} onClick={closeMenu}>
            Missions
          </NavLink>
          { isAuthenticated && (
          <NavLink to="/dashboard" className={linkClass} onClick={closeMenu}>
            Dashboard
          </NavLink>
          )}

          <div className="mobileNav__cta">
            {!isAuthenticated ? (
            <Button size="small" onClick={() => {closeMenu(); onOpenAuthModal();}}>
                S'identifier
            </Button>
            ) : (
            <Button size="small" variant="secondary" onClick={() => {closeMenu(); onOpenAuthModal();}}>
                Se déconnecter
            </Button>
            )}
          </div>
        </nav>
      </aside>
    </header>
  );
}

export default PublicNavbar;
