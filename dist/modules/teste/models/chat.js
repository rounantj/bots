"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const ChatSchema = new mongoose_1.Schema({
    question: {
        type: Boolean,
        required: true,
    },
    text: {
        type: String,
        required: true,
    },
    date: {
        type: String,
        required: true,
    },
});
const Chat = (0, mongoose_1.model)('Chat', ChatSchema);
exports.default = Chat;
