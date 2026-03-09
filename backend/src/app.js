const express = require('express')
const AuthRoute = require('./routes/AuthRoute.js')
const UserRoute = require('./routes/UserRoute.js')
const MissionRoute = require('./routes/MissionRoute.js')
const ReviewRoute = require('./routes/ReviewRoute.js')

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
    res.json({ message: "Welcome to the Missionly API !"});
});

app.use('/api/auth', AuthRoute)
app.use('/api/user', UserRoute)
app.use('/api/mission', MissionRoute)
app.use('/api/review', ReviewRoute)



module.exports = app