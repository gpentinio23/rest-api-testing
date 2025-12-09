console.log("===USING THIS MENU MODEL===", __filename)
const { Model } = require("objection")
const knexconfig = require("../knexfile").development
const Knex = require("knex")(knexconfig)
Model.knex(Knex)

class Menu extends Model {
    static get tableName() {
        return "molloyeats.menu";
    }
    static get idColumn() {
        return "keyID"
    }

    static get jsonSchema() {
        return {
            type: "object",
            required: ["name", "price"],
            properties: {
                id: { type: "integer" },
                name: { type: "string", minLength: 1, maxLength: 255 },
                price: { type: ["number", "string"] },
                description: { type: ["string", "null"], maxLength: 500 }
            }
        };
    }
}


module.exports = Menu