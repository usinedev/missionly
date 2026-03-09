import { getMissionById } from "@/services/missions.mock.js";
import { useNavigate, useParams } from "react-router-dom";
import Button from "@/components/ui/Button.jsx";

function DashboardMissionDetail() {
    const { id } = useParams();
    const mission = getMissionById(id);
    const navigate = useNavigate();

if (!mission) {
    return (
    <main className="notFound section">
        <p className="container">Mission introuvable.</p>
        <Button onClick={() => navigate("/")}>Retourner à l'accueil</Button>
    </main>
    );
}

return (
    <main className="dashboard-page dashboard-mission-detail">
        <section className="dashboard-element dashboard-header">
            <div className="text">
                <h1>Modifier la mission</h1>
                <p className="p">Éditez tous les paramètres de la mission.</p>
            </div>
            <Button size="small">Enregistrer</Button>
        </section>

        <section className="dashboard-element">
            <h2>Informations générales</h2>
            <div className="form-grid">
                <div className="field">
                    <label htmlFor="mission-id">ID</label>
                    <input id="mission-id" type="text" defaultValue={mission.id} />
                </div>
                <div className="field">
                    <label htmlFor="mission-title">Titre</label>
                    <input id="mission-title" type="text" defaultValue={mission.title} />
                </div>
                <div className="field">
                    <label htmlFor="mission-category">Catégorie</label>
                    <select id="mission-category" defaultValue={mission.category}>
                        <option value="dev">Développement & Tech</option>
                        <option value="design">Design & Création</option>
                        <option value="product">Produit & UX</option>
                        <option value="marketing">Marketing & Communication</option>
                        <option value="data">Data & Analyse</option>
                        <option value="support">Support & Coordination</option>
                    </select>
                </div>
                <div className="field">
                    <label htmlFor="mission-status">Statut</label>
                    <select id="mission-status" defaultValue={mission.status}>
                        <option value="created">Brouillon</option>
                        <option value="published">Ouverte</option>
                        <option value="started">En cours</option>
                        <option value="finished">Terminée</option>
                    </select>
                </div>
            </div>
        </section>

        <section className="dashboard-element">
            <h2>Entreprise</h2>
            <div className="form-grid">
                <div className="field">
                    <label htmlFor="company-name">Nom</label>
                    <input id="company-name" type="text" defaultValue={mission.company.name} />
                </div>
                <div className="field">
                    <label htmlFor="company-location">Localisation</label>
                    <input id="company-location" type="text" defaultValue={mission.company.location} />
                </div>
                <div className="field field-wide">
                    <label htmlFor="company-description">Description</label>
                    <textarea
                        id="company-description"
                        rows="3"
                        defaultValue={mission.company.description}
                    />
                </div>
                <div className="field">
                    <label htmlFor="company-other-count">Nombre d'autres missions</label>
                    <input
                        id="company-other-count"
                        type="number"
                        min="0"
                        defaultValue={mission.company.otherMissionsCount}
                    />
                </div>
            </div>
        </section>

        <section className="dashboard-element">
            <h2>Informations pratiques</h2>
            <div className="form-grid">
                <div className="field">
                    <label htmlFor="mission-remote">Télétravail</label>
                    <select id="mission-remote" defaultValue={mission.meta.remote ? "yes" : "no"}>
                        <option value="yes">Remote</option>
                        <option value="no">Sur site</option>
                    </select>
                </div>
                <div className="field">
                    <label htmlFor="mission-start">Date de début</label>
                    <input id="mission-start" type="text" defaultValue={mission.meta.startDateLabel} />
                </div>
                <div className="field">
                    <label htmlFor="mission-duration">Durée</label>
                    <input id="mission-duration" type="text" defaultValue={mission.meta.durationLabel} />
                </div>
                <div className="field">
                    <label htmlFor="mission-rate">Tarif</label>
                    <input id="mission-rate" type="text" defaultValue={mission.meta.rateLabel} />
                </div>
            </div>
        </section>

        <section className="dashboard-element">
            <h2>Résumé et tags</h2>
            <div className="form-grid">
                <div className="field field-wide">
                    <label htmlFor="mission-summary">Résumé</label>
                    <textarea id="mission-summary" rows="4" defaultValue={mission.summary} />
                </div>
                <div className="field field-wide">
                    <label htmlFor="mission-tags">Tags (un par ligne)</label>
                    <textarea
                        id="mission-tags"
                        rows="4"
                        defaultValue={mission.tags.join("\n")}
                    />
                </div>
            </div>
        </section>

        <section className="dashboard-element">
            <h2>Contenu détaillé</h2>
            <div className="form-grid">
                <div className="field field-wide">
                    <label htmlFor="section-contexte">Contexte (un par ligne)</label>
                    <textarea
                        id="section-contexte"
                        rows="4"
                        defaultValue={mission.sections.contexte.join("\n")}
                    />
                </div>
                <div className="field field-wide">
                    <label htmlFor="section-objectifs">Objectifs (un par ligne)</label>
                    <textarea
                        id="section-objectifs"
                        rows="4"
                        defaultValue={mission.sections.objectifs.join("\n")}
                    />
                </div>
                <div className="field field-wide">
                    <label htmlFor="section-competences">Compétences (un par ligne)</label>
                    <textarea
                        id="section-competences"
                        rows="4"
                        defaultValue={mission.sections.competences.join("\n")}
                    />
                </div>
                <div className="field field-wide">
                    <label htmlFor="section-profil">Profil (un par ligne)</label>
                    <textarea
                        id="section-profil"
                        rows="4"
                        defaultValue={mission.sections.profil.join("\n")}
                    />
                </div>
                <div className="field field-wide">
                    <label htmlFor="section-budget">Budget (un par ligne)</label>
                    <textarea
                        id="section-budget"
                        rows="4"
                        defaultValue={mission.sections.budget.join("\n")}
                    />
                </div>
            </div>
        </section>

        <section className="dashboard-element">
            <h2>CTA</h2>
            <div className="form-grid">
                <div className="field">
                    <label htmlFor="cta-primary">Bouton principal</label>
                    <input id="cta-primary" type="text" defaultValue={mission.cta.primary} />
                </div>
                <div className="field">
                    <label htmlFor="cta-secondary">Bouton secondaire</label>
                    <input id="cta-secondary" type="text" defaultValue={mission.cta.secondary} />
                </div>
            </div>
        </section>

        <Button>Enregistrer les modifications</Button>
    </main>
)
}

export default DashboardMissionDetail
