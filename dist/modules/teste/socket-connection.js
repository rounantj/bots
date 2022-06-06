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
exports.O2OSocket = void 0;
const express_1 = __importDefault(require("express"));
const http_1 = require("http");
const socketIo = __importStar(require("socket.io"));
const teste_service_1 = require("./teste-service");
const moment_1 = __importDefault(require("moment"));
class O2OSocket {
    constructor(port) {
        this.PORT = 3002;
        this.channel = 'message';
        this.app = (0, express_1.default)();
        this.PORT = port ? port : 3002;
        this.httpServer = (0, http_1.createServer)(this.app);
        this.io = new socketIo.Server(this.httpServer, { cors: { origin: '*' } });
        this.httpServer.listen(this.PORT, () => console.log(`listenning on ${process.env.SERVER_HOST}:${this.PORT}`));
    }
    listen(myChannel) {
        let socketInstace = this.io;
        socketInstace.on('connection', (socket) => {
            console.log('a user connected in: ' + myChannel);
            // Save at collecion with "OPENED CHANNELS" to consult after
            let myId = Number(myChannel.split('_')[1]);
            let setField = this.setField;
            let updateHistory = this.updateHistory;
            //socket.join(myChannel)
            socket.on(myChannel, (msg) => __awaiter(this, void 0, void 0, function* () {
                console.log('recebendo mensagen: ', msg);
                yield setField('roomOpened', true, myId);
                yield setField('room', myChannel, myId);
                // socketInstace.emit(myChannel, 'Obrigado por sua mensagen!')
                let myMsg = {
                    question: false,
                    text: msg,
                    date: (0, moment_1.default)().format('YYYY-MM-DD HH:mm:ss'),
                };
                yield updateHistory(myMsg, myId);
                // socket.to(to).to(socket.userID).emit(myChannel, message)
            }));
            socket.on('disconnect', () => {
                // Remove opened connection from collection "OPENED CONENCTIONS"
                setField('roomOpened', false, myId);
                console.log('user disconnected');
            });
        });
    }
    sendResponse(room, txt, status) {
        return __awaiter(this, void 0, void 0, function* () {
            // Save the sent message on the collection to update the history
            let myId = Number(room.split('_')[1]);
            let updateHistory = this.updateHistory;
            const service = new teste_service_1.TesteService().updateConversation('status', status, myId);
            this.io.emit(room, txt);
            let myMsg = {
                question: true,
                text: txt,
                date: (0, moment_1.default)().format('YYYY-MM-DD HH:mm:ss'),
            };
            let result = updateHistory(myMsg, myId);
            return result;
        });
    }
    updateHistory(chat, id) {
        return __awaiter(this, void 0, void 0, function* () {
            const service = yield new teste_service_1.TesteService().saveMessage(chat, id);
        });
    }
    setField(field, newValue, idClient) {
        return __awaiter(this, void 0, void 0, function* () {
            const service = yield new teste_service_1.TesteService().updateConversation(field, newValue, idClient);
        });
    }
}
exports.O2OSocket = O2OSocket;
