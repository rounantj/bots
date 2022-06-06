"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const O2ODealSchema = new mongoose_1.Schema({
    dealId: {
        type: String,
        required: true,
        unique: true,
    },
    dealname: {
        type: String,
        required: true,
    },
    hubspot_owner_id: {
        type: String,
    },
    dealtype: {
        type: String,
    },
    dealstage: {
        type: Number,
    },
    pipeline: {
        type: Number,
    },
    description: {
        type: Number,
    },
});
const O2ODeal = (0, mongoose_1.model)('O2ODeal', O2ODealSchema);
exports.default = O2ODeal;
