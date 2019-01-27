"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const restaurants_model_1 = require("./restaurants.model");
const model_router_1 = require("../common/model-router");
const restify_errors_1 = require("restify-errors");
class RestaurantsRouter extends model_router_1.ModelRouter {
    constructor() {
        super(restaurants_model_1.Restaurant);
        // Busca dos menus
        this.findMenu = (req, resp, next) => {
            // É possivel incluir determinados atributos nos finds em nosso caso 'menu'
            restaurants_model_1.Restaurant.findById(req.params.id, "+menu")
                .then(rest => {
                if (!rest) {
                    throw new restify_errors_1.NotFoundError('Restaurant not found');
                }
                else {
                    resp.json(rest.menu);
                    return next();
                }
            }).catch(next);
        };
        this.replaceMenu = (req, resp, next) => {
            restaurants_model_1.Restaurant.findById(req.params.id).then(rest => {
                if (!rest) {
                    throw new restify_errors_1.NotFoundError('Restaurant not found');
                }
                else {
                    rest.menu = req.body; // Array de MenuItem
                    return rest.save(); // Por usar promisses podemos no inscrever novamente no save
                }
            }).then(rest => {
                resp.json(rest.menu); // resposta
                return next;
            }).catch(next);
        };
    }
    applyRoutes(application) {
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
exports.restaurantsRouter = new RestaurantsRouter(); // instancia
//# sourceMappingURL=restaurants.router.js.map