"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = require("./server");
const mongoConnector_1 = require("./core/database/mongoConnector");
const jwt_simple_1 = require("jwt-simple");
(function () {
    new server_1.Server(new mongoConnector_1.MongoConnector());
    console.log((0, jwt_simple_1.encode)({
        company: 'Banco BGM',
        queue: 'ATENDIMENTO-NIVEL-01',
        id: 8888,
    }, 'SEGREDO'));
})();
