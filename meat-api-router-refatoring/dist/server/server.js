"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const restify = require("restify");
const mongoose = require("mongoose");
const environment_1 = require("../common/environment");
const merge_patch_parser_1 = require("./merge-patch.parser");
const error_handler_1 = require("./error.handler");
class Server {
    initializeDb() {
        // fizemos um cast devido ao erro de typescript
        mongoose.Promise = global.Promise;
        return mongoose.connect(environment_1.environment.db.url, {
            useMongoClient: true
        });
    }
    initRoutes(routers) {
        return new Promise((resolve, reject) => {
            try {
                // criando server com restify
                this.application = restify.createServer({
                    name: 'meat-api',
                    version: '1.0.0'
                });
                // acionados a todo momento
                // por padrao o restify nao faz a conversao das query e do body para json
                // por isso precisamos de utilizar esses plugins para fazer a conversao
                this.application.use(restify.plugins.queryParser());
                this.application.use(restify.plugins.bodyParser());
                this.application.use(merge_patch_parser_1.mergePatchBodyParser); // Para o verbo PATCH
                // routes
                for (let router of routers) {
                    router.applyRoutes(this.application);
                }
                // se nao conseguirmos acesso a porta por nao tratarmos o erro a aplicacao vai parar de funcionar
                this.application.listen(environment_1.environment.server.port, () => {
                    resolve(this.application);
                });
                // Utilizada para o tratamento de erros do restify
                this.application.on('restifyError', error_handler_1.handleError);
            }
            catch (error) {
                reject(error);
            }
        });
    }
    bootstrap(routers = []) {
        // So iniciamos as rotas após ocorrer a conexão com o banco
        return this.initializeDb().then(() => this.initRoutes(routers).then(() => this));
    }
}
exports.Server = Server;
//# sourceMappingURL=server.js.map