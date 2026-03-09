import Button from "@/components/ui/Button";
import Missions from "@/assets/icons/Missions.svg?react";
import Candidatures from "@/assets/icons/Candidatures.svg?react";
import Plus from "@/assets/icons/Plus.svg?react";
import { useNavigate } from "react-router-dom";

function DashboardHome() {
  const navigate = useNavigate();

  return (
    <main className="dashboard-page dashboard-home">
        <section className="dashboard-header dashboard-element">
            <h1>Tableau de bord</h1>
            <p className="p">Bienvenue sur votre espace personnel.<br/>Suivez l’état de vos missions, vos candidatures et l’activité récente en un coup d’œil.</p>
        </section>

        <section className="missions-overview">
            <article className="dashboard-element">
                <span className="missionsNumber">3</span>
                <p className="p">Missions ouvertes</p>
            </article>
            <article className="dashboard-element">
                <span className="missionsNumber">3</span>
                <p className="p">Missions en cours</p>
            </article>
            <article className="dashboard-element">
                <span className="missionsNumber">3</span>
                <p className="p">Missions terminées</p>
            </article>
            <article className="dashboard-element">
                <span className="missionsNumber">3</span>
                <p className="p">Messages non lus</p>
            </article>
        </section>

        <section className="dashboard-main-missions">
            <article className="missions-status dashboard-element">
                <h3>Statut des missions</h3>
            </article>
            <article className="quick-actions dashboard-element">
                <h3>Action rapides</h3>
                <div className="btns">
                    <Button Icon={Plus} iconPosition="left" variant="primary">
                        Publier une mission
                    </Button>
                    <Button onClick={() => navigate("/")} Icon={Missions} iconPosition="left" variant="secondary">
                        Gérer mes mission
                    </Button>
                    <Button Icon={Candidatures} iconPosition="left" variant="secondary">
                        Voir les candidatures
                    </Button>
                </div>
            </article>
        </section>
    </main>
  );
}

export default DashboardHome;
