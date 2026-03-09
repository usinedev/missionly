const AppDataSource = require('../config/database.js')
const jwt = require('jsonwebtoken')

class ReviewService {
    static async getUserReviews(_id) {
        const ReviewRepository = AppDataSource.getRepository('Review')

        const reviews = await ReviewRepository.find({where : {user : {id: _id}}})
        return reviews
    }
    static async create(token, content, note, user) {
        const ReviewRepository = AppDataSource.getRepository('Review')

        const infoUser = jwt.verify(token, process.env.JWT_SECRET || "secret")
        console.log(infoUser);
        const creator = infoUser.id
        console.log(creator);
        

        const review = await ReviewRepository.create({
            content, note, creator, user
        })
        return ReviewRepository.save(review)
    }
    static async update(allUpdate, _id) {
        const ReviewRepository = AppDataSource.getRepository('Review')

        const reviewUpdate = await ReviewRepository.findOne({where : {id : _id}})
        reviewUpdate.note = allUpdate.note ?? reviewUpdate.note
        reviewUpdate.content = allUpdate.content ?? reviewUpdate.content

        await ReviewRepository.save(reviewUpdate)
        return reviewUpdate
    } 
    static async delete(id) {
        const ReviewRepository = AppDataSource.getRepository('Review')

    }
}

module.exports = ReviewService