"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RouterModule = void 0;
const router_map_1 = require("./router-map");
class RouterModule {
    constructor(app) {
        this.express = app;
        this.routerFactory = new router_map_1.RouterModuleFactory();
    }
    exposeRoutes() {
        const registeredModules = this.routerFactory.getRegisteredModules();
        if (registeredModules && Array.isArray(registeredModules)) {
            registeredModules.forEach(this.extractRouterInfoFromModule.bind(this));
        }
    }
    extractRouterInfoFromModule(routerfeatModule) {
        if (routerfeatModule) {
            const registeredVerbs = Object.keys(routerfeatModule);
            registeredVerbs.forEach(this.extractInfoByVerb.bind(this, routerfeatModule));
        }
    }
    extractInfoByVerb(routerfeatModule, registeredVerb) {
        routerfeatModule[registeredVerb].forEach(this.mountRoutes.bind(this, registeredVerb));
    }
    mountRoutes(registeredVerb, routerInfo) {
        if (routerInfo) {
            const { callback, endPoint } = routerInfo;
            this.express.route(endPoint)[registeredVerb](callback);
        }
    }
}
exports.RouterModule = RouterModule;
