import { Server } from "./server/server"
import { usersRouter } from "./users/users.router";
import { restaurantsRouter } from './restaurants/restaurants.router';
import { reviewsRouter } from './reviews/reviews.router';
import { mainRouter } from './main.router';

const server = new Server();
server.bootstrap([mainRouter, usersRouter, restaurantsRouter, reviewsRouter]).then(server => {
    console.log('Server esta ouvindo no endereço:', server.application.address())
}).catch(error => {
    console.log('O servidor falhou ao iniciar')
    console.log(error)
    process.exit(1) // matamos o servidor
})
