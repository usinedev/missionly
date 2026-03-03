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
            type: "varchar"
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
            type:"varchar" // adresse du client ou Distanciel
        },
        price : {
            type : "array" // [priceNumber, priceUnity]
        },
        tags : {
            type : "array"
        },
        status : { // created, published, started, finished
            type: "varchar",
            nullable: false,
            default : ""
        }
    }
})