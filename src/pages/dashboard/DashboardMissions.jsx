import MissionCardDashboard from '../../components/cards/MissionCardDashboard'
import { useState, useMemo } from 'react';
import { getMissions } from '@/services/missions.mock';
import Button from '@/components/ui/Button';
import Plus from "@/assets/icons/Plus.svg?react";
import StatusBtn from '@/components/ui/StatusBtn';


function DashboardMissions() {
    const missions = getMissions();
    const [selectedStatus, setSelectedStatus] = useState("all");
    const filteredMissions = useMemo(() => {
        return missions.filter((mission) => {
        const matchStatus =
            selectedStatus === "all" || mission.status === selectedStatus;
        return matchStatus;
        });
    }, [missions, selectedStatus]);


  return (
    <main className='dashboard-page dashboard-missions'>
        <section className="dashboard-header dashboard-element">
            <div className="text">
                <h1>Missions</h1>
                <p className="p">Gérez et suivez l’ensemble des missions publiées par votre société.</p>
            </div>
            <Button Icon={Plus} iconPosition='left'>Créer une mission</Button>
        </section>

        <StatusBtn selectedStatus={selectedStatus} onChange={setSelectedStatus} />

        <div className="resultsCardsDashboard">
            {filteredMissions.map((mission) => (
                <MissionCardDashboard key={mission.id} mission={mission} />
            ))}
        </div>
    </main>
  )
}

export default DashboardMissions
