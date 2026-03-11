const { EntitySchema } = require("typeorm");

module.exports = new EntitySchema({
    name : "Tag",
    tableName : "tags",
    columns : {
        id: {
            type: 'int',
            primary: true,
            generated: true
        },
        name: {
            type: "varchar",
            nullable: false,
            unique: true
        },
        searchWords: {
            type: "simple-array",
            nullable: false
        }
    },
    relations: {
        mission : {
            target: "Mission",
            type: "many-to-many",
            nullable : false,
            inverseSide: "tags"
        }
    }
})