const AppDataSource = require('../config/database.js')
const bcrypt = require('bcrypt') 
const jwt = require('jsonwebtoken') 

class UserService {
static async getById(_id){
        const userRepository = AppDataSource.getRepository("User")

        const user = await userRepository.findOne({where :{id : _id}})
        if (!user) {
    throw new Error("The user doesn't exist")
        }
        const {password : _, ... userWithoutPassword} = user
        return userWithoutPassword
    }  
    static async getByName(_name){
        const userRepository = AppDataSource.getRepository("User")

        const user = await userRepository.findOne({where :{name : _name}})
        if (!user) {
    throw new Error("The user doesn't exist")
        }
        const {password : _, ... userWithoutPassword} = user
        return userWithoutPassword
    }  
    static async getUsers(number) {
        const userRepository = AppDataSource.getRepository("User")

        let users = []
        for (let i = 1; i < number; i++) {
            const user = await userRepository.findOne({where :{id: i}})            
            if (user) {   
                const {password : _, ... userWithoutPassword} = user
                users.push(userWithoutPassword)
            }
        }
        return users
    }

    static async update(_id, token, allUpdate) {
        const userRepository = AppDataSource.getRepository("User")
        
        const userTrying = jwt.decode(token, process.env.JWT_SECRET || 'secret')
        const userUpdate = await userRepository.findOne({where : {id: _id}})
        console.log(userTrying);
        
        if (userTrying.id == _id) {

        userUpdate.userName = allUpdate.userName ?? userUpdate.userName
        userUpdate.langage = allUpdate.langage ?? userUpdate.langage
        userUpdate.priceUnity = allUpdate.priceUnity ?? userUpdate.priceUnity
        userUpdate.programs = allUpdate.programs ?? userUpdate.programs
        userUpdate.TVAnumber = allUpdate.TVAnumber ?? userUpdate.TVAnumber
        }
        if (userTrying.role == "Admin") {
            Object.assign(userUpdate, allUpdate)        }
        if (userTrying.id == _id ||userTrying.role == "Admin") {
            await userRepository.save(userUpdate)
            const {password : _, ...userUpdateWithoutPassword} = userUpdate
            return userUpdateWithoutPassword
        }
        throw new Error("You cannot modify this user")
        } 

        
}

module.exports = UserService