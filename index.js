// JavaScript source code
'use strict';

const Hapi = require('@hapi/hapi');

const init = async () => {

    const server = Hapi.server({
        port: 3000,
        host: 'localhost'
    });

    server.route({
        method: 'GET',
        path: '/',
        handler: function (request, h) {
            if (request.query.name === undefined) {
                return 'Hello World!, Include a name query paramter ';
            }
            else {
                return `Hello ${request.query.name}!`;
            }
            
        }
    });


    server.route({
        method: 'POST',
        path: '/',
        handler: function (request, h) {
            const payload = request.payload;
            return `Signup successful for ${payload.name} with email ${payload.email}`;
        }
    })

    await server.start();
    console.log('Server running on %s', server.info.uri);
};

process.on('unhandledRejection', (err) => {

    console.log(err);
    process.exit(1);
});

init();


