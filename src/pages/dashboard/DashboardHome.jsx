import Button from "@/components/ui/Button";
import MissionStatusChart from "@/components/ui/MissionStatusChart";
import Missions from "@/assets/icons/Missions.svg?react";
import Candidatures from "@/assets/icons/Candidatures.svg?react";
import Plus from "@/assets/icons/Plus.svg?react";
import { useNavigate } from "react-router-dom";

// Tableau de valeurs de missions (en brute pour l'instant)
const data = [
    { label: "Brouillons", value: 3, color: "#3B1D7A" },
    { label: "Ouvertes", value: 2, color: "#8E9AD6" },
    { label: "En Cours", value: 4, color: "#7B2CFF" },
    { label: "Terminées", value: 6, color: "#B56AC7" }
];

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
                <span className="missionsNumber">{data[0].value}</span>
                <p className="p">{data[0].label}</p>
            </article>
            <article className="dashboard-element">
                <span className="missionsNumber">{data[1].value}</span>
                <p className="p">Missions {data[1].label}</p>
            </article>
            <article className="dashboard-element">
                <span className="missionsNumber">{data[2].value}</span>
                <p className="p">Missions {data[2].label}</p>
            </article>
            <article className="dashboard-element">
                <span className="missionsNumber">{data[3].value}</span>
                <p className="p">Missions {data[3].label}</p>
            </article>
        </section>

        <section className="dashboard-main-missions">
            <article className="missions-status dashboard-element">
                <h3>Statut des missions</h3>

                <MissionStatusChart data={data}/>
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
