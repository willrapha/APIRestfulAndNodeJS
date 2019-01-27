"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const model_router_1 = require("../common/model-router");
const reviews_model_1 = require("./reviews.model");
class ReviewsRouter extends model_router_1.ModelRouter {
    constructor() {
        super(reviews_model_1.Review);
    }
    /*  podemos sobrescrever o metodo ou utilizar DocumentQuery
        findById = (req, resp, next) => {
        this.model.findById(req.params.id)
            .populate('user', 'name') // populamos o 'user' porem so o campo 'name'
            .populate('restaurant') // populamos todo o objeto restaurant
            .then(this.render(resp,next))
            .catch(next);
    } */
    // DocumentQuery - que foi sobrescrito de nosso ModelRouter
    prepareOne(query) {
        return query.populate('user', 'name')
            .populate('restaurant', 'name');
    }
    applyRoutes(application) {
        // Rotas
        application.get('/reviews', this.findAll);
        application.get('/reviews/:id', [this.validateId, this.findById]);
        application.post('/reviews', this.save);
    }
}
exports.reviewsRouter = new ReviewsRouter();
//# sourceMappingURL=reviews.router.js.map