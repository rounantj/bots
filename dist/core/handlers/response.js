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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const HTTPStatus = __importStar(require("http-status"));
const logger_1 = __importDefault(require("../providers/logger"));
class ResponseHandlers {
    onError(res, message, err) {
        logger_1.default.error(`Error: ${err}`);
        return res.status(HTTPStatus.INTERNAL_SERVER_ERROR).send(message);
    }
    onSuccess(res, data) {
        return res.status(HTTPStatus.OK).json({ payload: data });
    }
    errorHandlerApi(err, req, res, next) {
        logger_1.default.error(`Api Error foi executada: ${err}`);
        return res.status(HTTPStatus.INTERNAL_SERVER_ERROR).json({
            errorCode: 'ERR-001',
            message: 'API error',
        });
    }
    dbErrorHandler(res, err) {
        logger_1.default.error(`Um erro aconteceu: ${err}`);
        return res.status(HTTPStatus.INTERNAL_SERVER_ERROR).json({
            code: 'ERR-002',
            message: 'DB error',
        });
    }
}
exports.default = new ResponseHandlers();
