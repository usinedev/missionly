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

function Home() {
    const [query, setQuery] = useState("");
    const navigate = useNavigate();
    const { openAuth, isAuthenticated } = useOutletContext();
    const stepsRef = useRef(null);
    const lastMissions = getMissions().slice(-4).reverse();

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
                    <h1>Des missions claires.<br/>Des collaborations durables<span className='purple'>.</span></h1>
                    <p className="p">Missionly est une plateforme qui met en relation freelances et entreprises autour de missions structurées, pensées pour une vraie collaboration - pas pour des prestations jetables.</p>
                </div>
                <div className="searchSection">
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
                </div>
                <div className="categories">
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
                </div>
            </section>

            <section className="section howItWorks">
                <div className="container">
                    <h2>Comment ça marche ?</h2>
                    <div className="steps" ref={stepsRef}>
                        <div className="step">
                            <div className="circle"></div>
                            <div className="stepContent">
                                <h3>Publiez une mission claire</h3>
                                <p className="p">Définissez les objectifs, les compétences attendues, le budget et le cadre de collaboration dès le départ.</p>
                            </div>
                        </div>
                        <div className="separator"></div>
                        <div className="step">
                            <div className="circle"></div>
                            <div className="stepContent">
                                <h3>Trouvez les bons profils</h3>
                                <p className="p">Recevez des candidatures ciblées et pertinentes, basées sur les besoins réels de la mission — pas sur la surenchère.</p>
                            </div>
                        </div>
                        <div className="separator"></div>
                        <div className="step">
                            <div className="circle"></div>
                            <div className="stepContent">
                                <h3>Collaborez simplement</h3>
                                <p className="p">Discutez via la messagerie intégrée et suivez l’avancement de la mission dans un espace centralisé.</p>
                            </div>
                        </div>
                        <div className="separator"></div>
                        <div className="step">
                            <div className="circle"></div>
                            <div className="stepContent">
                                <h3>Évaluez la collaboration</h3>
                                <p className="p">Laissez des avis contextualisés pour construire une relation de confiance durable.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="section lastMissions">
                <div className="container">
                    <h2>Dernières missions publiées</h2>
                    <div className="resultsCards">
                    {lastMissions.map((mission) => (
                        <MissionCard key={mission.id} mission={mission} />
                    ))}
                    </div>
                    <Button onClick={() => navigate("/missions")}>
                        Voir toutes les missions
                    </Button>
                </div>
            </section>

            <section className='section collab'>
                <div className="container">
                    <div className="left">
                        <h2>Prêt à collaborer autrement?</h2>
                        <p className='p'>Rejoignez Missionly et découvrez un espace où freelances et entreprises travaillent ensemble de manière structurée et transparente</p>
                        <div className="btns">
                        <Button
                        variant='secondary'
                        data-cy="publish-mission-bottom-btn"
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
                        data-cy="find-mission-bottom-btn"
                        onClick={goToMissions}>
                            Trouver une mission
                        </Button>
                        </div>
                    </div>
                    
                    <AuthModal defaultMode='inscription' />
                </div>
            </section>
        </main>
        </>
    )
}

export default Home
