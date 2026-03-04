import express from "express";
import AuthRoutes from "./routes/AuthRoute.js"
import MissionRoutes from "./routes/MissionRoute.js"
import ReviewRoutes from './routes/ReviewRoute.js'

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
    res.json({ message: "Welcome to the Missionly API !"});
});

app.use('/api/auth', AuthRoutes)
app.use('/api/mission', MissionRoutes)
app.use('/api/review', ReviewRoutes)



export default app;