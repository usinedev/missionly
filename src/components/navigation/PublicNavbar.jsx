import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import Button from "../ui/Button";
import HomeLogoLink from "./HomeLogoLink";
import { motion } from "motion/react";

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

const EASE = [0.22, 1, 0.36, 1];

const navInFromTop = {
  hidden: { opacity: 0, y: -56 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.48, ease: EASE }, // 0.28 -> 0.48
  },
};

const stagger = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.07,  // 0.04 -> 0.07
      delayChildren: 0.10,    // 0.02 -> 0.10
    },
  },
};

const item = {
  hidden: { opacity: 0, y: -10 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.32, ease: EASE }, // 0.18 -> 0.32
  },
};

const overlay = {
  closed: { opacity: 0, pointerEvents: "none" },
  open: {
    opacity: 1,
    pointerEvents: "auto",
    transition: { duration: 0.22, ease: EASE }, // 0.12 -> 0.22
  },
};

const mobilePanel = {
  closed: { opacity: 0, y: -20, pointerEvents: "none" },
  open: {
    opacity: 1,
    y: 0,
    pointerEvents: "auto",
    transition: { duration: 0.34, ease: EASE }, // 0.16 -> 0.34
  },
};

const mobileNavStagger = {
  closed: {},
  open: { transition: { staggerChildren: 0.06, delayChildren: 0.10 } }, // 0.035/0.03 -> 0.06/0.10
};

const mobileNavItem = {
  closed: { opacity: 0, y: -8 },
  open: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.26, ease: EASE }, // 0.14 -> 0.26
  },
};

  return (
    <motion.header
      className={`section ${isMenuOpen ? "is-open" : ""}`}
      variants={navInFromTop}
      initial="hidden"
      animate="show"
      style={{ willChange: "transform, opacity" }}
    >
      <div className="container">
        <motion.div variants={item}>
          <HomeLogoLink className="navbar-logoBtn" onBeforeNavigate={closeMenu} />
        </motion.div>

        <motion.button
          className="burger"
          type="button"
          aria-label="Ouvrir le menu"
          aria-expanded={isMenuOpen}
          onClick={() => setIsMenuOpen(true)}
          variants={item}
          whileHover={{ y: -1, transition: { duration: 0.12, ease: EASE } }}
          whileTap={{ scale: 0.97 }}
          style={{ willChange: "transform, opacity" }}
        >
          <div className="burger-line"></div>
          <div className="burger-line"></div>
          <div className="burger-line"></div>
        </motion.button>

        <motion.nav className="desktopNav" variants={stagger}>
          <motion.div variants={item}>
            <NavLink to="/" end className={linkClass}>
              Accueil
            </NavLink>
          </motion.div>

          <motion.div variants={item}>
            <NavLink to="/missions" className={linkClass}>
              Missions
            </NavLink>
          </motion.div>

          {isAuthenticated && (
            <motion.div variants={item}>
              <NavLink to="/dashboard" className={linkClass}>
                Dashboard
              </NavLink>
            </motion.div>
          )}

          <motion.div variants={item}>
            {!isAuthenticated ? (
              <Button size="small" onClick={onOpenAuthModal}>
                S'identifier
              </Button>
            ) : (
              <Button size="small" variant="primary" onClick={onLogout}>
                Se déconnecter
              </Button>
            )}
          </motion.div>
        </motion.nav>
      </div>

      <motion.div
        className="mobileOverlay"
        onClick={closeMenu}
        aria-hidden={!isMenuOpen}
        variants={overlay}
        initial={false}
        animate={isMenuOpen ? "open" : "closed"}
        style={{ willChange: "opacity" }}
      />

      <motion.aside
        className="mobileSidebar"
        aria-label="Menu mobile"
        variants={mobilePanel}
        initial={false}
        animate={isMenuOpen ? "open" : "closed"}
        style={{ willChange: "transform, opacity" }}
      >
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

        <motion.nav
          className="mobileNav"
          variants={mobileNavStagger}
          initial={false}
          animate={isMenuOpen ? "open" : "closed"}
        >
          <motion.div variants={mobileNavItem}>
            <NavLink to="/" end className={linkClass} onClick={closeMenu}>
              Accueil
            </NavLink>
          </motion.div>

          <motion.div variants={mobileNavItem}>
            <NavLink to="/missions" className={linkClass} onClick={closeMenu}>
              Missions
            </NavLink>
          </motion.div>

          {isAuthenticated && (
            <motion.div variants={mobileNavItem}>
              <NavLink to="/dashboard" className={linkClass} onClick={closeMenu}>
                Dashboard
              </NavLink>
            </motion.div>
          )}

          <motion.div className="mobileNav__cta" variants={mobileNavItem}>
            {!isAuthenticated ? (
              <Button
                size="small"
                onClick={() => {
                  closeMenu();
                  onOpenAuthModal();
                }}
              >
                S'identifier
              </Button>
            ) : (
              <Button
                size="small"
                variant="primary"
                onClick={() => {
                  closeMenu();
                  onLogout();
                }}
              >
                Se déconnecter
              </Button>
            )}
          </motion.div>
        </motion.nav>
      </motion.aside>
    </motion.header>
  );
}

export default PublicNavbar;