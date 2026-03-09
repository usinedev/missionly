import { getMissionById } from "@/services/missions.mock.js";
import { useParams } from "react-router-dom";

function DashboardMissionDetail() {
    const { id } = useParams();
    const mission = getMissionById(id);

if (!mission) {
    return (
    <main className="notFound section">
        <p className="container">Mission introuvable.</p>
        <Button onClick={() => navigate("/")}>Retourner à l'accueil</Button>
    </main>
    );
}

return (
    <main className="dashboard-page">
        <h1>{mission.title}</h1>
    </main>
)
}

export default DashboardMissionDetail