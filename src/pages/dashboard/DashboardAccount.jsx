import "../../styles/pages/_dashboard-account.scss"
import { useNavigate } from "react-router-dom";
import { User, Mail, Building, Lock } from "lucide-react"

function DashboardAccount() {
  const navigate = useNavigate();

  return (
    <main className="dashboard-page dashboard-account">
      <section className="dashboard-header">
        <h1>Mon compte</h1>
        <p className="p">
          Gérez vos informations personnelles et la sécurité de votre compte.
        </p>
      </section>

      <section className="account-layout">

        {/* Profile */}
        <article className="profile-card">
          <div className="avatar">
            J
          </div>
          <h2>John Doe</h2>
          <p className="p">Entreprise</p>

          <button className="btn-secondary">
            Modifier la photo
          </button>
        </article>

        {/* Informations */}
        <article className="account-info">
          <h3>Informations personnelles</h3>
          
          <div className="form-grid">
            <div className="input-group">
              <label>Nom</label>
              <div className="input">
                <User />
                <input type="text" defaultValue="John Doe"/>
              </div>
            </div>

            <div className="input-group">
              <label>Entreprise</label>
              <div className="input">
                <Building />
                <input type="text" defaultValue="Missionly" />
              </div>
            </div>

            <div className="input-group full">
              <label>Email</label>
              <div className="input">
                <Mail />
                <input type="email" defaultValue="contact@email.com" />
              </div>
            </div>
          </div>
        </article>

        {/* Securité */}
        <article className="account-security">
          <h3>Sécurité</h3>

          <div className="security-form">
            <div className="input-form">
              <label>Mot de passe</label>

              <div className="input">
                <input type="password" placeholder="••••••••" />
              </div>
            </div>

            <div className="input-form">
              <label>Confirmer le mot de passe</label>

              <div className="input">
                <input type="password" placeholder="••••••••" />
              </div>
            </div>
          </div>

          <div className="security-actions">
            <button>Sauvegarder</button>
          </div>
        </article>
      </section>
    </main>
  )
}

export default DashboardAccount