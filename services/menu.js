
const Menu = require("../models/menu")

class MenuServices {
    async getMenu(name = "") {

        const query = Menu.query()
            .select("name", "price", "description")
        if (name) {
            const like = `%${name}%`;
            query
                .where("name", "ilike", like)
                .orWhere("description", "ilike", like)
        }

        return await query
    }
    async addItem(name, price, description) {
        const existing = await Menu.query()
            .where("name", "ilike", name)
            .first()
        if (existing) {
            return false
        }
        return await Menu.query().insert({
            name,
            price,
            description
        })
    }
    async removeItem(name) {
        const deletedCount = await Menu.query()
            .delete()
            .whereRaw("LOWER(name)=LOWER(?)", [name])

            return deletedCount
    }

    async updateItem(name, price, description) {
        const updatedCount = await Menu.query()
            .patch({
                name,
                price,
                description,
            })
            .whereRaw("LOWER(name) = LOWER(?)", [name]);
            return updatedCount
    }
    }


module.exports = new MenuServices()