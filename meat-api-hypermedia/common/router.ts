import * as restify from 'restify';
import { EventEmitter } from 'events';
import { NotFoundError } from 'restify-errors';

export abstract class Router extends EventEmitter {
    abstract applyRoutes(application: restify.Server)

    envelope(document: any): any {
        return document;
    }

    // Rendenizacao de documento
    render(response: restify.Response, next: restify.Next){
        return (document) => {
            this.emit('beforeRender', document); // Emitimos um evento com nosso documento
            if(document){
                response.json(this.envelope(document));
            }else{
                throw new NotFoundError('Documento não encontrado');
            }
            return next();
        }
    }

    // Rendenizacao de array de documentos - um dos motivos da modificação foi que
    // um array nao tem a propriedade password, mesmo não tendo problema em runtime é melhor fazermos essa separação
    renderAll(response: restify.Response, next: restify.Next){
        return (documents: any[]) => {
            if(documents){
                documents.forEach((document, index, array) => { // O forEach tbm possui opções como 'index' e 'array'
                    this.emit('beforeRender', document)
                    array[index] = this.envelope(document)
                })
                response.json(documents)
            }else{
                response.json([])
            }
            return next();
        }
    }
}