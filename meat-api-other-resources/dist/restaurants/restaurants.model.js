"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const menuSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    }
});
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
});
// Colecao e modelo, por definirmos o modelo com o nome 'Restaurant' a colecao sempre adota o nome do modelo no plural
exports.Restaurant = mongoose.model('Restaurant', restShema);
//# sourceMappingURL=restaurants.model.js.map