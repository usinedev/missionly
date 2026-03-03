const { EntitySchema } = require("typeorm");

module.exports = new EntitySchema({
    name : "Description",
    tableName : "descriptions",
    columns : {
        id:{
            type: "int",
            primary: true,
            generated : true
        },
        summary : {
            type: 'varchar',
            nullable : true
        },
        context : {
            type: 'varchar',
            nullable : true
        },
        goals : {
            type: 'varchar',
            nullable : true
        },
        skills : {
            type: 'varchar',
            nullable : true
        },
        desiredProfile : {
            type: 'varchar',
            nullable : true
        },
        conditions : {
            type: 'varchar',
            nullable : true
        },
    },
    relations : {
        mission : {
            target : "Mission",
            type : 'one-to-one',
            nullable : false,
            joinColumn: true    
        }
    }
})