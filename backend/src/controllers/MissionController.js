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
    static async getById(req, res) {
        try {
            
            const id = req.params.id
            if (!id) {
            res.status(401).json({message:"Id must be a number"})
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
        const { name, start, adress, price, tags, user } = req.body        
        console.log(name, start, adress, price, tags, user );
        

        const mission = await MissionService.create(
            name,
            start,
            adress,
            price,
            tags,
            user
        )
        res.status(200).json(mission)
    }
    static async update(req, res) {
        const id = req.params.id

    }
    static async delete(req, res) {
        const id = req.params.id

    }
}

module.exports = MissionController