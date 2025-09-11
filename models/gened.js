const Joi = require('@hapi/joi');

module.exports = [
    {
        method: "GET",
        path: "/gened/{category_code}",
        handler: (request, h) => {
            return request.params.category_code
        }
    }
]