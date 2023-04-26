"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const pino_http_1 = __importDefault(require("pino-http"));
const routers_1 = __importDefault(require("./routers"));
const enumStatusCodes_1 = __importDefault(require("./utils/enumStatusCodes"));
const di_1 = require("@decorators/di");
const express_2 = require("@decorators/express");
const logger = (0, pino_http_1.default)({
    customLogLevel: (_req, res, _err) => {
        if (res.statusCode >= 500)
            return 'error';
        if (res.statusCode >= 400)
            return 'warn';
        return 'info';
    },
    level: 'debug',
    serializers: {
        req: (req) => ({
            method: req.method,
            url: req.url,
            params: req.params,
            host: req.headers.host,
        }),
        res: (res) => ({
            statusCode: res.statusCode,
        })
    },
    transport: process.env.NODE_ENV === 'development' ? {
        target: 'pino-pretty',
        options: {
            colorize: true
        }
    } : undefined,
});
const app = (0, express_1.default)();
app.use(logger);
logger.logger.debug('Express initialized! 🚀');
app.use((0, cors_1.default)());
logger.logger.debug('~> CORS enabled.');
app.use(express_1.default.json());
routers_1.default.use(logger);
app.use(routers_1.default);
logger.logger.debug('~> Routers registered!');
app.get("/", (_req, res) => {
    res.send("Veja o ReadMe para rotas disponíveis");
});
const serverErrorMiddleware = (error, _req, res, _next) => {
    var _a;
    logger.logger.error(error);
    return res.status(enumStatusCodes_1.default.INTERNAL_SERVER_ERROR).json({ error: (_a = error.message) !== null && _a !== void 0 ? _a : error });
};
di_1.Container.provide([
    { provide: express_2.ERROR_MIDDLEWARE, useValue: serverErrorMiddleware }
]);
app.use(serverErrorMiddleware);
exports.default = app;
//# sourceMappingURL=app.js.map