"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const restify = require("restify");
const environment_1 = require("../common/environment");
class Server {
    initRoutes() {
        return new Promise((resolve, reject) => {
            try {
                // criando server com restify
                this.application = restify.createServer({
                    name: 'meat-api',
                    version: '1.0.0'
                });
                // plugin para fornecer parametros da url
                this.application.use(restify.plugins.queryParser()); // acionado a todo momento
                // ---------------routes--------------
                this.application.get('/info', [
                    (req, resp, next) => {
                        if (req.userAgent() && req.userAgent().includes('MSIE 7.0')) {
                            let error = new Error();
                            error.statusCode = 400;
                            error.message = 'Por favor, atualizar seu navegador';
                            return next(error);
                        }
                        return next(); // vai para proxima callback
                    },
                    (req, resp, next) => {
                        resp.json({
                            browser: req.userAgent(),
                            method: req.method,
                            url: req.href(),
                            path: req.path(),
                            query: req.query // query strings utilizadas na url
                        });
                        return next(); // sempre no final para indicarmos que terminamos de processar o request
                    }
                ]);
                // ------------end routes-------------------
                // se nao conseguimos acesso a porta por nao tratarmos o erro a aplicacao vai parar de funcionar
                this.application.listen(environment_1.environment.server.port, () => {
                    resolve(this.application);
                });
            }
            catch (error) {
                reject(error);
            }
        });
    }
    bootstrap() {
        return this.initRoutes().then(() => this);
    }
}
exports.Server = Server;
//# sourceMappingURL=server.js.map