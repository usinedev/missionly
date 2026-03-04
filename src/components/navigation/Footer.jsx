import HomeLogoLink from "./HomeLogoLink";
import TwitterLogo from "../../assets/icons/TwitterLogo.svg?react";
import InstagramLogo from "../../assets/icons/InstagramLogo.svg?react";
import LinkedinLogo from "../../assets/icons/LinkedinLogo.svg?react";
import { motion } from "motion/react";

function Footer() {
  // Animations (ta config, inchangée)
  const EASE = [0.22, 1, 0.36, 1];

  const viewport = {
    once: true,
    amount: 0.1,
    margin: "0px 0px -12% 0px",
  };

  const reveal = {
    hidden: { opacity: 0, y: 34, scale: 0.99, filter: "blur(2px)" },
    show: { opacity: 1, y: 0, scale: 1, filter: "blur(0px)" },
  };

  const revealTransition = (delay = 0) => ({
    duration: 1,
    ease: EASE,
    delay,
  });

  const staggerContainer = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: 0.14,
        delayChildren: 0.08,
      },
    },
  };

  // Micro “waw” (sans changer la structure)
  const softHover = {
    y: -2,
    transition: { duration: 0.25, ease: EASE },
  };

  const iconHover = {
    y: -2,
    scale: 1.08,
    transition: { duration: 0.25, ease: EASE },
  };

  return (
    <motion.footer
      className="section"
      initial="hidden"
      whileInView="show"
      viewport={viewport}
    >
      <div className="container footer-container">
        <motion.div className="foot" variants={staggerContainer}>
          <motion.div
            className="logoLinks"
            variants={reveal}
            transition={revealTransition(0)}
          >
            <motion.div whileHover={{ y: -1, transition: { duration: 0.2, ease: EASE } }}>
              <HomeLogoLink className="navbar-logoBtn" />
            </motion.div>

            <motion.div className="socials" variants={staggerContainer}>
              <motion.a
                href="https://x.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Twitter"
                variants={reveal}
                transition={revealTransition(0)}
                whileHover={iconHover}
                whileTap={{ scale: 0.96 }}
              >
                <TwitterLogo />
              </motion.a>

              <motion.a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram"
                variants={reveal}
                transition={revealTransition(0.03)}
                whileHover={iconHover}
                whileTap={{ scale: 0.96 }}
              >
                <InstagramLogo />
              </motion.a>

              <motion.a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn"
                variants={reveal}
                transition={revealTransition(0.06)}
                whileHover={iconHover}
                whileTap={{ scale: 0.96 }}
              >
                <LinkedinLogo />
              </motion.a>
            </motion.div>
          </motion.div>

          <motion.div className="navLinks" variants={staggerContainer}>
            <motion.div
              className="column"
              variants={reveal}
              transition={revealTransition(0.18)}
            >
              <span className="navTitle">Freelance</span>
              <motion.span className="link" whileHover={softHover}>
                Trouver une mission
              </motion.span>
              <motion.span className="link" whileHover={softHover}>
                Rejoindre Missionly
              </motion.span>
            </motion.div>

            <motion.div
            className="column"
            variants={reveal}
            transition={revealTransition(0.36)}
            >
              <span className="navTitle">Société</span>
              <motion.span className="link" whileHover={softHover}>
                Publier une mission
              </motion.span>
              <motion.span className="link" whileHover={softHover}>
                Tarifs
              </motion.span>
            </motion.div>

            <motion.div
              className="column"
              variants={reveal}
              transition={revealTransition(0.54)}
            >
              <span className="navTitle">Plus</span>
              <motion.span className="link" whileHover={softHover}>
                Sécurité et confidentialité
              </motion.span>
              <motion.span className="link" whileHover={softHover}>
                Aide
              </motion.span>
              <motion.span className="link" whileHover={softHover}>
                Contactez-nous
              </motion.span>
            </motion.div>
          </motion.div>
        </motion.div>

        <motion.div
          className="bottomInfos"
          variants={reveal}
          transition={revealTransition(0.12)}
        >
          <span className="info">© 2026 Missionly</span>
          <span className="separator"> - </span>
          <span className="info">Tous droits réservés</span>
          <span className="separator"> - </span>
          <span className="info">Projet académique (Formation Full-Stack)</span>
          <span className="separator"> - </span>
          <span className="info">
            Corentin Dantinne · Claude Peltier · Sacha Vandenabeele
          </span>
        </motion.div>
      </div>
    </motion.footer>
  );
}

export default Footer;