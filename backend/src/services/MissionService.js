const AppDataSource = require('../config/database.js')
const { ArrayContains } = require('typeorm')

class MissionService {
    static async getUserMissions(_id){
        const MissionRepository = AppDataSource.getRepository("Mission")

        const missions = await MissionRepository.find({
            where: {user : {id : _id}}
        })
        return missions
    }
    static async getById(_id) {
        const MissionRepository = AppDataSource.getRepository("Mission")

        const mission = await MissionRepository.findOneBy({ id : _id})
        return mission
    }
    static async getByTags(tags) {
        const MissionRepository = AppDataSource.getRepository("Mission")


        const missions = MissionRepository.find({where : {tags : ArrayContains(tags)}})
        return missions

    }
    static async getByName(name) {
        const MissionRepository = AppDataSource.getRepository("Mission")

        const mission = await MissionRepository.findOneBy({ name : name})
        return mission
    }
    static async create(name, start, adress, price, tags, user) {
        const MissionRepository = AppDataSource.getRepository("Mission")

        const mission = MissionRepository.create({
            name,
            start,
            adress,
            price,
            tags,
            user
        })
        return MissionRepository.save(mission)
    }
    static async update(_id, allUpdate) {
        const MissionRepository = AppDataSource.getRepository("Mission")

        
        const missionUpdate = await MissionRepository.findOne({where : {id: _id}})
        

        missionUpdate.name = allUpdate.name ?? missionUpdate.name
        missionUpdate.start = allUpdate.start ?? missionUpdate.start
        missionUpdate.end = allUpdate.end ?? missionUpdate.end
        missionUpdate.adress = allUpdate.adress ?? missionUpdate.adress
        missionUpdate.price = allUpdate.price ?? missionUpdate.price
        missionUpdate.tags = allUpdate.tags ?? missionUpdate.tags
        missionUpdate.status = allUpdate.status ?? missionUpdate.status


            await MissionRepository.save(missionUpdate)

            return missionUpdate        
    }
    static async delete() {
        const MissionRepository = AppDataSource.getRepository("Mission")

    }
}

module.exports = MissionService