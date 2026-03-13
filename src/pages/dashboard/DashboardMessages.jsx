import "@/styles/pages/_dashboard-messages.scss"
import { useNavigate } from "react-router-dom";
import { Send } from "lucide-react"

function DashboardMessages() {
  const navigate = useNavigate();

  return (
    <main className="dashboard-page dashboard-messages">
        <section className="dashboard-header dashboard-element">
            <h1>Messagerie</h1>
            <p className="p">
              Discutez avec les freelances à propos des missions en cours.
            </p>
        </section>

        <section className="messages-layout dashboard-element">
          {/* Conversations */}
          <article className="messages-conversations">
            <h3>Conversations</h3>
            <div className="conversation-list">

              <div className="conversation active">
                <div className="avatar">
                  L
                </div>
                <div className="conversation-info">
                  <p className="name">Mission Logo</p>
                  <p className="preview">
                    Super merci !
                  </p>
                </div>
              </div>

              <div className="conversation">
                <div className="avatar">
                  W
                </div>

                <div className="conversation-info">
                  <p className="name">Mission Website</p>
                  <p className="preview">
                    Je t'envoie la maquette demain
                  </p>
                </div>
              </div>
            </div>
          </article>

          {/* Chat */}
          <article className="messages-chat">
            <div className="chat-header">
              <h3>Mission Logo</h3>
              <p className="p">Discussion avec le freelance</p>
            </div>

            <div className="chat-messages">
              <div className="message received">
                <p>Bonjour, je commence le logo aujourd'hui.</p>
                <span>10:32</span>
              </div>

              <div className="message sent">
                <p>Super merci !</p>
                <span>10:34</span>
              </div>
            </div>

            <div className="chat-input">
              <input
                type="text"
                placeholder="Écrire un message..."
              />

              <button>
                <Send size={18}/>
              </button>
            </div>
          </article>
        </section>
    </main>
  )
}

export default DashboardMessages