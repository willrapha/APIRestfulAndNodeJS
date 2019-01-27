"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const router_1 = require("./router");
const restify_errors_1 = require("restify-errors");
class ModelRouter extends router_1.Router {
    constructor(model) {
        super();
        this.model = model;
        // Metodo resposavel por verificar o formato do id se esta valido
        this.validateId = (req, resp, next) => {
            if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
                next(new restify_errors_1.NotFoundError('Document not found'));
            }
            else {
                next();
            }
        };
        this.findAll = (req, resp, next) => {
            this.model.find()
                .then(this.renderAll(resp, next))
                .catch(next);
        };
        this.findById = (req, resp, next) => {
            this.model.findById(req.params.id)
                .then(this.render(resp, next))
                .catch(next);
        };
        this.save = (req, resp, next) => {
            // por padrao o restify não faz a conversão body para json por isso adicionado um plugin no server.ts
            let document = new this.model(req.body);
            document.save()
                .then(this.render(resp, next))
                .catch(next);
        };
        this.replace = (req, resp, next) => {
            // runValidators - por padrao o metodo put pula as nossas validações por isso forçamos elas atraves desse options
            const options = { runValidators: true, overwrite: true }; // overwrite - possibilita alterar todo o objeto invés do parcial
            // exec() - chamamos o metodo exec() para executar os comandos e retornar o resultado
            this.model.update({ _id: req.params.id }, req.body, options).exec().then(result => {
                if (result.n) { // se foi atualizado algum documento
                    return this.model.findById(req.params.id); // outra promisse
                }
                else {
                    throw new restify_errors_1.NotFoundError('Documento não encontrado'); // nao encontrado
                }
            }).then(this.render(resp, next)) // tratando segunda promisse
                .catch(next);
        };
        this.update = (req, resp, next) => {
            // runValidators - por padrao o metodo patch pula as nossas validações por isso forçamos elas atraves desse options
            const options = { runValidators: true, new: true }; // new - força o retorno do objeto atualizado
            // findByIdAndUpdate - retorna o objeto user antes da atualizacao
            this.model.findByIdAndUpdate(req.params.id, req.body, options)
                .then(this.render(resp, next))
                .catch(next);
        };
        this.remove = (req, resp, next) => {
            // exec() - chamamos o metodo exec() para executar os comandos e retornar o resultado
            this.model.remove({ _id: req.params.id }).exec().then((cmdResult) => {
                if (cmdResult.result.n) { // se foi removido algum documento
                    resp.send(204);
                }
                else {
                    throw new restify_errors_1.NotFoundError('Documento não encontrado');
                }
                return next();
            })
                .catch(next);
        };
    }
}
exports.ModelRouter = ModelRouter;
//# sourceMappingURL=model-router.js.map