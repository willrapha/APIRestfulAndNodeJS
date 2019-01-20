"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const router_1 = require("../common/router");
const users_model_1 = require("./users.model");
class UsersRouter extends router_1.Router {
    constructor() {
        super();
        this.on('beforeRender', document => {
            document.password = undefined;
            // ou delete document.password;
        });
    }
    applyRoutes(application) {
        application.get('/users', (req, resp, next) => {
            users_model_1.User.find().then(this.render(resp, next));
        });
        application.get('/users/:id', (req, resp, next) => {
            users_model_1.User.findById(req.params.id).then(this.render(resp, next));
        });
        application.post('/users', (req, resp, next) => {
            // por padrao o restify não faz a conversão body para json por isso adicionado um plugin no server.ts
            let user = new users_model_1.User(req.body);
            user.save().then(this.render(resp, next));
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
            }).then(this.render(resp, next)); // tratando segunda promisse
        });
        application.patch('/users/:id', (req, resp, next) => {
            const options = { new: true }; // força o retorno do objeto novo
            // findByIdAndUpdate - retorna o objeto user antes da atualizacao
            users_model_1.User.findByIdAndUpdate(req.params.id, req.body, options).then(this.render(resp, next));
        });
        application.del('/users/:id', (req, resp, next) => {
            // exec() - chamamos o metodo exec() para executar os comandos e retornar o resultado
            users_model_1.User.remove({ _id: req.params.id }).exec().then((cmdResult) => {
                if (cmdResult.result.n) { // se foi removido algum documento
                    resp.send(204);
                }
                {
                    resp.send(404);
                }
                return next();
            });
        });
    }
    ;
}
exports.usersRouter = new UsersRouter();
//# sourceMappingURL=users.router.js.map