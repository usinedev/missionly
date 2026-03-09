const { DataSource } = require('typeorm')
const User = require('../entities/User.js')
const Message = require('../entities/Message.js')
const Mission = require('../entities/Mission.js')
const Description = require('../entities/Description.js')
const Review = require('../entities/Review.js')

const AppDataSource = new DataSource({
    type: 'sqlite',
    database: 'database.sqlite',
    synchronize: true,
    logging: false,
    entities: [User, Message, Mission, Description, Review],
})



module.exports = AppDataSource