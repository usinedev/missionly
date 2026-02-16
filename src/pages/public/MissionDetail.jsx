import { useParams, useNavigate, NavLink } from "react-router-dom";
import { getMissionById } from "@/services/missions.mock.js";
import Button from "@/components/ui/Button";
import ArrowLeft from "@/assets/icons/ArrowLeft.svg?react";
import ArrowRight from "@/assets/icons/ArrowRight.svg?react";

function MissionDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

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
    <main className="main-missionDetail section">
        <div className="container">
            <NavLink to="/missions/" className="goBack"><ArrowLeft /> Retourner aux annonces</NavLink>
            <div className="pageContainer">
                <div className="annonce">
                    <section className="head">
                        <h1>{mission.title}</h1>
                        <p className="companyName">{mission.company.name}</p>
                        <p className="p summary">{mission.summary}</p>
                    </section>
                    <section className="body">
                        <div className="bodySection">
                            <h2>Contexte</h2>
                            <div className="separator"></div>
                            <ul className="p">
                            {mission.sections.contexte.map((item, index) => (
                                <li key={`${mission.id}-contexte-${index}`}>{item}</li>
                            ))}
                            </ul>
                        </div>
                        <div className="bodySection">
                            <h2>Objectifs de la mission</h2>
                            <div className="separator"></div>
                            <ul className="p">
                            {mission.sections.objectifs.map((item, index) => (
                                <li key={`${mission.id}-objectifs-${index}`}>{item}</li>
                            ))}
                            </ul>
                        </div>
                        <div className="bodySection">
                            <h2>Compétences attendues</h2>
                            <ul className="p">
                            {mission.sections.competences.map((item, index) => (
                                <li key={`${mission.id}-competences-${index}`}>{item}</li>
                            ))}
                            </ul>
                        </div>
                        <div className="bodySection">
                            <h2>Profil recherché</h2>
                            <div className="separator"></div>
                            <ul className="p">
                            {mission.sections.profil.map((item, index) => (
                                <li key={`${mission.id}-profil-${index}`}>{item}</li>
                            ))}
                            </ul>
                        </div>
                        <div className="bodySection">
                            <h2>Budget & Conditions</h2>
                            <div className="separator"></div>
                            <ul className="p">
                            {mission.sections.budget.map((item, index) => (
                                <li key={`${mission.id}-budget-${index}`}>{item}</li>
                            ))}
                            </ul>
                        </div>
                    </section>
                </div>
                <div className="societe">
                    <div className="resume">
                        <div className="topInfos">
                            <span className="logo">{mission.company.name.slice(0,1)}</span>
                            <div className="infos">
                                <p className="societeName">{mission.company.name}</p>
                                <ul>
                                    <li>{mission.meta.remote ? "Remote" : mission.company.location}</li>
                                    <li>{mission.meta.startDateLabel}</li>
                                </ul>
                            </div>
                        </div>
                        <p className="salaryAndDuration"><span>{mission.meta.rateLabel}</span> • <span>{mission.meta.durationLabel}</span></p>
                        <div className="tags">   
                            {mission.tags.map((item, index) => (
                                <span key={`${mission.id}-tag-${index}`} className='tag'>{item}</span>
                            ))}
                        </div>
                        <div className="btns">
                            <Button>Postuler à cette mission</Button>
                            <Button variant="secondary">Envoyer un message</Button>
                        </div>
                    </div>
                    <div className="societeInfos">
                        <div className="topInfos">
                            <span className="logo">{mission.company.name.slice(0,1)}</span>
                            <div className="infos">
                                <p className="societeName">{mission.company.name}</p>
                                <p className="societeLocation">{mission.company.location}</p>
                            </div>
                        </div>
                        <p className="societeDescription p">{mission.company.description}</p>
                        <Button Icon={ArrowRight} iconPosition="right" variant="secondary">Toutes leurs missions</Button>
                    </div>
                </div>
            </div>
        </div>
    </main>
  );
}

export default MissionDetail;
