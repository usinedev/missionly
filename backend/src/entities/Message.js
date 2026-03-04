const { EntitySchema } = require("typeorm");

module.exports = new EntitySchema({
    name : "Message",
    tableName : "messages",
    columns : {
        id:{
            type: "int",
            primary: true,
            generated : true
        },
        content : {
            type : 'varchar',
            nullable: false
        },
        date : {
            type : 'datetime',
            nullable : false
        },
        room : {
            type : 'varchar'
        }
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