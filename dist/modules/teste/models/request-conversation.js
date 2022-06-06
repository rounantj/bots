"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const RequestConversationSchema = new mongoose_1.Schema({
    text: {
        type: String,
        required: true,
    },
    token: {
        type: String,
        required: true,
    },
});
const RequestConversation = (0, mongoose_1.model)('RequestConversation', RequestConversationSchema);
exports.default = RequestConversation;
