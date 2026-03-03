const { EntitySchema } = require("typeorm");

module.exports = new EntitySchema({

    name: "User",
    tableName: "users",
    columns: {
        id: {
            type: "int",
            primary: true,
            generated: true
        },
        userName: {
            type: "varchar",
            length: "100",
            nullable: false
        },
        email: {
            type: "varchar",
            length: 255,
            unique: true,
            nullable: false
        },
        password: {
            type: "varchar",
            length: 255,
            nullable: false
        },
        createdAt: {
            type: "datetime",
            createDate: true
        },
        updatedAt: {
            type: "datetime",
            updateDate: true
        },
        langage : {
            type: "varchar",
            default : "ENG" // ENG, FR, NL, ...
        },
        priceUnity : {
            type : "varchar",
            default : "euro" // euro, dollar, yen, ...
        },
        role : { // admin, freelance, society, accountant (comptable)
            type : "varchar",
            nullable : false 
        },
        programs : {
            type: "array"
        },
        TVAnumber : {
            type: "varchar",
            nullable : false
        }
    },
    relations: {
        mission : {
            target: "Mission",
            type: 'one-to-many',
            inverseSide : "user"
        },
        message : {
            target : "Message",
            type : 'one-to-many',
            inverseSide: 'user'
        },
        review : {
            target : "Review",
            type : 'one-to-many',
            inverseSide : 'user'
        }
    }
});