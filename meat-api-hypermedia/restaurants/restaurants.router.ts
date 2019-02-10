import { Restaurant } from './restaurants.model';
import { ModelRouter } from '../common/model-router';
import * as restify from 'restify';
import { NotFoundError } from 'restify-errors';

class RestaurantsRouter extends ModelRouter<Restaurant> {

    constructor(){
        super(Restaurant);
    }

    envelope(document){
        let resource = super.envelope(document);
        resource._links.menu = `${this.basePath}/${resource._id}/menu`;
        return resource;
    }

    // Busca dos menus
    findMenu = (req, resp, next) => {
        // É possivel incluir determinados atributos nos finds em nosso caso 'menu'
        Restaurant.findById(req.params.id, "+menu")
        .then(rest => {
            if(!rest){
                throw new NotFoundError('Restaurant not found')
            }else{
                resp.json(rest.menu);
                return next();
            }
        }).catch(next);
    }

    replaceMenu = (req, resp, next) => {
        Restaurant.findById(req.params.id).then(rest => {
            if(!rest){
                throw new NotFoundError('Restaurant not found')
            }else{
                rest.menu = req.body; // Array de MenuItem
                return rest.save(); // Por usar promisses podemos no inscrever novamente no save
            }
        }).then(rest => {
            resp.json(rest.menu); // resposta
            return next;
        }).catch(next);
    }

    applyRoutes(application: restify.Server){
        // Rotas
        application.get(`${this.basePath}`, this.findAll);
        application.get(`${this.basePath}/:id`, [this.validateId, this.findById]);
        application.post(`${this.basePath}`, this.save);
        application.put(`${this.basePath}/:id`, [this.validateId, this.replace]);
        application.patch(`${this.basePath}/:id`, [this.validateId, this.update]);
        application.del(`${this.basePath}/:id`, [this.validateId, this.delete]);
        application.get(`${this.basePath}/:id/menu`, [this.validateId, this.findMenu]); // Rota especifica
        application.put(`${this.basePath}/:id/menu`, [this.validateId, this.replaceMenu]); // Rota especifica
    }
}
export const restaurantsRouter = new RestaurantsRouter(); // instancia