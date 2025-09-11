// JavaScript source code
'use strict';

const Hapi = require('@hapi/hapi');
const Joi = require('@hapi/joi')
const path = require('path')
const fs = require('fs')

const routes = []
const routesPath = path.join(__dirname, "routes")
fs.readdirSync(routesPath).forEach((file) => {
    if (file !== "index.js") {
        const variable2 = require(path.join(routesPath, file))
        routes.push(...variable2)
    }
})

const init = async () => {

    const server = Hapi.server({
        port: 3000,
        host: 'localhost'
    });

    server.route(routes)
   

    await server.start();
    console.log('Server running on %s', server.info.uri);
};

process.on('unhandledRejection', (err) => {

    console.log(err);
    process.exit(1);
});

init();


