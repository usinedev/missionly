const ReviewService = require('../services/ReviewService')

class ReviewController {
    static async getUserReviews(req, res) {
        try {
            const id = req.params.id

            const reviews = await ReviewService.getUserReviews(id)
            res.status(200).json(reviews)
        } catch (error) {
                        res.status(401).json({message: error.message})   

        }
    }
    static async create(req, res) {
        try {
            const headers = req.headers.authorization
            const token = headers.split(" ")[1]
            const info = req.body
            console.log(token);
            
            const newReviews = await ReviewService.create(token, info.content, info.note, info.user)
            res.status(200).json(newReviews)
        } catch (error) {
                        res.status(401).json({message: error.message})   

        }

    }
    static async update(req, res) {
try {
            const id = req.params.id
            const allUpdate = req.body
            const reviews = await ReviewService.update(allUpdate, id)
            res.status(200).json(reviews)
        } catch (error) {
                        res.status(401).json({message: error.message})   

        }
    } 
    static async delete(req, res) {
try {
            const id = req.params.id
            const reviews = await ReviewService.delete(id)
            res.status(200).json(reviews)
        } catch (error) {
                        res.status(401).json({message: error.message})   

        }
    }
}

module.exports = ReviewController