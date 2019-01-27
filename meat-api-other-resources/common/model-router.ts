import * as mongoose from 'mongoose';
import { Router } from './router';
import { NotFoundError } from 'restify-errors';

export abstract class ModelRouter<D extends mongoose.Document> extends Router {

    constructor(protected model: mongoose.Model<D>){
        super();
    }

    // <D,D> - tipos associados a DocumentQuery, trabalha com um tipo e retorna um tipo
    protected prepareOne(query: mongoose.DocumentQuery<D,D>): mongoose.DocumentQuery<D,D> {
        return query;
    }

    // Metodo resposavel por verificar o formato do id se esta valido
    validateId = (req, resp, next) => {
        if(!mongoose.Types.ObjectId.isValid(req.params.id)){
            next(new NotFoundError('Document not found'))
        }else{
            next()
        }
    }

    // utilizamos IronFunction porque em runtime iriamos perder a referencia na chamada o 'this.model'
    findAll = (req, resp, next) => {
        this.model.find() // this.model
            .then(this.renderAll(resp,next))
            .catch(next);
    }

    findById = (req, resp, next) => {
        this.prepareOne(this.model.findById(req.params.id)) // prepareOne - DocumentQuery
            .then(this.render(resp,next))
            .catch(next);
    }

    save = (req, resp, next) => {
        // por padrao o restify não faz a conversão body para json por isso adicionado um plugin no server.ts
        let document = new this.model(req.body);
        document.save()
            .then(this.render(resp,next))
            .catch(next);
    }

    replace = (req, resp, next) => {
        // runValidators - por padrao o metodo put pula as nossas validações por isso forçamos elas atraves desse options
        const options = {runValidators:true, overwrite:true}; // overwrite - possibilita alterar todo o objeto invés do parcial
        // exec() - chamamos o metodo exec() para executar os comandos e retornar o resultado
        this.model.update({_id: req.params.id}, req.body, options).exec().then( result => {
            if(result.n){ // se foi atualizado algum documento
                return <any> this.model.findById(req.params.id); // outra promisse
            }else{
                throw new NotFoundError('Documento não encontrado') // nao encontrado
            } 
        }).then(this.render(resp,next)) // tratando segunda promisse
          .catch(next);  
    }

    update = (req, resp, next) => {
        // runValidators - por padrao o metodo patch pula as nossas validações por isso forçamos elas atraves desse options
        const options = {runValidators:true, new : true}; // new - força o retorno do objeto atualizado
        // findByIdAndUpdate - retorna o objeto user antes da atualizacao
        this.model.findByIdAndUpdate(req.params.id, req.body, options)
            .then(this.render(resp,next))
            .catch(next);
    }

    delete = (req, resp, next) => {
        // exec() - chamamos o metodo exec() para executar os comandos e retornar o resultado
        this.model.remove({_id: req.params.id}).exec().then((cmdResult: any) => { 
            if(cmdResult.result.n){ // se foi removido algum documento
                resp.send(204);
            }else{
                throw new NotFoundError('Documento não encontrado');
            }
            return next();
        })
        .catch(next);
    }
} 