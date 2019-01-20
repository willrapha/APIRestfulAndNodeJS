"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const events_1 = require("events");
class Router extends events_1.EventEmitter {
    render(response, next) {
        return (document) => {
            this.emit('beforeRender', document); // Emitimos um evento com nosso documento
            if (document) {
                response.json(document);
            }
            else {
                response.send(404);
            }
            return next();
        };
    }
}
exports.Router = Router;
//# sourceMappingURL=router.js.map