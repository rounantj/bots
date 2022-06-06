"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Server = void 0;
const http = __importStar(require("http"));
const core_1 = require("../core/core");
const logger_1 = __importDefault(require("../core/providers/logger"));
const { serverPort } = require('../core/config/env');
class Server {
    constructor(databaseConnector) {
        if (databaseConnector) {
            this.db = databaseConnector;
            this.app = new core_1.CoreModule().express;
            this.syncDB();
        }
    }
    syncDB() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const syncData = yield this.db.sync();
                this.dbSyncHandler(syncData);
            }
            catch (error) {
                this.dbSyncErrorHandler(error);
            }
        });
    }
    dbSyncHandler(dbInfo) {
        logger_1.default.debug(dbInfo);
        this.upServer();
    }
    dbSyncErrorHandler(error) {
        logger_1.default.error(`Failed on connect database: ${error}`);
        this.upServer();
    }
    upServer() {
        http
            .createServer(this.app)
            .listen(serverPort)
            .on('listening', this.onServerUp.bind(this, serverPort))
            .on('error', this.onServerStartUpError.bind(this));
    }
    onServerUp(port) {
        logger_1.default.info(`Server up and running on port: ${port} `);
    }
    onServerStartUpError(error) {
        logger_1.default.error(`Error: ${error}`);
    }
}
exports.Server = Server;
