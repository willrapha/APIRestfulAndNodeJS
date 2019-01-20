import * as restify from 'restify';

// ContentType para o verbo Patch
const mpContentType = 'application/merge-patch+json';

// Podemos tipar requests e responses
export const mergePatchBodyParser = (req: restify.Request, resp: restify.Response, next) => {
    if(req.getContentType() === mpContentType && req.method === 'PATCH'){
        // Guardamos uma copia do nosso body antes do cast
        (<any>req).rawBody = req.body;
        try {
            req.body = JSON.parse(req.body); // cast para json
        } catch (e) {
            return next(new Error(`Invalid content: ${e.message}`));
        }
    }
    return next();
}