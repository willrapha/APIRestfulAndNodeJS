import * as restify from 'restify';
import { User } from './users.model';
import { ModelRouter } from '../common/model-router';

class UsersRouter extends ModelRouter<User> {

    constructor(){
        super(User);
        this.on('beforeRender', document => {
            document.password = undefined;
        })
    }

    applyRoutes(application: restify.Server){
        // Rotas
        application.get('/users', this.findAll);
        application.get('/users/:id', [this.validateId, this.findById]);
        application.post('/users', this.save);
        application.put('/users/:id', [this.validateId, this.replace]);
        application.patch('/users/:id', [this.validateId, this.update]);
        application.del('/users/:id', [this.validateId, this.delete]);
    };
}
export const usersRouter = new UsersRouter()