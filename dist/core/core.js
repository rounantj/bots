"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CoreModule = void 0;
const express_1 = __importDefault(require("express"));
const compression_1 = __importDefault(require("compression"));
const response_1 = __importDefault(require("./handlers/response"));
const router_1 = require("./router/router");
const logger_1 = __importDefault(require("./providers/logger"));
const cors_1 = __importDefault(require("cors"));
const pino = require('pino-http')({
    logger: logger_1.default,
    serializers: {
        req: (req) => ({
            id: req.id,
            method: req.method,
            url: req.url,
        }),
    },
});
class CoreModule {
    constructor() {
        this._express = (0, express_1.default)();
        this.configExpress();
        this.routerModule = new router_1.RouterModule(this._express);
        this.router();
    }
    get express() {
        return this._express;
    }
    getCorsOptions() {
        return {
            allowedHeaders: [
                'Origin',
                'X-Requested-With',
                'Content-Type',
                'queue-token',
                'Accept',
                'X-Access-Token',
                'Authorization',
            ],
            credentials: true,
            methods: 'GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE',
            origin: '*',
            preflightContinue: false,
        };
    }
    configExpress() {
        this._express.disable('x-powered-by');
        this._express.use((0, cors_1.default)(this.getCorsOptions()));
        this._express.use((0, compression_1.default)());
        this._express.use(express_1.default.json({ limit: '5mb' }));
        this._express.use(express_1.default.urlencoded({ extended: true }));
        this._express.use(response_1.default.errorHandlerApi);
        this._express.use(pino);
    }
    router() {
        this.routerModule.exposeRoutes();
    }
}
exports.CoreModule = CoreModule;
