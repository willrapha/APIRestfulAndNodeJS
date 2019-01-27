"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const validators_1 = require("../common/validators");
const bcrypt = require("bcrypt");
const environment_1 = require("../common/environment");
// Esquema de usuario - serve para informar ao mongoose quais sao os metadados desse documento
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        maxlength: 80,
        minlength: 3
    },
    email: {
        type: String,
        unique: true,
        match: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        required: true
    },
    password: {
        type: String,
        select: false,
        required: true
    },
    gender: {
        type: String,
        required: false,
        enum: ['Male', 'Female'] // Apenas esses valores
    },
    cpf: {
        type: String,
        required: false,
        validate: {
            validator: validators_1.validateCPF,
            message: '{PATH}: Invalid CPF ({VALUE})' // campo template string
        }
    }
});
const hashPassword = (obj, next) => {
    // saltRounds - numero de rounds, ciclos para geração do hash
    bcrypt.hash(obj.password, environment_1.environment.security.saltRounds)
        .then(hash => {
        obj.password = hash;
        next();
    }).catch(next);
};
// assim que essa middleware terminar é chamado o next para seguir o fluxo da aplicação
const saveMiddleware = function (next) {
    const user = this; // o 'this' pode ser o 'documento' ou a 'query' nesse middleware, nesse caso 'Documento'
    if (!user.isModified('password')) {
        next();
    }
    else {
        hashPassword(user, next);
    }
};
const updateMiddleware = function (next) {
    // getUpdate() - objeto com todas as modificações    
    if (!this.getUpdate().password) { // o 'this' pode ser o 'documento' ou a 'query' nesse middleware, nesse caso 'Query'
        next();
    }
    else {
        hashPassword(this.getUpdate(), next);
    }
};
userSchema.pre('save', saveMiddleware); // 'documento'
userSchema.pre('findOneAndUpdate', updateMiddleware); // 'query'
userSchema.pre('update', updateMiddleware); // 'query'
// Parametros - Model Class
// 1 - nome que daremos a model
// 2- o schema
exports.User = mongoose.model('User', userSchema); // Esse que sera exportado
//# sourceMappingURL=users.model.js.map