"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const O2OCompanySchema = new mongoose_1.Schema({
    id: {
        type: String,
        required: true,
        unique: true,
    },
    name: {
        type: String,
        required: true,
    },
});
const O2OCompany = (0, mongoose_1.model)('O2OCompany', O2OCompanySchema);
exports.default = O2OCompany;
