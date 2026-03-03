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
    }
})