"use strict";
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
exports.TesteRouter = void 0;
const base_router_module_1 = require("../../core/router/base-router-module");
const response_1 = __importDefault(require("../../core/handlers/response"));
const response_conversation_1 = __importDefault(require("./models/response-conversation"));
const jwt_simple_1 = require("jwt-simple");
const socket_connection_1 = require("./socket-connection");
const socketConnection = new socket_connection_1.O2OSocket(Number(process.env.SOCKET_PORT));
class TesteRouter extends base_router_module_1.BaseRouterModule {
    constructor() {
        super('teste');
        this.MODULES_ENDPOINT_MAP = {
            [this.moduleName]: {
                post: [
                    {
                        endPoint: `${this.getUrlBase()}/sendMessage`,
                        callback: this.sendMessage,
                        isProtected: false,
                    },
                    {
                        endPoint: `${this.getUrlBase()}/loadConversation`,
                        callback: this.loadConversation,
                        isProtected: false,
                    },
                    {
                        endPoint: `${this.getUrlBase()}/loadQueue`,
                        callback: this.loadQueue,
                        isProtected: false,
                    },
                    {
                        endPoint: `${this.getUrlBase()}/startRequest`,
                        callback: this.startRequest,
                        isProtected: false,
                    },
                ],
            },
        };
    }
    loadConversation(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let clientQueueDetails = (0, jwt_simple_1.decode)(req.headers['queue-token'].toString(), process.env.JWT_SECRET);
                let myId = req.body.idClient;
                yield response_conversation_1.default.find({
                    id: myId,
                })
                    .then((results) => {
                    response_1.default.onSuccess(res, results);
                })
                    .catch((error) => {
                    return response_1.default.onError(res, 'Teste de retorno de erro', 'erro-teste');
                });
            }
            catch (error) {
                return response_1.default.onError(res, 'Teste de retorno de erro', 'erro-teste');
            }
        });
    }
    loadQueue(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let clientQueueDetails = (0, jwt_simple_1.decode)(req.headers['queue-token'].toString(), process.env.JWT_SECRET);
                let myId = req.body.idClient;
                console.log(clientQueueDetails);
                yield response_conversation_1.default.find({
                    room: {
                        $regex: clientQueueDetails.queue.replace(/ /g, '_'),
                        $options: 'i',
                    },
                })
                    .then((results) => {
                    response_1.default.onSuccess(res, results);
                })
                    .catch((error) => {
                    console.log(error);
                    return response_1.default.onError(res, 'Teste de retorno de erro', 'erro-teste');
                });
            }
            catch (error) {
                console.log(error);
                return response_1.default.onError(res, 'Teste de retorno de erro', 'erro-teste');
            }
        });
    }
    startRequest(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let clientQueueDetails = (0, jwt_simple_1.decode)(req.headers['queue-token'].toString(), process.env.JWT_SECRET);
                let clientData = req.body;
                let socketPort = Number(process.env.SOCKET_PORT)
                    ? Number(process.env.SOCKET_PORT)
                    : 3002;
                console.log(clientQueueDetails);
                let channelSocket = clientQueueDetails.queue.replace(/ /g, '_') + '_' + clientData.id;
                let myHistory;
                yield response_conversation_1.default.find({
                    id: clientData.id,
                })
                    .then((results) => {
                    myHistory = results;
                })
                    .catch((error) => {
                    console.log(error);
                });
                if (myHistory.length > 0) {
                }
                else {
                    let newClient = new response_conversation_1.default(clientData);
                    newClient.save(function (err, book) {
                        if (err)
                            return console.error(err);
                    });
                }
                socketConnection.listen(channelSocket);
                response_1.default.onSuccess(res, {
                    host: `${process.env.SERVER_HOST}:${process.env.SOCKET_PORT}`,
                    channel: channelSocket,
                });
            }
            catch (error) {
                console.log(error);
                return response_1.default.onError(res, 'Teste de retorno de erro', 'erro-teste');
            }
        });
    }
    sendMessage(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let clientQueueDetails = (0, jwt_simple_1.decode)(req.headers['queue-token'].toString(), process.env.JWT_SECRET);
                let room = req.body.room;
                let message = req.body.message;
                let status = req.body.status;
                let service = yield socketConnection.sendResponse(room, message, status);
                response_1.default.onSuccess(res, service);
            }
            catch (error) {
                console.log(error);
                return response_1.default.onError(res, 'Teste de retorno de erro', 'erro-teste');
            }
        });
    }
}
exports.TesteRouter = TesteRouter;
