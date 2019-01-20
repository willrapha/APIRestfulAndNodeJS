"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const router_1 = require("../common/router");
const users_model_1 = require("./users.model");
class UsersRouter extends router_1.Router {
    applyRoutes(application) {
        application.get('/users', (req, resp, next) => {
            users_model_1.User.find().then(users => {
                resp.json(users);
                return next();
            });
        });
        application.get('/users/:id', (req, resp, next) => {
            users_model_1.User.findById(req.params.id).then(user => {
                if (user) {
                    resp.json(user);
                    return next();
                }
                resp.send(404);
                return next();
            });
        });
        application.post('/users', (req, resp, next) => {
            // por padrao o restify não faz a conversão body para json por isso adicionado um plugin no server.ts
            let user = new users_model_1.User(req.body);
            user.save().then(user => {
                user.password = undefined; // limpamos o passwrod para nao ser mostrado na resposta
                resp.json(user);
                return next();
            });
        });
        application.put('/users/:id', (req, resp, next) => {
            const options = { overwrite: true }; // possibilita alterar todo o objeto invés do parcial
            // exec() - chamamos o metodo exec() para executar os comandos e retornar o resultado
            users_model_1.User.update({ _id: req.params.id }, req.body, options).exec().then(result => {
                if (result.n) { // se foi atualizado algum documento
                    return users_model_1.User.findById(req.params.id); // outra promisse
                }
                else {
                    resp.send(404); // nao encontrado
                }
            }).then(user => {
                resp.json(user);
                return next();
            });
        });
    }
}
exports.usersRouter = new UsersRouter();
//# sourceMappingURL=users.router.js.map