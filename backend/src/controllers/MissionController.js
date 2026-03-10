const MissionService = require('../services/MissionService.js')

class MissionController {
    static async getUserMissions(req, res) {
        try {
            const id = req.params.id
            if (!id) {
                res.status(401).json({message:"Id must be a number"})
            }
            const missions = await MissionService.getUserMissions(id) 

            res.status(200).json(missions)

        } catch (error) {
            res.status(401).json({message: error.message})
        }
    }
    static async getById(req, res, next) {
        try {
            
            const id = req.params.id
            if (!id) {
            res.status(401).json({message:"Id must be a number"})
        }
            if (!Number.isInteger(id)) {
                next()
            }        
        const missions = await MissionService.getById(id)

        res.status(200).json(missions)

    } catch (error) {
        res.status(401).json({message: error.message})   
    }
    }
    static async getByTags(req, res) {
        try {
            const tags = req.query.tags
            const missions = await MissionService.getByTags(tags)

            res.status(200).json(missions)

        } catch (error) {
            res.status(401).json({message: error.message})   
        }

    }
    static async getByName(req, res) {
        try {
            
            const name = req.params.name
            if (!name) {
            res.status(401).json({message:"Id must be a number"})
        }
        
        const missions = await MissionService.getByName(name)

        res.status(200).json(missions)

    } catch (error) {
        res.status(401).json({message: error.message})   
    }

    }
    static async create(req, res) {
        try {
            
            const { name, start, adress, price, tags, user, summary, context, goals, skills, desiredProfile, conditions } = req.body        
            

            const mission = await MissionService.create(
                name,
                start,
                adress,
                price,
                tags,
                user,
                summary, 
                context, 
                goals, 
                skills, 
                desiredProfile, 
                conditions
            )
            res.status(200).json(mission)
        } catch (error) {
            res.status(401).json({message: error.message})   
        }
    }
    static async update(req, res) {
        try {
            const id = req.params.id
            console.log(id);
            
            const allUpdate = req.body
            console.log(allUpdate);
            
            const mission = await MissionService.update(id, allUpdate)
            res.status(200).json(mission)
        } catch (error) {
        res.status(401).json({message: error.message})   
        }
    }
    static async delete(req, res) {
try {
            const id = req.params.id
            const allUpdate = req.body
            const mission = await MissionService.update(id, allUpdate)
            res.status(200).json(mission)
        } catch (error) {
        res.status(401).json({message: error.message})   
        }
    }
    static async getPublished(req, res) {
        try {
            const mission = await MissionService.getPublished()
            console.log("controlleur");
            
            res.status(200).json(mission)
        } catch (error) {
            res.status(401).json({message: error.message})   
        }
    }
}

module.exports = MissionController