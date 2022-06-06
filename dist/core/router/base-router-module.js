"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseRouterModule = void 0;
class BaseRouterModule {
    constructor(moduleName) {
        this.context = '/api';
        this.version = 'v1';
        this.moduleName = 'rest-api';
        this.MODULES_ENDPOINT_MAP = {
            [this.moduleName]: {
                get: [
                    {
                        endPoint: this.getUrlBase(),
                        callback: (req, res) => {
                            res.sendStatus(200).send({ status: 200, msg: 'OK' });
                        },
                        isProtected: false,
                    },
                ],
            },
        };
        if (typeof moduleName === 'string') {
            this.moduleName = moduleName;
        }
    }
    getRoutesFromModules() {
        return this.MODULES_ENDPOINT_MAP;
    }
    getUrlBase() {
        return `${this.context}/${this.version}/${this.moduleName}`;
    }
}
exports.BaseRouterModule = BaseRouterModule;
