"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleError = (req, resp, err, done) => {
    // O restify procura essa funcao no objeto error
    err.toJSON = () => {
        return {
            message: err.message
        };
    };
    // switch para correção dos status code
    switch (err.name) {
        case 'MongoError':
            if (err.code === 11000) {
                err.statusCode = 400;
            }
            break;
        case 'ValidationError':
            err.statusCode = 400;
            break;
    }
    done(); // terminamos o tratamento
};
//# sourceMappingURL=error.handler.js.map