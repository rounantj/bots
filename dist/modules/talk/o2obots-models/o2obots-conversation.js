"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const O2OConversationSchema = new mongoose_1.Schema({
    id: {
        type: String,
        required: true,
        unique: true,
    },
    createdAt: {
        type: String,
        required: true,
    },
    createdAtLocale: {
        type: String,
    },
    flowId: {
        type: Number,
    },
    profile: {
        type: Object,
    },
    company: {
        type: Object,
    },
    deal: {
        type: Object,
    },
    dealHistory: {
        type: [],
    },
    contract: {
        type: Object,
    },
    updatedAt: {
        type: String,
    },
    updatedAtLocale: {
        type: String,
    },
    chat: {
        type: Object,
    },
});
const O2OConversation = (0, mongoose_1.model)('conversations_copy', O2OConversationSchema);
exports.default = O2OConversation;
