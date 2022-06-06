"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const O2OChatSchema = new mongoose_1.Schema({
    id: {
        type: Number,
        required: true,
        unique: true,
    },
    createdAt: {
        type: String,
        required: true,
    },
    flowId: {
        type: String,
        required: true,
    },
    questionDesc: {
        type: String,
    },
});
const O2OChat = (0, mongoose_1.model)('O2OChat', O2OChatSchema);
exports.default = O2OChat;
