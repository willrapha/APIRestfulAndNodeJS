"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const restify = require("restify");
// criando server com restify
const server = restify.createServer({
    name: 'meat-api',
    version: '1.0.0'
});
// plugin para fornecer parametros da url
server.use(restify.plugins.queryParser()); // acionado a todo momento
// É possivel ter um array de callback
server.get('/info', [
    (req, resp, next) => {
        if (req.userAgent() && req.userAgent().includes('MSIE 7.0')) {
            // resp.status(400)
            // resp.json({ message: 'Por favor, atualizar seu navegador' })
            // É possivel passar um objeto de erro para o next
            let error = new Error();
            error.statusCode = 400;
            error.message = 'Por favor, atualizar seu navegador';
            return next(error);
            // return next(false) // não faz a chamada das outras callback
        }
        return next(); // vai para proxima callback
    },
    (req, resp, next) => {
        // .json - esse metodo seta contentType para json e faz o send
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
server.listen(3000, () => {
    console.log('API is running on http://localhost:3000');
});
//# sourceMappingURL=main.js.map