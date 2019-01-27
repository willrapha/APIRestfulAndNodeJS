import * as restify from 'restify';

export const handleError = (req: restify.Request, resp: restify.Response, err, done) => {
    // O restify procura essa funcao no objeto error
    err.toJSON = () => {
        return {
            message: err.message
        }
    }
    // switch para correção dos status code
    switch(err.name){
        case 'MongoError':
            if(err.code === 11000){
                err.statusCode = 400;
            }
            break
        case 'ValidationError':
            err.statusCode = 400;

            const messages: any[] = [];

            for (let name in err.errors) {
                messages.push({message: err.errors[name].message})
            }
            // nesse caso substituimos novamente o err.toJSON para retornar um array de mensagens
            err.toJSON = () => ({
                errors: messages
            })
            break
    }
    done(); // terminamos o tratamento
}