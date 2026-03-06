const AppDataSource = require('../config/database.js')
const bcrypt = require('bcrypt') 
const jwt = require('jsonwebtoken') 

class UserService {
static async getProfile(_id){
        const userRepository = AppDataSource.getRepository("User")

        const user = await userRepository.findOne({where :{id : _id}})
        if (!user) {
    throw new Error("The user doesn't exist")
        }
        const {password : _, ... userWithoutPassword} = user
        return userWithoutPassword
    }  

    static async update(_id, token, allUpdate) {
        const userRepository = AppDataSource.getRepository("User")
        console.log(token);
        
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
            await userRepository.save(userUpdate)
            
            return userUpdate
        }
}

module.exports = UserService