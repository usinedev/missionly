import { useState } from 'react';
import Button from '../../components/ui/Button'
import AuthModal from '../../components/auth/AuthModal';
import Input from '../../components/ui/Input'
import data from "@/assets/icons/cat-data.png";
import design from "@/assets/icons/cat-design.png";
import dev from "@/assets/icons/cat-dev.png";
import marketing from "@/assets/icons/cat-marketing.png";
import product from "@/assets/icons/cat-product.png";
import support from "@/assets/icons/cat-support.png";

function Home() {
    const [query, setQuery] = useState("");

    return (
        <main className='main-home section'>
            <section className='container hero'>
                <div className="textHero">
                    <h1>Des missions claires.<br/>Des collaborations durables.</h1>
                    <p className="p">Missionly est une plateforme qui met en relation freelances et entreprises autour de missions structurées, pensées pour une vraie collaboration - pas pour des prestations jetables.</p>
                </div>
                <div className="searchSection">
                    <Input variant="search" value={query} onChange={(e) => setQuery(e.target.value)} />
                    <div className="btns">
                        <Button variant='secondary'>Publier une mission</Button>
                        <Button variant='primary'>Trouver une mission</Button>
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

            <AuthModal></AuthModal>
        </main>
    )
}

export default Home