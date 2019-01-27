import * as mongoose from 'mongoose';
import { Restaurant } from '../restaurants/restaurants.model';
import { User } from '../users/users.model';

// Essa interface não é obrigatoria, apenas de referencia
export interface Review extends mongoose.Document {
    date: Date,
    rating: number,
    comments: string,
    restaurant: mongoose.Types.ObjectId | Restaurant, // Pode ser ObjectId ou Restaurant
    user: mongoose.Types.ObjectId | User // Pode ser ObjectId ou User
}

const reviewSchema = new mongoose.Schema({
    date: {
        type: Date,
        required: true
    },
    rating: {
        type: Number,
        required: true,
        maxlength: 500
    },
    restaurant: {
        type: mongoose.Schema.Types.ObjectId, // Associar a uma outra model
        ref: 'Restaurant', // referencia ao modelo
        required: true 
    },
    user: {
        type: mongoose.Schema.Types.ObjectId, // Apenas nos Schemas
        ref: 'User', // referencia ao modelo
        required: true
    }
})
export const Review = mongoose.model<Review>('Review', reviewSchema);