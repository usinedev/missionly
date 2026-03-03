const { EntitySchema } = require("typeorm");

module.exports = new EntitySchema({
    name : "Review",
    tableName : "reviews",
    columns : {
        id:{
            type: "int",
            primary: true,
            generated : true
        },
    },
    relations: {
        user : {
            target : 'User',
            type : "many-to-one",
            joinColumn : true,
            nullable : false
        }
    }
})