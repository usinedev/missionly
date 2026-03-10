import { Link } from "react-router-dom";
import { motion } from "motion/react";

const MAX_STAGGER_ITEMS = 12;   // après 12 cards, on ne rajoute plus de délai
const STAGGER_STEP = 0.06;      // 60ms entre chaque card
const BASE_DELAY = 0.05;        // petit délai avant la 1ère

function MissionCard({ mission, index = 0 }) {
  const staggerIndex = Math.min(index, MAX_STAGGER_ITEMS - 1);
  const delay = BASE_DELAY + staggerIndex * STAGGER_STEP;

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
    >
      <Link to={`/missions/${mission.id}`} className="missionCard">
        <span className="companyLogo">{mission.user.userName.slice(0, 1)}</span>

        <div className="missionContent">
          <p className="missionTitle">{mission.name}</p>
          <p className="missionCompany">{mission.user.userName}</p>

          <div className="missionFilters">
            {mission.tags.map((tag, i) => (
              <span key={`${mission.id}-${tag}-${i}`} className="filter">
                {tag}
              </span>
            ))}
          </div>

          <p className="locationAndStart">
            <span className="location">
              {mission.adress}
            </span>{" "}
            • <span className="startDate">{mission.start}</span>
          </p>

          <p className="salaryAndDuration">
            <span className="salary">{mission.price[0]} {mission.price[1]}</span> •{" "}
            <span className="duration">{mission.end}</span>
          </p>
        </div>
      </Link>
    </motion.div>
  );
}

export default MissionCard;