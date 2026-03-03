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
            type: "varchar"
        },
        priceUnity : {
            type : "varchar"
        },
        role : {
            type : "varchar",
            nullable : false 
        },
        programs : {
            type: "array"
        }
    },
});