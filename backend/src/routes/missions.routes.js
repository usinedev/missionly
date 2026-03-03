const express = require('express');
const router = express.Router();

// Récupère toutess les missions
router.get("/", async (req, res) => {
    try {
        const missions = await missionRepository().find();
        res.json(missions);
    } catch (err) {
        res.status(500).json({ message: "Erreur lors de la récupération des missions" });
    }
});

// Récupère les missions par leur ID





// TODO: Importer les fonctions du repository de missions
const missionRepository = () =>
  AppDataSource.getRepository(Mission);

// Créer Mission
router.post("/", async (req, res) => {
    try {
        const mission = missionRepository().create({
            ...req.body,
            status: "created",
        });

        const savedMission = await missionRepository().save(mission);
        res.status(201).json(savedMission);
    } catch (err) {
        res.status(500).json({ message: "Erreur lors de la création de mission" });
    }
});

// Publier Mission
router.patch("/:id/publish", async (req, res) => {
    try {
        const mission = await missionRepository().findOneBy({ id: parseInt(req.params.id)});

        if (!mission) {
            return res.status(404).json({ message: "Mission non trouvée"});
        }

        if (mission.status !== "created") {
            return res.status(400).json({ message: "Mission déjà publiée ou commencée" });
        }

        mission.status = "published";

        await missionRepository().save(mission);
        res.json({ message: "Mission Publiée !", mission });
    } catch (err) {
        res.status(500).json({ message: "Erreur lors de la publication de la mission"});
    }
});

// Modifier Mission
router.patch("/:id", async (req, res) => {
    try {
        const mission = await missionRepository().findOneBy({ id: parseInt(req.params.id)});

        if (!mission) {
            return res.status(404).json({ message: "Mission Introuvable"});
        }

        // Mise à jour des champs de la mission
        Object.assign(mission, req.body);

        const updated = await missionRepository().save(mission);
        res.json(updated);
    } catch (err) {
        res.status(500).json({ message: "Erreur lors de la modification"});
    }
});

// Terminer Mission
router.delete("/:id/", async (req, res) => {
    try {
        const mission = await missionRepository().findOneBy({ id: parseInt(req.params.id)});

        if (!mission) {
            return res.status(404).json({ message: "Mission Introuvable"}); 
        }

        // Changer le status
        // ! Status modifié avant suppression supprimer si inutile
        mission.status = "finished";
        await missionRepository().save(mission);

        // Supprimer la mission
        await missionRepository().remove(mission);

        res.json({ message: "Mission Terminée !", mission });
    } catch (err) {
        res.status(500).json({ message: "Erreur lors de la finalisation de la mission"});
    }
});

module.exports = router;