import { Restaurant } from './restaurants.model';
import { ModelRouter } from '../common/model-router';
import * as restify from 'restify';
import { NotFoundError } from 'restify-errors';

class RestaurantsRouter extends ModelRouter<Restaurant> {

    constructor(){
        super(Restaurant);
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
        application.get('/restaurants', this.findAll);
        application.get('/restaurants/:id', [this.validateId, this.findById]);
        application.post('/restaurants', this.save);
        application.put('/restaurants/:id', [this.validateId, this.replace]);
        application.patch('/restaurants/:id', [this.validateId, this.update]);
        application.del('/restaurants/:id', [this.validateId, this.remove]);
        application.get('/restaurants/:id/menu', [this.validateId, this.findMenu]); // Rota especifica
        application.put('/restaurants/:id/menu', [this.validateId, this.replaceMenu]); // Rota especifica
    }
}
export const restaurantsRouter = new RestaurantsRouter(); // instancia