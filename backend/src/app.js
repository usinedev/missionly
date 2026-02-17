import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import missionsRoutes from "./routes/missions.routes.js";
import authRoutes from "./routes/auth.routes.js";

dotenv.config();

const app = express();

app.use(cors({ origin: process.env.CLIENT_ORIGIN, credentials: true }));
app.use(express.json());

app.get("/health", (req, res) => res.json({ ok: true }));

app.use("/api/missions", missionsRoutes);
app.use("/api/auth", authRoutes);

export default app;