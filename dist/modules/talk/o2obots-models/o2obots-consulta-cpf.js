"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const O2OConsultaCpfSchema = new mongoose_1.Schema({
    codigoControle: {
        type: String,
        required: true,
    },
    dataConsulta: {
        type: String,
        required: true,
    },
    dataInscricao: {
        type: String,
        required: true,
    },
    horaConsulta: {
        type: String,
    },
});
const O2OConsultaCpf = (0, mongoose_1.model)('O2OConsultaCpf', O2OConsultaCpfSchema);
exports.default = O2OConsultaCpf;
