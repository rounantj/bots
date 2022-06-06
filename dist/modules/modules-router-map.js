"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ModulesRouterMapper = void 0;
const teste_router_1 = require("./teste/teste-router");
const talk_router_1 = require("./talk/talk-router");
class ModulesRouterMapper {
    constructor() {
        this.registeredModules = [
            {
                moduleName: teste_router_1.TesteRouter,
                parser: 'getRoutesFromModules',
            },
            {
                moduleName: talk_router_1.TalkRouter,
                parser: 'getRoutesFromModules',
            },
        ];
    }
}
exports.ModulesRouterMapper = ModulesRouterMapper;
