const jwt = require('jsonwebtoken');
const UserService = require('../services/UserService');

const authenticate = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization
        console.log(authHeader);
        
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({
                success : false,
                message : 'No token, no access'
            })
        }
        
        const token = authHeader.split(' ')[1]
        console.log(token);
        
        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret') 
        console.log(decoded);
        console.log("post decoded");
        
        
    
        const user = await UserService.getById(decoded.id)
        
        if (!user) {
            return res.status(401).json({
                success: false,
                message: 'User not found'
            })
        }

        req.user = user
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

