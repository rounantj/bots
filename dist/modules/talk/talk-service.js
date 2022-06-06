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
exports.TalkService = void 0;
const o2obots_conversation_1 = __importDefault(require("./o2obots-models/o2obots-conversation"));
class TalkService {
    constructor() { }
    loadConversation(idConversation) {
        return __awaiter(this, void 0, void 0, function* () {
            const conversation = yield o2obots_conversation_1.default.find({
                id: idConversation,
            })
                .then((results) => { })
                .catch((error) => {
                console.log(error);
            });
            return conversation;
        });
    }
}
exports.TalkService = TalkService;
