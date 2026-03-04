const authService = require('../services/AuthService')

class AuthController { 
     async register(req, res) {
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
     async login(req, res) {
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
     async getProfile(req, res) {
         try {
            console.log(req.params.id);
            
            const id = req.params.id
            if (!id) {
                return res.status(400).json({message: "An id is necessary"})
            }
            const user = await authService.getProfile(id)
            res.status(200).json(user)
        } catch (error) {
            if (error.message === "The user doesn't exist") {
                res.status(401).json({message:error.message})
            }
            throw error;
        }
        
    }
     logout(req, res, next) {
        req.logout((err)=>{
            if (err) {
                return next(err)
            }
            res.json({message:'Déconnecté'})
        })
    }
}


module.exports = new AuthController()