"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
// Esquema de usuario - serve para informar ao mongoose quais sao os metadados desse documento
const userSchema = new mongoose.Schema({
    name: {
        type: String
    },
    email: {
        type: String,
        unique: true
    },
    password: {
        type: String,
        select: false // indica que nao precisamos trazer esse campo por padrao
    }
});
// Parametros - Model Class
// 1 - nome que daremos a model
// 2- o schema
exports.User = mongoose.model('User', userSchema); // Esse que sera exportado
//# sourceMappingURL=users.model.js.map