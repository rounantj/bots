"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const O2OAddressSchema = new mongoose_1.Schema({
    bairro: {
        type: String,
        required: true,
    },
    cep: {
        type: String,
        required: true,
    },
    cidade: {
        type: String,
        required: true,
    },
    complemento: {
        type: String,
    },
    estado: {
        type: String,
        required: true,
    },
    logradouro: {
        type: String,
        required: true,
    },
    numero: {
        type: String,
        required: true,
    },
});
const O2OAddress = (0, mongoose_1.model)('O2OAddress', O2OAddressSchema);
exports.default = O2OAddress;
