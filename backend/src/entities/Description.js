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
    }
})