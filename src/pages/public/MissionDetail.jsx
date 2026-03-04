import { useParams, useNavigate, NavLink } from "react-router-dom";
import { getMissionById } from "@/services/missions.mock.js";
import Button from "@/components/ui/Button";
import ArrowLeft from "@/assets/icons/ArrowLeft.svg?react";
import ArrowRight from "@/assets/icons/ArrowRight.svg?react";
import { motion } from "motion/react";

function MissionDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const mission = getMissionById(id);

    //Framer-motion (animations)
    const EASE = [0.22, 1, 0.36, 1];

    const viewport = {
        once: true,
        amount: 0.4,
        margin: "0px 0px -12% 0px",
    };

    const viewportFast = {
        once: true,
        amount: 0.3,
        margin: "0px 0px -12px 0px",
    };

    const reveal = {
        hidden: { opacity: 0, y: 34, scale: 0.99, filter: "blur(2px)" },
        show:   { opacity: 1, y: 0,  scale: 1,    filter: "blur(0px)" },
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

  if (!mission) {
    return (
      <main className="notFound section">
        <p className="container">Mission introuvable.</p>
        <Button onClick={() => navigate("/")}>Retourner à l'accueil</Button>
      </main>
    );
  }

  return (
    <main className="main-missionDetail section">
        <div className="container">
            <NavLink to="/missions/">
            <motion.div variants={reveal}
             className="goBack"
            initial="hidden"
            whileInView="show"
            transition={revealTransition(0)}
            viewport={viewport}>
            <ArrowLeft />
                Retourner aux annonces
            </motion.div>
            </NavLink>
            <motion.div
            className="pageContainer"
            variants={reveal}
            initial="hidden"
            whileInView="show"
            transition={revealTransition(0)}
            viewport={viewport}
            >
                <div className="annonce">
                    <section className="head">
                        <motion.h1
                        variants={reveal}
                        initial="hidden"
                        whileInView="show"
                        transition={revealTransition(0)}
                        viewport={viewport}
                        >
                            {mission.title}
                        </motion.h1>
                        <motion.p
                            className="companyName"
                            variants={reveal}
                            initial="hidden"
                            whileInView="show"
                            transition={revealTransition(0.1)}
                            viewport={viewport}
                        >
                            {mission.company.name}
                        </motion.p>
                        <motion.p
                            className="p summary"
                            variants={reveal}
                            initial="hidden"
                            whileInView="show"
                            transition={revealTransition(0.2)}
                            viewport={viewport}
                        >
                            {mission.summary}
                        </motion.p>
                    </section>
                    <section className="body">
                        <motion.div
                        variants={reveal}
                        initial="hidden"
                        whileInView="show"
                        transition={revealTransition(0)}    
                        className="bodySection"
                        >
                            <h2>Contexte</h2>
                            <div className="separator"></div>
                            <ul className="p">
                            {mission.sections.contexte.map((item, index) => (
                                <li key={`${mission.id}-contexte-${index}`}>{item}</li>
                            ))}
                            </ul>
                        </motion.div>
                        <motion.div
                        variants={reveal}
                        initial="hidden"
                        whileInView="show"
                        transition={revealTransition(0)}    
                        className="bodySection"
                        >
                            <h2>Objectifs de la mission</h2>
                            <div className="separator"></div>
                            <ul className="p">
                            {mission.sections.objectifs.map((item, index) => (
                                <li key={`${mission.id}-objectifs-${index}`}>{item}</li>
                            ))}
                            </ul>
                        </motion.div>
                        <motion.div
                        variants={reveal}
                        initial="hidden"
                        whileInView="show"
                        transition={revealTransition(0)}    
                        className="bodySection"
                        >
                            <h2>Compétences attendues</h2>
                            <div className="separator"></div>
                            <ul className="p">
                            {mission.sections.competences.map((item, index) => (
                                <li key={`${mission.id}-competences-${index}`}>{item}</li>
                            ))}
                            </ul>
                        </motion.div>
                        <motion.div
                        variants={reveal}
                        initial="hidden"
                        whileInView="show"
                        transition={revealTransition(0)}    
                        className="bodySection"
                        >
                            <h2>Profil recherché</h2>
                            <div className="separator"></div>
                            <ul className="p">
                            {mission.sections.profil.map((item, index) => (
                                <li key={`${mission.id}-profil-${index}`}>{item}</li>
                            ))}
                            </ul>
                        </motion.div>
                        <motion.div
                        variants={reveal}
                        initial="hidden"
                        whileInView="show"
                        transition={revealTransition(0)}    
                        className="bodySection"
                        >
                            <h2>Budget & Conditions</h2>
                            <div className="separator"></div>
                            <ul className="p">
                            {mission.sections.budget.map((item, index) => (
                                <li key={`${mission.id}-budget-${index}`}>{item}</li>
                            ))}
                            </ul>
                        </motion.div>
                    </section>
                </div>
                <div className="societe">
                    <div className="resume">
                        <div className="topInfos">
                            <span className="logo">{mission.company.name.slice(0,1)}</span>
                            <div className="infos">
                                <p className="societeName">{mission.company.name}</p>
                                <ul>
                                    <li>{mission.meta.remote ? "Remote" : mission.company.location}</li>
                                    <li>{mission.meta.startDateLabel}</li>
                                </ul>
                            </div>
                        </div>
                        <p className="salaryAndDuration"><span>{mission.meta.rateLabel}</span> • <span>{mission.meta.durationLabel}</span></p>
                        <div className="tags">   
                            {mission.tags.map((item, index) => (
                                <span key={`${mission.id}-tag-${index}`} className='tag'>{item}</span>
                            ))}
                        </div>
                        <div className="btns">
                            <Button>Postuler à cette mission</Button>
                            <Button variant="secondary">Envoyer un message</Button>
                        </div>
                    </div>
                    <div className="societeInfos">
                        <div className="topInfos">
                            <span className="logo">{mission.company.name.slice(0,1)}</span>
                            <div className="infos">
                                <p className="societeName">{mission.company.name}</p>
                                <p className="societeLocation">{mission.company.location}</p>
                            </div>
                        </div>
                        <p className="societeDescription p">{mission.company.description}</p>
                        <Button Icon={ArrowRight} iconPosition="right" variant="secondary">Toutes leurs missions</Button>
                    </div>
                </div>
            </motion.div>
        </div>
    </main>
  );
}

export default MissionDetail;
