import * as restify from 'restify';
import * as mongoose from 'mongoose';
import { environment } from '../common/environment';
import { Router } from '../common/router';
import { mergePatchBodyParser } from './merge-patch.parser';

export class Server {

    application: restify.Server;

    initializeDb(): mongoose.MongooseThenable { 
        // fizemos um cast devido ao erro de typescript
        (<any>mongoose).Promise = global.Promise
        return mongoose.connect(environment.db.url, {
            useMongoClient: true
        })
    }

    initRoutes(routers: Router[]): Promise<any>{
        return new Promise((resolve, reject) => {

            try{
                // criando server com restify
                this.application = restify.createServer({
                    name: 'meat-api',
                    version: '1.0.0'
                })

                // acionados a todo momento
                // por padrao o restify nao faz a conversao das query e do body para json
                // por isso precisamos de utilizar esses plugins para fazer a conversao
                this.application.use(restify.plugins.queryParser()) 
                this.application.use(restify.plugins.bodyParser())

                this.application.use(mergePatchBodyParser); // Para o verbo PATCH

                // routes
                for (let router of routers){
                    router.applyRoutes(this.application)
                }

                // se nao conseguimos acesso a porta por nao tratarmos o erro a aplicacao vai parar de funcionar
                this.application.listen(environment.server.port, () =>{
                    resolve(this.application)
                })

            }catch(error){
                reject(error)
            }

        })
    }

    bootstrap(routers: Router[] = []): Promise<Server>{
        // So iniciamos as rotas após ocorrer a conexão com o banco
        return this.initializeDb().then(() => 
            this.initRoutes(routers).then(() => this))
        
    }
}