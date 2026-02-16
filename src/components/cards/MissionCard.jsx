import { Link } from "react-router-dom";

function MissionCard({ mission }) {
return (
    <Link to={`/missions/${mission.id}`} className="missionCard">
        <span className="companyLogo">{mission.company.name.slice(0,1)}</span>
        <div className="missionContent">
            <p className="missionTitle">{mission.title}</p>
            <p className="missionCompany">{mission.company.name}</p>
            <div className="missionFilters">
            {mission.tags.map((tag, index) => (
                <span key={`${mission.id}-${tag}-${index}`} className="filter">
                    {tag}
                </span>
            ))}
            </div>
            <p className="locationAndStart"><span className="location">{mission.meta.remote ? "Remote" : mission.company.location}</span> • <span className="startDate">{mission.meta.startDateLabel}</span></p>
            <p className="salaryAndDuration"><span className="salary">{mission.meta.rateLabel}</span> • <span className="duration">{mission.meta.durationLabel}</span></p>
        </div>
    </Link>
)
}

export default MissionCard