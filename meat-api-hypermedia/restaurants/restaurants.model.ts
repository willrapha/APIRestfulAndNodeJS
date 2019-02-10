import * as mongoose from 'mongoose';

export interface MenuItem extends mongoose.Document {
    name: string,
    price: number
}

export interface Restaurant extends mongoose.Document {
    name: string,
    menu: MenuItem[]
}

const menuSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    }
})

const restShema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    menu: {
        type: [menuSchema],
        required: false,
        select: false,
        default: []
    }
})
// Colecao e modelo, por definirmos o modelo com o nome 'Restaurant' a colecao sempre adota o nome do modelo no plural
export const Restaurant = mongoose.model<Restaurant>('Restaurant', restShema);