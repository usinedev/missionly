const authService = require('../services/AuthService')
const { verifyToken } = require('../utils/jwt')

const authenticate = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization

        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({
                success : false,
                message : 'No token, no access'
            })
        }

        const token = authHeader.split(' ')[1]
        
        const decoded = verifyToken(token) 

        const user = await authService.findById(decoded.id).select('-password')

        if (!user) {
            return res.status(401).json({
                success: false,
                message: 'User not found'
            })
        }

        next()
    } catch (error) {
        console.error('Authentication error', error.message);
        
        return res.status(401).json({
            success: false,
            message : "Token expired"
        })

    }
}

const adminAccess = async (req, res, next) => {
    try {
        if (!req.user) {
           return res.status(401).json({
                success: false,
                message : error.message ||"Need a user or a token"
            }) 
        }
        if (req.user.role !== "Admin") {
        return res.status(403).json({
            success: false,
            message: "Admin access required"
        })
    }

        next()
        
    } catch (error) {
        console.error('Authentication error', error.message);
        
        return res.status(401).json({
            success: false,
            message : error.message ||"Token expired"
        })
    } 
}

module.exports = {
    authenticate,
    adminAccess
};

