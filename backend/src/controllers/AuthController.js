const authService = require('../services/AuthService')
const jwt = require("jsonwebtoken")

class AuthController { 
    static async register(req, res) {
        const { email, password, userName, role, TVAnumber } = req.body
        try {
            const user = await authService.register(
                email,
                password,
                userName,
                role, 
                TVAnumber
            )
            res.status(200).json({message : "User register succesfully"})
        } catch (error) {
            if (error.message === "This email is already taken") {
                return res.status(409).json({message:error.message})
            }
            if (error.message === "All fields are required") {
                return res.status(400).json({message:error.message})
            }

            throw error;
        }

    }
    static async login(req, res) {
        const { email, password } = req.body
        try {
            const { infoUser, accessToken, refreshToken} = await authService.login(email, password) 

            res.status(200).json({message:"Login succesful", infoUser, accessToken, refreshToken})
        } catch (error) {
            if (error.message === "Incorrect password or email") {
                return res.status(401).json({message:error.message})
            }
            throw error;
        }

    }
    static logout(req, res, next) {
        req.logout((err)=>{
            if (err) {
                return next(err)
            }
            res.json({message:'Déconnecté'})
        })
    }
    static async refresh(req, res) {
        const authHeader = req.headers.authorization
        const token = authHeader.split(' ')[1]
        console.log(token);
        
        const decoded = jwt.decode(token)

        const accessToken = await authService.refresh(decoded.id)
        res.status(200).json(accessToken)
    }
}


module.exports = AuthController