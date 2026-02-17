import { Router } from "express";

const router = Router();

// Mini "DB" en mémoire
const users = new Map(); // email -> user
let sessions = new Map(); // token -> user

function makeToken() {
  return Math.random().toString(36).slice(2) + Date.now().toString(36);
}

// helper: lire token depuis Authorization: Bearer xxx
function getToken(req) {
  const h = req.headers.authorization || "";
  const [, token] = h.split(" ");
  return token || null;
}

router.post("/register", (req, res) => {
  const { email, password, firstName, lastName, accountType } = req.body || {};

  if (!email || !password) return res.status(400).json({ message: "Email et mot de passe requis." });

  const key = String(email).toLowerCase().trim();
  if (users.has(key)) return res.status(409).json({ message: "Email déjà utilisé." });

  const user = {
    id: "u_" + makeToken(),
    email: key,
    firstName: firstName || "",
    lastName: lastName || "",
    accountType: accountType || "",
  };

  // On ne stocke pas en clair en vrai. Ici c'est du fake.
  users.set(key, { ...user, password });

  res.json({ user });
});

router.post("/login", (req, res) => {
  const { email, password } = req.body || {};
  const key = String(email || "").toLowerCase().trim();

  const found = users.get(key);
  if (!found || found.password !== password) {
    return res.status(401).json({ message: "Identifiants invalides." });
  }

  const token = makeToken();
  const user = { ...found };
  delete user.password;

  sessions.set(token, user);

  res.json({ token, user });
});

router.get("/me", (req, res) => {
  const token = getToken(req);
  if (!token) return res.json({ user: null });

  const user = sessions.get(token) || null;
  res.json({ user });
});

router.post("/logout", (req, res) => {
  const token = getToken(req);
  if (token) sessions.delete(token);
  res.json({ ok: true });
});

export default router;
