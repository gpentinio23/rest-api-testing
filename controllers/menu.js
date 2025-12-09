const menuService = require("../services/menu")
class MenuController {
    static async  getMenu(request) {
    const { name } = request.query;
    const items = await menuService.getMenu(name);
    return items;
    }

    static async addItem(request) {
        const { name, price, description } = request.payload
        try {
            const result = await menuService.addItem(name, price, description)
            if (result === false) {
                return {error:  `A menu item with the name "${name}" already exists.` }
   
            }
            return result
        }
        catch (err) {
            return {error: err.message}
        }
    }

    static async removeItem(request) {
        const { name } = request.payload
        try {
            const deletedCount = await menuService.removeItem(name)
            if (deletedCount === 0) {
                return { error: `No menu item found with name "${name}".` }
};
            
            return deletedCount
        } catch (err) {
            return {error: err.message}
        }
    }

    static async updateItem(request) {
        const { name, price, description } = request.payload
        try {
            const updatedCount = await menuService.updateItem(menu, price, description)
            if (updatedCount === 0) {
                return { error: `No menu item found to update with name "${name}",` }
            }
            return updatedCount
        } catch (err) {
            return { error: err.message }
        }
    }
}

module.exports = MenuController;