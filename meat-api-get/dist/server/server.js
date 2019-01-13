"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const restify = require("restify");
const environment_1 = require("../common/environment");
class Server {
    initRoutes(routers) {
        return new Promise((resolve, reject) => {
            try {
                // criando server com restify
                this.application = restify.createServer({
                    name: 'meat-api',
                    version: '1.0.0'
                });
                // plugin para fornecer parametros da url
                this.application.use(restify.plugins.queryParser()); // acionado a todo momento
                // routes
                for (let router of routers) {
                    router.applyRoutes(this.application);
                }
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
    bootstrap(routers = []) {
        return this.initRoutes(routers).then(() => this);
    }
}
exports.Server = Server;
//# sourceMappingURL=server.js.map