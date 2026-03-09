import { useNavigate } from "react-router-dom";
import { motion } from "motion/react";
import Button from '../ui/Button.jsx'


function MissionCardDashboard({ mission, index = 0 }) {
    const MAX_STAGGER_ITEMS = 12;   // après 12 cards, on ne rajoute plus de délai
    const STAGGER_STEP = 0.06;      // 60ms entre chaque card
    const BASE_DELAY = 0.05;        // petit délai avant la 1ère
    const staggerIndex = Math.min(index, MAX_STAGGER_ITEMS - 1);
    const delay = BASE_DELAY + staggerIndex * STAGGER_STEP;
    const navigate = useNavigate();
    const statusLabels = {
        created: "Brouillon",
        published: "Ouverte",
        started: "En cours",
        finished: "Terminée",
    };
    const statusLabel = statusLabels[mission.status] || mission.status;

    return (
        <motion.div
        initial={{ opacity: 0, y: 28, scale: 0.98, filter: "blur(6px)" }}
        whileInView={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
        transition={{
            duration: 0.55,
            delay,
            ease: [0.22, 1, 0.36, 1] // ease “expo-like” très smooth
        }}
        viewport={{ once: true, amount: 0.2 }}
        className="missionCard missionCardDashboard"
        >
            <div className="missionContent">
                <div className="missionHead">
                    <span className={`status ${mission.status}`}>{statusLabel}</span>
                    <span className="candidates">12 candidats</span>
                </div>

                <p className="missionTitle">{mission.title}</p>

                <div className="missionFilters">
                    {mission.tags.map((tag, i) => (
                    <span key={`${mission.id}-${tag}-${i}`} className="filter">
                        {tag}
                    </span>
                    ))}
                </div>

                <p className="locationAndStart">
                    <span className="location">
                    {mission.meta.remote ? "Remote" : mission.company.location}
                    </span>{" "}
                    • <span className="startDate">{mission.meta.startDateLabel}</span>
                </p>

                <p className="salaryAndDuration">
                    <span className="salary">{mission.meta.rateLabel}</span> •{" "}
                    <span className="duration">{mission.meta.durationLabel}</span>
                </p>
            
                <Button onClick={() => navigate(`/dashboard/missions/${mission.id}`)} size="small">Gérer la mission</Button>
            </div>
        </motion.div>
    );
}

export default MissionCardDashboard;
