import { ModelRouter } from '../common/model-router';
import { Review } from './reviews.model';
import * as restify from 'restify';
import * as mongoose from 'mongoose';

class ReviewsRouter extends ModelRouter<Review> {

    constructor(){
        super(Review);
    }

    envelope(document){
        let resource = super.envelope(document);
        const restId = document.restaurant._id ? document.restaurant._id : document.restaurant
        resource._links.restaurant = `restaurants/${restId}`;
        return resource;
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
    protected prepareOne(query: mongoose.DocumentQuery<Review,Review>): mongoose.DocumentQuery<Review,Review> {
        return query.populate('user', 'name')
                    .populate('restaurant', 'name');
    }

    applyRoutes(application: restify.Server){
        // Rotas
        application.get(`${this.basePath}`, this.findAll);
        application.get(`${this.basePath}/:id`, [this.validateId, this.findById]);
        application.post(`${this.basePath}`, this.save);
    }
}
export const reviewsRouter = new ReviewsRouter();