import { Server } from "./server/server"
import { usersRouter } from "./users/users.router";
import { restaurantsRouter } from './restaurants/restaurants.router';

const server = new Server();
server.bootstrap([usersRouter, restaurantsRouter]).then(server => {
    console.log('Server esta ouvindo no endereço:', server.application.address())
}).catch(error => {
    console.log('O servidor falhou ao iniciar')
    console.log(error)
    process.exit(1) // matamos o servidor
})
