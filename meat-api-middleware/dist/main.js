"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = require("./server/server");
const users_router_1 = require("./users/users.router");
const server = new server_1.Server();
server.bootstrap([users_router_1.usersRouter]).then(server => {
    console.log('Server esta ouvindo no endereço:', server.application.address());
}).catch(error => {
    console.log('O servidor falhou ao iniciar');
    console.log(error);
    process.exit(1); // matamos o servidor
});
//# sourceMappingURL=main.js.map