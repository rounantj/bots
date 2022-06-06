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
exports.TalkRouter = void 0;
const base_router_module_1 = require("../../core/router/base-router-module");
const response_1 = __importDefault(require("../../core/handlers/response"));
const o2obots_conversation_1 = __importDefault(require("./o2obots-models/o2obots-conversation"));
class TalkRouter extends base_router_module_1.BaseRouterModule {
    constructor() {
        super('talk');
        this.MODULES_ENDPOINT_MAP = {
            [this.moduleName]: {
                post: [
                    // {
                    //   endPoint: `${this.getUrlBase()}/sendMessage`,
                    //   callback: this.sendMessage,
                    //   isProtected: false,
                    // },
                    {
                        endPoint: `${this.getUrlBase()}/loadConversation`,
                        callback: this.loadConversation,
                        isProtected: false,
                    },
                ],
            },
        };
    }
    loadConversation(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield o2obots_conversation_1.default.find({
                    $or: [
                        { id: req.body.idConversation },
                        { 'profile.phone': req.body.phone },
                        { 'profile.cpf': req.body.cpf },
                    ],
                })
                    .then((results) => {
                    var _a;
                    let myConversation = results[0];
                    let chat = [];
                    for (const k in myConversation.chat) {
                        chat.push({
                            isAttendant: true,
                            message: myConversation.chat[k].questionDesc,
                            data: new Date(myConversation.chat.createdAt),
                        });
                        chat.push({
                            isAttendant: false,
                            message: myConversation.chat[k].answers,
                            data: new Date(myConversation.chat.createdAt),
                        });
                    }
                    let responseConversation = {
                        name: ((_a = myConversation === null || myConversation === void 0 ? void 0 : myConversation.profile) === null || _a === void 0 ? void 0 : _a.name)
                            ? myConversation.profile.name
                            : 'not found',
                        picture: 'none',
                        conversation: chat,
                    };
                    response_1.default.onSuccess(res, responseConversation);
                })
                    .catch((error) => {
                    console.log(error);
                });
            }
            catch (error) {
                response_1.default.onError(res, 'Teste de retorno de erro', 'erro-teste');
            }
        });
    }
}
exports.TalkRouter = TalkRouter;
