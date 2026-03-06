const UserService = require('../services/UserService')
const bcrypt = require('bcrypt') 
const jwt = require('jsonwebtoken') 

class UserController {
    static async getUsers(req, res) {
         try {
            let number = req.params.number 
                    
            if (!number) {
                number = "20"
            }
            number = parseInt(number)
            const users = await UserService.getUsers(number)
            res.status(200).json(users)
         } catch (error) {
            if (error.message === "The user doesn't exist") {
                res.status(401).json({message:error.message})
            }
            throw error;
         }
        
    }
    static async getById(req, res) {
        try {            
            const id = req.params.id
            if (!id) {
                return res.status(400).json({message: "An id is necessary"})
            }
            const user = await UserService.getById(id)
            res.status(200).json(user)
        } catch (error) {
            if (error.message === "The user doesn't exist") {
                res.status(401).json({message:error.message})
            }
            throw error;
        }
    }
    static async getByName(req, res) {
        try {            
            const name = req.params.name
            if (!name) {
                return res.status(400).json({message: "An id is necessary"})
            }
            const user = await UserService.getByName(name)
            res.status(200).json(user)
        } catch (error) {
            if (error.message === "The user doesn't exist") {
                res.status(401).json({message:error.message})
            }
            throw error;
        }
    }
    static async update(req, res) {
        try {
            const id = req.params.id
            const allUpdate = req.body
            if (!id) {
                return res.status(400).json({message: "An id is necessary"})
            }
            const bearerToken = req.headers.authorization
            if (!bearerToken || !bearerToken.startsWith('Bearer ')) {
                return res.status(401).json({
                success : false,
                message : 'No token, no access'
            })
             }
            const token = bearerToken.split(' ')[1]
            const user = await UserService.update(id, token, allUpdate)
            res.status(200).json(user)

        } catch (error) {
            if (error.message === "The user doesn't exist") {
                res.status(401).json({message:error.message})
            }
            throw error;
        }
    }
}

module.exports = UserController