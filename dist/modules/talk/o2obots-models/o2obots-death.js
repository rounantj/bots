"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const O2ODeathSchema = new mongoose_1.Schema({
    anoObito: {
        type: String,
        required: true,
    },
    msgObito: {
        type: String,
        required: true,
    },
});
const O2ODeath = (0, mongoose_1.model)('O2ODeath', O2ODeathSchema);
exports.default = O2ODeath;
