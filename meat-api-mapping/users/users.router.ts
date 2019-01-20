import { Router } from "../common/router";
import * as restify from 'restify';
import { User } from './users.model';

class UsersRouter extends Router {

    applyRoutes(application: restify.Server){

        application.get('/users', (req, resp, next) => {
            User.find().then(users => {
                resp.json(users);
                return next();
            })
        });

        application.get('/users/:id', (req, resp, next) => {
            User.findById(req.params.id).then(user => {
                if(user){
                    resp.json(user);
                    return next();
                }

                resp.send(404);
                return next();
            })
        });

        application.post('/users', (req, resp, next) => {
            // por padrao o restify não faz a conversão body para json por isso adicionado um plugin no server.ts
            let user = new User(req.body);
            
            user.save().then(user => { // o metodo save() retorna uma promisse
                user.password  = undefined; // limpamos o passwrod para nao ser mostrado na resposta
                resp.json(user);
                return next();
            });
        });

    }
}

export const usersRouter = new UsersRouter()