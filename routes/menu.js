const MenuController = require("../controllers/menu");
const Joi = require("joi");

module.exports = [
    {
        method: "GET",
        path: "/menu",
        options: {
            auth: {
                strategy: "jwt",
                mode:"optional",
            },
            validate: {
                query: Joi.object({
                    name: Joi.string().optional()
                })
            },
        },
        handler: MenuController.getMenu,
        handler: async (request, h) => {
            const data = await MenuController.getMenu(request, h)
            return {
                isAuthenticated: request.auth.isAuthenticated,
                credentials: request.auth.credentials || null,
                data,
            }
        },
    },

    {
        method: "POST",
        path: "/menu/add",
        options: {
            auth: {
                strategy: "jwt",
                scope: ["admin"],
            },
            validate: {
                payload: Joi.object({
                    name: Joi.string().required(),
                    price: Joi.number().required(),
                    description: Joi.string().optional()
                })
            }
        },
        handler: MenuController.addItem,
        handler: async (request, h) => {
            const user = request.auth.credentials
            const result = await MenuController.addItem(request, h)
            return {
                credentials: user,
                result,
            }
        },
    },
    {
        method: "DELETE",
        path: "/menu/{id}",
        options: {
            auth: {
                strategy: "jwt",
                scope:["admin"]
            },
            validate: {
                payload: Joi.object({
                    name:Joi.string().required()
                })
            }
        },
        handler: MenuController.removeItem,
        handler: async (request, h) => {
            const user = request.auth.credentials
            const { id } = request.params
            const result = await MenuController.deleteItem(request, h)
            return {
                credentials: user,
                deletedID: id,
                result
            }
        },
    },
    {
        method: "PUT",
        path: "/menu/{id}",
        options: {
            auth: {
                strategy: "jwt",
                scope:["admin"]
            },
            validate: {
                payload: Joi.object({
                    name: Joi.string().required(),
                    price: Joi.number().required(),
                    description: Joi.string().optional()
                })
            }
        },
        handler: MenuController.updateItem,
        handler: async (request, h) => {
            const user = request.auth.credential
            const { id } = request.params
            const result = await MenuController.updateItem(request, h)
            return {
                credentials: user,
                updatedID: id,
                result
            }
        }
    }
];
