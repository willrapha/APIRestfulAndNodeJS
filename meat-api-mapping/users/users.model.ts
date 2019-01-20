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

})
// Parametros - Model Class
// 1 - nome que daremos a model
// 2- o schema
export const User = mongoose.model<User>('User', userSchema) // Esse que sera exportado