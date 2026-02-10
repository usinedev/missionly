import { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import Logo from "../../assets/icons/Logo.svg?react";
import Button from "../ui/Button";

function PublicNavbar() {
  const navigate = useNavigate();
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
        <Logo
          className="navbar-logo"
          aria-label="Missionly"
          role="button"
          tabIndex={0}
          onClick={() => navigate("/")}
          onKeyDown={(e) => e.key === "Enter" && navigate("/")}
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
          <NavLink to="/dashboard" className={linkClass}>
            Dashboard
          </NavLink>
          <Button size="small">S'identifier</Button>
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
          <NavLink to="/dashboard" className={linkClass} onClick={closeMenu}>
            Dashboard
          </NavLink>

          <div className="mobileNav__cta">
            <Button size="small" onClick={closeMenu}>
              S'identifier
            </Button>
          </div>
        </nav>
      </aside>
    </header>
  );
}

export default PublicNavbar;
