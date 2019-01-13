"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const restify = require("restify");
// criando server com restify
const server = restify.createServer({
    name: 'meat-api',
    version: '1.0.0'
});
// req - dados do request
// resp - utilizado para resposta
// next - após terminar a callback
server.get('/hello', (req, resp, next) => {
    resp.json({
        message: 'hello'
    });
    return next(); // sempre no final para indicarmos que terminamos de processar o request
});
server.listen(3000, () => {
    console.log('API is running on http://localhost:3000');
});
//# sourceMappingURL=main.js.map