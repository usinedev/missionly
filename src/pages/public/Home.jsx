import { useState, useEffect, useRef } from 'react';
import { useNavigate, useOutletContext } from "react-router-dom";
import { getMissions } from '../../services/missions.mock';
import Button from '../../components/ui/Button'
import Input from '../../components/ui/Input'
import data from "@/assets/icons/cat-data.png";
import design from "@/assets/icons/cat-design.png";
import dev from "@/assets/icons/cat-dev.png";
import marketing from "@/assets/icons/cat-marketing.png";
import product from "@/assets/icons/cat-product.png";
import support from "@/assets/icons/cat-support.png";
import bgTest from "@/assets/images/bgTest.svg";
import AuthModal from '../../components/auth/AuthModal';
import MissionCard from '../../components/cards/MissionCard';
import { TextAnimate } from "@/components/ui/text-animate";
import { BlurFade } from "@/components/ui/blur-fade"
import { motion } from 'motion/react';

function Home() {
    const [query, setQuery] = useState("");
    const navigate = useNavigate();
    const { openAuth, isAuthenticated } = useOutletContext();
    const stepsRef = useRef(null);
    const lastMissions = getMissions().slice(-4).reverse();

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

    function goToMissions() {
        const q = query.trim();
        if (!q) {
            navigate("/missions");
        } else {
            navigate(`/missions?q=${encodeURIComponent(q)}`);
        }
    }

    useEffect(() => {
        const root = stepsRef.current;
        if (!root) return;

        const steps = Array.from(root.querySelectorAll(".step"));

        const io = new IntersectionObserver(
            (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) entry.target.classList.add("is-active");
            });
            },
            { threshold: 1 }
        );

        steps.forEach((el) => io.observe(el));

        return () => io.disconnect();
    }, []);

    return (
        <>
        <img src={bgTest} alt="Formes en svg floutées" className="bgImg" />
        <main className='main-home'>
            <section className='section hero'>
                <div className="textHero">
                    <h1><TextAnimate once animation="blurInUp" by="character">Des missions claires.</TextAnimate> <TextAnimate once animation="blurInUp" by="character" delay={0.2}>Des collaborations durables.</TextAnimate></h1>
                    <TextAnimate once animation="blurInUp" by="word" delay={0.5} className="p">Missionly est une plateforme qui met en relation freelances et entreprises autour de missions structurées, pensées pour une vraie collaboration - pas pour des prestations jetables.</TextAnimate>
                </div>
                <BlurFade delay={0.3} duration={1.2} className="searchSection">
                    <Input
                        variant="search"
                        data-cy="search-input"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === "Enter") goToMissions();
                        }}
                    />
                    <div className="btns">
                        <Button
                        variant='secondary'
                        data-cy="publish-mission-btn"
                        onClick={() => {
                            if (isAuthenticated) {
                                navigate('/dashboard')
                            }
                            else {
                                openAuth();
                            }
                        }}
                        >
                            Publier une mission
                        </Button>
                        <Button
                        variant='primary'
                        data-cy="find-mission-btn"
                        onClick={goToMissions}>
                            Trouver une mission
                        </Button>
                    </div>
                </BlurFade>
                <BlurFade delay={0.6} duration={1.2} className="categories">
                    <div className="category">
                        <img src={dev} alt="" />
                        <span>Développement & Tech</span>
                    </div>
                    <div className="category">
                        <img src={design} alt="" />
                        <span>Design & Création</span>
                    </div>
                    <div className="category">
                        <img src={product} alt="" />
                        <span>Produit & UX</span>
                    </div>
                    <div className="category">
                        <img src={marketing} alt="" />
                        <span>Marketing & communication</span>
                    </div>
                    <div className="category">
                        <img src={data} alt="" />
                        <span>Data & Analyse</span>
                    </div>
                    <div className="category">
                        <img src={support} alt="" />
                        <span>Support & Coordination</span>
                    </div>
                </BlurFade>
            </section>

            <section className="section howItWorks">
            <div className="container">
                <motion.h2
                variants={reveal}
                initial="hidden"
                whileInView="show"
                transition={revealTransition(0)}
                viewport={viewport}
                >
                Comment ça marche ?
                </motion.h2>

                <motion.div
                className="steps"
                variants={staggerContainer}
                initial="hidden"
                whileInView="show"
                viewport={viewport}
                ref={stepsRef}
                >
                <motion.div className="step" variants={reveal} transition={revealTransition()}>
                    <div className="circle"></div>
                    <div className="stepContent">
                    <h3>Publiez une mission claire</h3>
                    <p className="p">
                        Définissez les objectifs, les compétences attendues, le budget et le cadre de collaboration dès le départ.
                    </p>
                    </div>
                </motion.div>

                <motion.div
                    className="separator"
                    variants={{ hidden: { opacity: 0, scaleX: 0.6 }, show: { opacity: 1, scaleX: 1 } }}
                    transition={{ duration: 0.45, ease: EASE }}
                    style={{ transformOrigin: "left" }}
                />

                <motion.div className="step" variants={reveal} transition={revealTransition()}>
                    <div className="circle"></div>
                    <div className="stepContent">
                    <h3>Trouvez les bons profils</h3>
                    <p className="p">
                        Recevez des candidatures ciblées et pertinentes, basées sur les besoins réels de la mission — pas sur la surenchère.
                    </p>
                    </div>
                </motion.div>

                <motion.div
                    className="separator"
                    variants={{ hidden: { opacity: 0, scaleX: 0.6 }, show: { opacity: 1, scaleX: 1 } }}
                    transition={{ duration: 0.45, ease: EASE }}
                    style={{ transformOrigin: "left" }}
                />

                <motion.div className="step" variants={reveal} transition={revealTransition()}>
                    <div className="circle"></div>
                    <div className="stepContent">
                    <h3>Collaborez simplement</h3>
                    <p className="p">
                        Discutez via la messagerie intégrée et suivez l’avancement de la mission dans un espace centralisé.
                    </p>
                    </div>
                </motion.div>

                <motion.div
                    className="separator"
                    variants={{ hidden: { opacity: 0, scaleX: 0.6 }, show: { opacity: 1, scaleX: 1 } }}
                    transition={{ duration: 0.45, ease: EASE }}
                    style={{ transformOrigin: "left" }}
                />

                <motion.div className="step" variants={reveal} transition={revealTransition()}>
                    <div className="circle"></div>
                    <div className="stepContent">
                    <h3>Évaluez la collaboration</h3>
                    <p className="p">
                        Laissez des avis contextualisés pour construire une relation de confiance durable.
                    </p>
                    </div>
                </motion.div>
                </motion.div>
            </div>
            </section>

            <section className="section lastMissions">
            <div className="container">
                <motion.h2
                variants={reveal}
                initial="hidden"
                whileInView="show"
                transition={revealTransition(0)}
                viewport={viewport}
                >
                Dernières missions publiées
                </motion.h2>

                <div className="resultsCards">
                {lastMissions.map((mission, index) => (
                    <MissionCard key={mission.id} mission={mission} index={index} />
                ))}
                </div>

                <motion.div
                variants={reveal}
                initial="hidden"
                whileInView="show"
                transition={revealTransition(0.05)}
                viewport={viewport}
                >
                <Button onClick={() => navigate("/missions")}>
                    Voir toutes les missions
                </Button>
                </motion.div>
            </div>
            </section>

            <section className="section collab">
            <motion.div
                className="container"
                variants={staggerContainer}
                initial="hidden"
                whileInView="show"
                viewport={viewportFast}
            >
                <motion.div className="left" variants={reveal} transition={revealTransition()}>
                <h2>Prêt à collaborer autrement?</h2>
                <p className="p">
                    Rejoignez Missionly et découvrez un espace où freelances et entreprises travaillent ensemble de manière structurée et transparente
                </p>

                <motion.div
                    className="btns"
                    variants={staggerContainer}
                    initial="hidden"
                    whileInView="show"
                    viewport={viewport}
                >
                    <motion.div variants={reveal} transition={revealTransition(0)}>
                    <Button
                        variant="secondary"
                        data-cy="publish-mission-bottom-btn"
                        onClick={() => (isAuthenticated ? navigate("/dashboard") : openAuth())}
                    >
                        Publier une mission
                    </Button>
                    </motion.div>

                    <motion.div variants={reveal} transition={revealTransition(0.03)}>
                    <Button
                        variant="primary"
                        data-cy="find-mission-bottom-btn"
                        onClick={goToMissions}
                    >
                        Trouver une mission
                    </Button>
                    </motion.div>
                </motion.div>
                </motion.div>

                <motion.div variants={reveal} transition={revealTransition(0.05)}>
                <AuthModal defaultMode="inscription" />
                </motion.div>
            </motion.div>
            </section>
        </main>
        </>
    )
}

export default Home