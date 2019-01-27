"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const events_1 = require("events");
const restify_errors_1 = require("restify-errors");
class Router extends events_1.EventEmitter {
    // Rendenizacao de documento
    render(response, next) {
        return (document) => {
            this.emit('beforeRender', document); // Emitimos um evento com nosso documento
            if (document) {
                response.json(document);
            }
            else {
                throw new restify_errors_1.NotFoundError('Documento não encontrado');
            }
            return next();
        };
    }
    // Rendenizacao de array de documentos - um dos motivos da modificação foi que
    // um array nao tem a propriedade password, mesmo não tendo problema em runtime é melhor fazermos essa separação
    renderAll(response, next) {
        return (documents) => {
            if (documents) {
                documents.forEach(document => {
                    this.emit('beforeRender', document);
                });
                response.json(documents);
            }
            else {
                response.json([]);
            }
        };
    }
}
exports.Router = Router;
//# sourceMappingURL=router.js.map