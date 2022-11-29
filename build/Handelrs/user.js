"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var user_1 = require("../models/user");
var dotenv_1 = __importDefault(require("dotenv"));
var Authorization_1 = __importDefault(require("../middleware/Authorization"));
dotenv_1.default.config();
var MyUserstore = new user_1.MyUserStore();
var MyUserr = function (_req, response) { return __awaiter(void 0, void 0, void 0, function () {
    var userss, err_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, MyUserstore.MyIndex()];
            case 1:
                userss = _a.sent();
                response.json(userss);
                return [3 /*break*/, 3];
            case 2:
                err_1 = _a.sent();
                response.status(400).json(err_1);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
var MyData = function (_req, response) { return __awaiter(void 0, void 0, void 0, function () {
    var userr, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, MyUserstore.GetSpecifcUser(parseInt(_req.query.id))];
            case 1:
                userr = _a.sent();
                response.json(userr);
                return [3 /*break*/, 3];
            case 2:
                error_1 = _a.sent();
                response.status(400);
                // eslint-disable-next-line prettier/prettier
                response.json(error_1);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
var CreateUser = function (_req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var User, NewUser, MyToken, err_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                User = {
                    username: _req.body.username,
                    password_digest: _req.body.password,
                };
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, MyUserstore.CreateNewUser(User)];
            case 2:
                NewUser = _a.sent();
                MyToken = jsonwebtoken_1.default.sign({ user: NewUser }, process.env.TOKEN_SECRET);
                res.json(MyToken);
                return [3 /*break*/, 4];
            case 3:
                err_2 = _a.sent();
                res.status(400);
                // eslint-disable-next-line prettier/prettier
                res.json(err_2 + User);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
var DeleteUser = function (_req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var deleted, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, MyUserstore.DeleteUser(_req.body.id)];
            case 1:
                deleted = _a.sent();
                res.json(null);
                return [3 /*break*/, 3];
            case 2:
                error_2 = _a.sent();
                res.status(401);
                res.json(error_2);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
var Authenticate = function (_req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var user, u, token, err_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                user = {
                    username: _req.body.username,
                    password_digest: _req.body.password,
                };
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, MyUserstore.CipherAuthentication(user.username, user.password_digest)];
            case 2:
                u = _a.sent();
                token = jsonwebtoken_1.default.sign({ user: u }, process.env.TOKEN_SECRET);
                res.json(token);
                return [3 /*break*/, 4];
            case 3:
                err_3 = _a.sent();
                res.status(401);
                res.json(err_3 + user);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
var UserRoutes = function (app) {
    app.get("/users", Authorization_1.default, MyUserr);
    app.get("/user", Authorization_1.default, MyData);
    app.post("/user", CreateUser);
    app.delete("/user", Authorization_1.default, DeleteUser);
    app.post("/userAu", Authenticate);
};
exports.default = UserRoutes;
