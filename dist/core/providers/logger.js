"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const pino_1 = __importDefault(require("pino"));
const { logDisabled } = require('../config/env/index');
const logger = (0, pino_1.default)({
    enabled: !!logDisabled,
    prettyPrint: {
        colorize: true,
        translateTime: 'SYS:standard',
        ignore: 'hostname,pid',
    },
});
exports.default = logger;
