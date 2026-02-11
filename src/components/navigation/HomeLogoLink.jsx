import Logo from "../../assets/icons/Logo.svg?react";
import { useLocation, useNavigate } from "react-router-dom";

function HomeLogoLink({ className = "", onBeforeNavigate }) {
  const navigate = useNavigate();
  const location = useLocation();

  function goHome() {
    onBeforeNavigate?.();

    if (location.pathname === "/") {
      window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
      return;
    }

    navigate("/");
  }

  return (
    <button
      type="button"
      className={className}
      aria-label="Aller à l'accueil"
      onClick={goHome}
    >
      <Logo aria-hidden="true" />
    </button>
  );
}

export default HomeLogoLink;