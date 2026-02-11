import { NavLink, useNavigate } from "react-router-dom";
import HomeLogoLink from "./HomeLogoLink";
import TwitterLogo from "../../assets/icons/TwitterLogo.svg?react";
import InstagramLogo from "../../assets/icons/InstagramLogo.svg?react";
import LinkedinLogo from "../../assets/icons/LinkedinLogo.svg?react";

function Footer() {
  return (
    <footer className="section">
        <div className="container footer-container">

            <div className="foot">
                <div className="logoLinks">
                    <HomeLogoLink
                        className="navbar-logoBtn"
                    />
                    <div className="socials">
                        <a href="https://x.com" target="_blank"><TwitterLogo/></a>
                        <a href="https://instagram.com" target="_blank"><InstagramLogo/></a>
                        <a href="https://linkedin.com" target="_blank"><LinkedinLogo/></a>
                    </div>
                </div>

                <div className="navLinks">
                    <div className="column">
                        <span className="navTitle">Freelance</span>
                        <span className="link">Trouver une mission</span>
                        <span className="link">Rejoindre Missionly</span>
                    </div>
                    <div className="column">
                        <span className="navTitle">Société</span>
                        <span className="link">Publier une mission</span>
                        <span className="link">Tarifs</span>
                    </div>
                    <div className="column">
                        <span className="navTitle">Plus</span>
                        <span className="link">Sécurité et confidentialité</span>
                        <span className="link">Aide</span>
                        <span className="link">Contactez-nous</span>
                    </div>
                </div>

            </div>

            <div className="bottomInfos">
                <span className="info">© 2026 Missionly</span>
                <span className="separator"> - </span>
                <span className="info">Tous droits réservés</span>
                <span className="separator"> - </span>
                <span className="info">Projet académique (Formation Full-Stack)</span>
                <span className="separator"> - </span>
                <span className="info">Corentin Dantinne · Claude Peltier · Sacha Vandenabeele</span>
            </div>

        </div>
    </footer>
  )
}

export default Footer