"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
var _a = process.env, PORT = _a.PORT, NODE_ENV = _a.NODE_ENV, POSTGRES_HOST = _a.POSTGRES_HOST, POSTGRES_PORT = _a.POSTGRES_PORT, POSTGRES_DB = _a.POSTGRES_DB, POSTGRES_DB_TEST = _a.POSTGRES_DB_TEST, POSTGRES_USER = _a.POSTGRES_USER, POSTGRES_PASSWORD = _a.POSTGRES_PASSWORD, TOKEN_SECRET = _a.TOKEN_SECRET;
exports.default = {
    port: PORT,
    host: POSTGRES_HOST,
    dbPort: POSTGRES_DB,
    database: NODE_ENV === 'dev' ? POSTGRES_DB : POSTGRES_DB_TEST,
    user: POSTGRES_USER,
    password: POSTGRES_PASSWORD,
    tokenSecret: TOKEN_SECRET
};
