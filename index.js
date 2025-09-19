// JavaScript source code
'use strict';


const Hapi = require('@hapi/hapi');
const Joi = require('@hapi/joi')
const path = require('path')
const fs = require('fs')
const coursesRoutes = require('./routes/courses')

const routes = []
const routesPath = path.join(__dirname, "routes")
fs.readdirSync(routesPath).forEach((file) => {
    if (file !== "index.js") {
        routes.push(...require(path.join(routesPath, file)))
    }
})

const init = async () => {

    const server = Hapi.server({
        port: 3000,
        host: 'localhost'
    });

    server.route(coursesRoutes)
   

    await server.start();
    console.log('Server running on %s', server.info.uri);


};

process.on('unhandledRejection', (err) => {

    console.log(err);
    process.exit(1);
});

init();


