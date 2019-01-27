import * as mongoose from 'mongoose';
import { validateCPF } from '../common/validators';
import * as bcrypt from 'bcrypt';
import { environment } from '../common/environment';

// extendemos o mongoose.Document para pegar as propriedades padroes de um documento mongoose
// interface apenas para controle estatico
export interface User extends mongoose.Document {
    name: string,
    email: string,
    password: string
}

// Necessario para checagem do typescript 
export interface UserModel extends mongoose.Model<User>{
    findByEmail(email:string): Promise<User>;
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
    },
    cpf: {
        type: String,
        required: false,
        validate: { // validador personalizado
            validator: validateCPF,
            message: '{PATH}: Invalid CPF ({VALUE})' // campo template string
        }
    }
})

// nao recomendado o IronFunctions
// statics - podemos adicionar metodos
userSchema.statics.findByEmail = function(email: string){
    return this.findOne({email}) // {email: email}
}

const hashPassword = (obj, next) => {
    // saltRounds - numero de rounds, ciclos para geração do hash
    bcrypt.hash(obj.password, environment.security.saltRounds)
    .then(hash => {
        obj.password = hash;
        next();
    }).catch(next); 
}

// assim que essa middleware terminar é chamado o next para seguir o fluxo da aplicação
const saveMiddleware = function(next){ // não utilizamos as ironfunctions devido ela bugar a funcionalidade do 'this'
    const user: User = this; // o 'this' pode ser o 'documento' ou a 'query' nesse middleware, nesse caso 'Documento'
    if(!user.isModified('password')){
        next();
    }else{
        hashPassword(user, next);
    }
};

const updateMiddleware = function(next){ // não utilizamos as ironfunctions devido ela bugar a funcionalidade do 'this'
// getUpdate() - objeto com todas as modificações    
if(!this.getUpdate().password){ // o 'this' pode ser o 'documento' ou a 'query' nesse middleware, nesse caso 'Query'
        next();
    }else{
        hashPassword(this.getUpdate(), next);
    }
};

userSchema.pre('save', saveMiddleware); // 'documento'
userSchema.pre('findOneAndUpdate', updateMiddleware); // 'query'
userSchema.pre('update', updateMiddleware); // 'query'

// Parametros - Model Class
// 1 - nome que daremos a model
// 2- o schema
export const User = mongoose.model<User, UserModel>('User', userSchema) // Esse que sera exportado