
require("dotenv").config();
console.log("Loaded JWT_SECRET:", process.env.JWT_SECRET);

'use strict';


const Hapi = require('@hapi/hapi');
const Joi = require('@hapi/joi')
const path = require('path')
const fs = require('fs')
const coursesRoutes = require('./routes/courses')
const { Client } = require("pg")
const client = new Client(process.env.CONNECTION_STRING);
console.log(process.env)
const HapiAuthJwt2 = require("hapi-auth-jwt2")

const routes = []
const routesPath = path.join(__dirname, "routes")
fs.readdirSync(routesPath).forEach((file) => {
    if (file !== "index.js") {
        routes.push(...require(path.join(routesPath, file)))
    }
})


const validate = async (decoded, request, h) => {
    const credentials = {
        ...decoded,
        scope: decoded.roles,
    }
    return {
        isValid: true,
        credentials
    }
}

const init = async () => {

    const server = Hapi.server({
        port: 3000,
        host: 'localhost',
    });

   
    await server.register(HapiAuthJwt2);

    const JWT_SECRET = process.env.JWT_SECRET
    if (!JWT_SECRET) {
        throw new Error("JWT_SECRET env var must be set")
    }

    server.auth.strategy("jwt", "jwt",{
        key: JWT_SECRET,
            validate,
            verifyOptions: {
                algorithms: ["HS256"]
        },
        urlKey: false,
        cookieKey:false,
    })



    server.route(routes),

    await server.start();
    console.log('Server running on %s', server.info.uri);


};

process.on('unhandledRejection', (err) => {

    console.log(err);
    process.exit(1);
});

init();


