const AppDataSource = require('../config/database.js')
const { ArrayContains } = require('typeorm')

class MissionService {
    static async getUserMissions(_id){
        const MissionRepository = AppDataSource.getRepository("Mission")

        let missions = await MissionRepository.find({
            where: {user : {id : _id}}, relations: {description : true, user: true}
        })
        
        missions = missions.map((mission)=>{
            
            mission.user.password = ""
            
            return mission
        })
        
        return missions
    }
    static async getById(_id) {
        const MissionRepository = AppDataSource.getRepository("Mission")

        const mission = await MissionRepository.findOne({where : { id : _id}, relations: {description : true, user: true, tag: true}})    
        mission.user.password = ""

        return mission
    }
    static async getByTags(tags) {
        const MissionRepository = AppDataSource.getRepository("Mission")


        const missions = MissionRepository.find({where : {tags : ArrayContains(tags)}, relations: {description : true, user: true, tag: true}})
        missions.user.password = ""

        return missions

    }
    static async getByName(name) {
        const MissionRepository = AppDataSource.getRepository("Mission")

        const mission = await MissionRepository.findOne({where : { name : name},relations: {description : true, user: true, tag: true}})
        mission.user.password = ""

        return mission
    }
    static async create(name, start, adress, price, tags, user, summary, context, goals, skills, desiredProfile, conditions) {
        const MissionRepository = AppDataSource.getRepository("Mission")
        const DescriptionRepository = AppDataSource.getRepository("Description")

        const newMission = MissionRepository.create({
            name,
            start,
            adress,
            price,
            tags,
            user
        })
        const savedMission = await MissionRepository.save(newMission)
        
        const description = DescriptionRepository.create({
            summary, context, goals, skills, desiredProfile, conditions, mission: savedMission
        })
        
        const savedDescription = await DescriptionRepository.save(description)
        
        return (savedDescription)

    }
    static async update(_id, allUpdate) {
        const MissionRepository = AppDataSource.getRepository("Mission")
        const DescriptionRepository = AppDataSource.getRepository("Description")

        const missionUpdate = await MissionRepository.findOne({where : {id: _id}, relations: {description : true, user: true, tag: true}})

        missionUpdate.name = allUpdate.name ?? missionUpdate.name
        missionUpdate.start = allUpdate.start ?? missionUpdate.start
        missionUpdate.end = allUpdate.end ?? missionUpdate.end
        missionUpdate.adress = allUpdate.adress ?? missionUpdate.adress
        missionUpdate.price = allUpdate.price ?? missionUpdate.price
        missionUpdate.tags = allUpdate.tags ?? missionUpdate.tags
        missionUpdate.status = allUpdate.status ?? missionUpdate.status

 if (missionUpdate.description) {
        missionUpdate.description.summary = allUpdate.summary ?? missionUpdate.description.summary
        missionUpdate.description.context = allUpdate.context ?? missionUpdate.description.context
        missionUpdate.description.goals = allUpdate.goals ?? missionUpdate.description.goals
        missionUpdate.description.skills = allUpdate.skills ?? missionUpdate.description.skills
        missionUpdate.description.desiredProfile = allUpdate.desiredProfile ?? missionUpdate.description.desiredProfile
        missionUpdate.description.conditions = allUpdate.conditions ?? missionUpdate.description.conditions

        await DescriptionRepository.save(missionUpdate.description)
    }
            await MissionRepository.save(missionUpdate)
            missionUpdate.user.password = ""
            return missionUpdate        
    }
    static async delete() {
        const MissionRepository = AppDataSource.getRepository("Mission")

    }
}

module.exports = MissionService