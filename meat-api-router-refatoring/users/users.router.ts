import { Router } from "../common/router";
import * as restify from 'restify';
import { User } from './users.model';

class UsersRouter extends Router {

    constructor(){
        super();
        this.on('beforeRender', document => {
            document.password = undefined;
            // ou delete document.password;
        })
    }

    applyRoutes(application: restify.Server){

        application.get('/users', (req, resp, next) => {
            User.find().then(this.render(resp,next));
        });
 
        application.get('/users/:id', (req, resp, next) => {
            User.findById(req.params.id).then(this.render(resp,next));
        });

        application.post('/users', (req, resp, next) => {
            // por padrao o restify não faz a conversão body para json por isso adicionado um plugin no server.ts
            let user = new User(req.body);
            user.save().then(this.render(resp,next));
        });

        application.put('/users/:id', (req, resp, next) => {
            const options = {overwrite:true}; // possibilita alterar todo o objeto invés do parcial
            // exec() - chamamos o metodo exec() para executar os comandos e retornar o resultado
            User.update({_id: req.params.id}, req.body, options).exec().then( result => {
                if(result.n){ // se foi atualizado algum documento
                    return <any>User.findById(req.params.id); // outra promisse
                }else{
                    resp.send(404); // nao encontrado
                } 
            }).then(this.render(resp,next)); // tratando segunda promisse
        });

        application.patch('/users/:id', (req, resp, next) => {
            const options = {new : true}; // força o retorno do objeto novo
            // findByIdAndUpdate - retorna o objeto user antes da atualizacao
            User.findByIdAndUpdate(req.params.id, req.body, options).then(this.render(resp,next));
        });

        application.del('/users/:id', (req, resp, next) => {
            // exec() - chamamos o metodo exec() para executar os comandos e retornar o resultado
            User.remove({_id: req.params.id}).exec().then((cmdResult: any) => { 
                if(cmdResult.result.n){ // se foi removido algum documento
                    resp.send(204);
                }{
                    resp.send(404);
                }
                return next();
            });
        });
    };
}
export const usersRouter = new UsersRouter()