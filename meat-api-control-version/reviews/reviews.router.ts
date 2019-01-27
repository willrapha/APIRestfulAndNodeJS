import { ModelRouter } from '../common/model-router';
import { Review } from './reviews.model';
import * as restify from 'restify';
import * as mongoose from 'mongoose';

class ReviewsRouter extends ModelRouter<Review> {

    constructor(){
        super(Review);
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
        application.get('/reviews', this.findAll);
        application.get('/reviews/:id', [this.validateId, this.findById]);
        application.post('/reviews', this.save);
    }
}
export const reviewsRouter = new ReviewsRouter();