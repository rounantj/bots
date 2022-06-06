"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const ResponseConversationSchema = new mongoose_1.Schema({
    id: {
        type: Number,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        required: true,
    },
    roomOpened: {
        type: Boolean,
    },
    room: {
        type: String,
    },
    category: {
        type: String,
        required: true,
    },
    picture: {
        type: String,
        required: true,
    },
    conversation: {
        type: Object,
        required: true,
    },
});
const ResponseConversation = (0, mongoose_1.model)('conversations', ResponseConversationSchema);
exports.default = ResponseConversation;
