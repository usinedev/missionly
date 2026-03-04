const { EntitySchema } = require("typeorm");

module.exports = new EntitySchema({
    name : "Mission",
    tableName : "missions",
    columns : {
        id:{
            type: "int",
            primary: true,
            generated : true
        },
        name : {
            type: "varchar",
            nullable : false
        },
        createdAt : {
            type: "datetime",
            createDate: true
        },
        start : {
            type: "datetime"
        },
        end : {
            type:"datetime"
        },
        adress : {
            type:"varchar", // adresse du client ou Distanciel,
            nullable : false
        },
        price : {
            type : "array", // [priceNumber, priceUnity],
            nullable : false
        },
        tags : {
            type : "array"
        },
        status : { // created, published, started, finished
            type: "varchar",
            nullable: false,
            default : ""
        }
    },
    relations: {
        user : {
            target : 'User',
            type : "many-to-one",
            joinColumn : true,
            nullable : false
        },
        description : {
            target : 'Description',
            type: 'one-to-one',
            inverseSide : 'mission'
        }
    }
})