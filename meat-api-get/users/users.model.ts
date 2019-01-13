const users = [
    {name:'Perter Parker', email: 'perter@marvel.com'},
    {name:'Bruce Wayne', email: 'bruce@dc.com'}
]

export class User {
    static findAll(): Promise<any[]>{
        return Promise.resolve(users)
    }
}