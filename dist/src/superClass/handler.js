"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Handler {
    async TryCatch(serviceFunction) {
        try {
            return await serviceFunction();
        }
        catch (error) {
            if (error instanceof Error)
                throw Error(error.message);
            if (typeof error === 'string')
                throw Error(error);
        }
    }
}
exports.default = Handler;
//# sourceMappingURL=handler.js.map