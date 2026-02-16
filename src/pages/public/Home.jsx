import { useState } from 'react';
import { useNavigate, useOutletContext } from "react-router-dom";
import Button from '../../components/ui/Button'
import Input from '../../components/ui/Input'
import data from "@/assets/icons/cat-data.png";
import design from "@/assets/icons/cat-design.png";
import dev from "@/assets/icons/cat-dev.png";
import marketing from "@/assets/icons/cat-marketing.png";
import product from "@/assets/icons/cat-product.png";
import support from "@/assets/icons/cat-support.png";
import AuthModal from '../../components/auth/AuthModal';

function Home() {
    const [query, setQuery] = useState("");
    const navigate = useNavigate();
    const { openAuth, isAuthenticated } = useOutletContext();

    function goToMissions() {
        const q = query.trim();
        if (!q) {
            navigate("/missions");
        } else {
            navigate(`/missions?q=${encodeURIComponent(q)}`);
        }
    }


    return (
        <main className='main-home'>
            <section className='section hero'>
                <div className="textHero">
                    <h1>Des missions claires.<br/>Des collaborations durables.</h1>
                    <p className="p">Missionly est une plateforme qui met en relation freelances et entreprises autour de missions structurées, pensées pour une vraie collaboration - pas pour des prestations jetables.</p>
                </div>
                <div className="searchSection">
                    <Input
                        variant="search"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === "Enter") goToMissions();
                        }}
                    />
                    <div className="btns">
                        <Button
                        variant='secondary'
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

            <section className='section collab'>
                <div className="container">
                    <div className="left">
                        <h2>Prêt à collaborer autrement?</h2>
                        <p className='p'>Rejoignez Missionly et découvrez un espace où freelances et entreprises travaillent ensemble de manière structurée et transparente</p>
                        <div className="btns">
                        <Button
                        variant='secondary'
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
                        onClick={goToMissions}>
                            Trouver une mission
                        </Button>
                        </div>
                    </div>
                    
                    <AuthModal defaultMode='inscription' />
                </div>
            </section>
        </main>
    )
}

export default Home