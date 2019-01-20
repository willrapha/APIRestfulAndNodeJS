"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const restify_errors_1 = require("restify-errors");
// ContentType para o verbo Patch
const mpContentType = 'application/merge-patch+json';
// Podemos tipar requests e responses
exports.mergePatchBodyParser = (req, resp, next) => {
    if (req.getContentType() === mpContentType && req.method === 'PATCH') {
        // Guardamos uma copia do nosso body antes do cast
        req.rawBody = req.body;
        try {
            req.body = JSON.parse(req.body); // cast para json
        }
        catch (e) {
            return next(new restify_errors_1.BadRequestError(`Invalid content: ${e.message}`));
        }
    }
    return next();
};
//# sourceMappingURL=merge-patch.parser.js.map