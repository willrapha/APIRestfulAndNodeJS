import * as mongoose from 'mongoose';

// extendemos o mongoose.Document para pegar as propriedades padroes de um documento mongoose
// interface apenas para controle estatico
export interface User extends mongoose.Document {
    name: string,
    email: string,
    password: string
}

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
        select: false, // indica que nao precisamos trazer esse campo por padrao
        required: true
    },
    gender: {
        type: String,
        required: false,
        enum: ['Male', 'Female'] // Apenas esses valores
    }

})
// Parametros - Model Class
// 1 - nome que daremos a model
// 2- o schema
export const User = mongoose.model<User>('User', userSchema) // Esse que sera exportado