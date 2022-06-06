"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MongoConnector = void 0;
const mongoose = require('mongoose');
const { dbHost, dbName, dbUser, dbPass } = require('../config/env/index');
class MongoConnector {
    constructor() {
        this.loadSchemas();
    }
    sync() {
        try {
            mongoose.set('debug', true);
            return mongoose.connect(`mongodb+srv://${dbHost}/${dbName}?retryWrites=true&w=majority`, {
                user: dbUser,
                pass: dbPass,
                ssl: true,
                useNewUrlParser: true,
                useUnifiedTopology: true,
            });
        }
        catch (error) {
            console.log(error);
        }
    }
    loadSchemas() {
        console.log('Loading Schemas...');
        console.log('Schemas loaded...');
    }
}
exports.MongoConnector = MongoConnector;
