const bcrypt = require('bcrypt') 
const jwt = require('jsonwebtoken') 
const AppDataSource = require('../config/database.js')

class AuthService { 
    static async login(email, password) {
        const userRepository = AppDataSource.getRepository("User")

        const user = await userRepository.findOne({where : {email}})
        
        if (!user) {
            throw new Error("Authentication failed")
        }
        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) {
            throw new Error("Incorrect password or email")
        }
        const accessToken = jwt.sign(
        {id:user.id, role:user.role},
        process.env.JWT_SECRET || 'secret',
        {expiresIn : '2d'}
    ) 
        const refreshToken = jwt.sign(
        {id:user.id},
        process.env.JWT_REFRESH_SECRET || 'refresh_secret',
        {expiresIn : '7d'}
    )
        const {password: _, ...userWithoutPassword} = user
        console.log(userWithoutPassword);
        
        let infoUser = userWithoutPassword
        return { infoUser, accessToken, refreshToken}
    }
    static async register(email, password, userName, role, TVAnumber){
        console.log("Registered entities:", AppDataSource.entityMetadatas.map(m => m.name));
        
        const userRepository = AppDataSource.getRepository("User")

        const existingUser = await userRepository.findOne({where : {email}})
        if (existingUser) {
            throw new Error("This email is already taken")
        }
        const hashedPassword = await bcrypt.hash(password, 10)
        const user=userRepository.create({
            email,
            password: hashedPassword,
            role,
            userName,
            TVAnumber
        })
        return userRepository.save(user) 
    }
}


module.exports = AuthService