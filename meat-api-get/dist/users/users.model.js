"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const users = [
    { name: 'Perter Parker', email: 'perter@marvel.com' },
    { name: 'Bruce Wayne', email: 'bruce@dc.com' }
];
class User {
    static findAll() {
        return Promise.resolve(users);
    }
}
exports.User = User;
//# sourceMappingURL=users.model.js.map