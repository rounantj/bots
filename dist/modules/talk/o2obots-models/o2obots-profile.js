"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const O2OProfileSchema = new mongoose_1.Schema({
    id: {
        type: Number,
        required: true,
        unique: true,
    },
    phone: {
        type: String,
        required: true,
    },
    address: {
        type: Object,
    },
    birthday: {
        type: String,
    },
    codGrauEscolar: {
        type: String,
    },
    consultaCpf: {
        type: Object,
    },
    cpf: {
        type: String,
    },
    death: {
        type: Object,
    },
    email: {
        type: String,
    },
    grauEscolar: {
        type: String,
    },
    hubspot_id: {
        type: String,
    },
    income: {
        type: String,
    },
    lgpd: {
        type: String,
    },
    marital_status: {
        type: String,
    },
    marital_status_code: {
        type: String,
    },
    name: {
        type: String,
    },
    nascimentoCidade: {
        type: String,
    },
    nascimentoEstado: {
        type: String,
    },
    nomeMae: {
        type: String,
    },
    nomePai: {
        type: String,
    },
    ourhubspot_id: {
        type: String,
    },
    professional_situation: {
        type: String,
    },
    professional_situation_code: {
        type: String,
    },
    situacao: {
        type: String,
    },
});
const O2OProfile = (0, mongoose_1.model)('O2OProfile', O2OProfileSchema);
exports.default = O2OProfile;
