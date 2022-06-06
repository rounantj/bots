"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const O2OContractSchema = new mongoose_1.Schema({
    fgtsOptIn: {
        type: Boolean,
        required: true,
    },
    fgtsSaqueAniversario: {
        type: Boolean,
        required: true,
    },
    isCorrentista: {
        type: Boolean,
    },
    maxValue: {
        type: Number,
    },
    userValue: {
        type: Number,
    },
});
const O2OContract = (0, mongoose_1.model)('O2OContract', O2OContractSchema);
exports.default = O2OContract;
