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
var supertest_1 = __importDefault(require("supertest"));
var database_1 = __importDefault(require("../database"));
var user_1 = require("../models/user");
var index_1 = __importDefault(require("../index"));
// create a request object
var MyStore = new user_1.MyUserStore();
// create a request object
var request = (0, supertest_1.default)(index_1.default);
describe('Test endpoint response', function () {
    describe('Test My Model ', function () {
        var user = {
            username: "ali",
            password_digest: "123"
            // eslint-disable-next-line prettier/prettier
        };
        beforeAll(function () { return __awaiter(void 0, void 0, void 0, function () {
            var conn, createUser;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, database_1.default.connect()];
                    case 1:
                        conn = _a.sent();
                        return [4 /*yield*/, conn.query("ALTER SEQUENCE users_id_seq RESTART WITH 1;")];
                    case 2:
                        _a.sent();
                        conn.release();
                        return [4 /*yield*/, MyStore.CreateNewUser(user)];
                    case 3:
                        createUser = _a.sent();
                        user.id = createUser.id;
                        return [2 /*return*/];
                }
            });
        }); });
        afterAll(function () { return __awaiter(void 0, void 0, void 0, function () {
            var MyConnection;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, database_1.default.connect()];
                    case 1:
                        MyConnection = _a.sent();
                        return [4 /*yield*/, MyConnection.query("delete from users;")];
                    case 2:
                        _a.sent();
                        MyConnection.release();
                        return [2 /*return*/];
                }
            });
        }); });
        it("Test CreateNewUser Function Exists", function () {
            expect(MyStore.CreateNewUser).toBeDefined();
            expect(user.id).toBeInstanceOf(Number);
            expect(user.username).toBeInstanceOf(String);
            expect(user.password_digest).toBeInstanceOf(String);
        });
        it("Test CipherAuthentication model", function () {
            return __awaiter(this, void 0, void 0, function () {
                var users;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, MyStore.CipherAuthentication(user.username, user.password_digest)];
                        case 1:
                            users = _a.sent();
                            expect(users).toBeInstanceOf(Object);
                            expect(MyStore.CipherAuthentication).toBeDefined();
                            return [2 /*return*/];
                    }
                });
            });
        });
        it("Test MyIndex model", function () {
            return __awaiter(this, void 0, void 0, function () {
                var users;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, MyStore.MyIndex()];
                        case 1:
                            users = _a.sent();
                            expect(users).toBeDefined();
                            expect(users.length).toBeGreaterThan(0);
                            return [2 /*return*/];
                    }
                });
            });
        });
        it("Test GetSpecifcUser model", function () {
            return __awaiter(this, void 0, void 0, function () {
                var users;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, MyStore.GetSpecifcUser(user.id)];
                        case 1:
                            users = _a.sent();
                            expect(users === null || users === void 0 ? void 0 : users.id).toBeInstanceOf(Number);
                            expect(users === null || users === void 0 ? void 0 : users.password_digest).toBeInstanceOf(String);
                            expect(MyStore.GetSpecifcUser).toBeDefined();
                            return [2 /*return*/];
                    }
                });
            });
        });
        it("Test Delete model", function () {
            return __awaiter(this, void 0, void 0, function () {
                var use;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, MyStore.DeleteUser(user.id)];
                        case 1:
                            use = _a.sent();
                            expect(use === null || use === void 0 ? void 0 : use.username).toBeInstanceOf(String);
                            expect(use === null || use === void 0 ? void 0 : use.password_digest).toBeInstanceOf(String);
                            expect(MyStore.DeleteUser).toBeDefined();
                            return [2 /*return*/];
                    }
                });
            });
        });
    });
});
describe('Test My authentication ', function () {
    var user = {
        username: "ali",
        password_digest: "123"
        // eslint-disable-next-line prettier/prettier
    };
    beforeAll(function () { return __awaiter(void 0, void 0, void 0, function () {
        var conn, createUser;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, database_1.default.connect()];
                case 1:
                    conn = _a.sent();
                    return [4 /*yield*/, conn.query("ALTER SEQUENCE users_id_seq RESTART WITH 1;")];
                case 2:
                    _a.sent();
                    conn.release();
                    return [4 /*yield*/, MyStore.CreateNewUser(user)];
                case 3:
                    createUser = _a.sent();
                    user.id = createUser.id;
                    return [2 /*return*/];
            }
        });
    }); });
    afterAll(function () { return __awaiter(void 0, void 0, void 0, function () {
        var conn, sql;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, database_1.default.connect()];
                case 1:
                    conn = _a.sent();
                    sql = "delete from users;";
                    return [4 /*yield*/, conn.query(sql)];
                case 2:
                    _a.sent();
                    conn.release();
                    return [2 /*return*/];
            }
        });
    }); });
    it("Test My authentication function", function () { return __awaiter(void 0, void 0, void 0, function () {
        var authorized;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, MyStore.CipherAuthentication(user.username, user.password_digest)];
                case 1:
                    authorized = _a.sent();
                    expect(authorized === null || authorized === void 0 ? void 0 : authorized.password_digest).toBeInstanceOf(String);
                    expect(authorized === null || authorized === void 0 ? void 0 : authorized.id).toBeInstanceOf(Number);
                    return [2 /*return*/];
            }
        });
    }); });
    it("Test My authentication function", function () { return __awaiter(void 0, void 0, void 0, function () {
        var notAuthorize;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, MyStore.CipherAuthentication("username", user.password_digest)];
                case 1:
                    notAuthorize = _a.sent();
                    expect(notAuthorize === null || notAuthorize === void 0 ? void 0 : notAuthorize.password_digest).toBeUndefined();
                    expect(notAuthorize === null || notAuthorize === void 0 ? void 0 : notAuthorize.id).toBeUndefined();
                    return [2 /*return*/];
            }
        });
    }); });
});
describe("Test user API", function () {
    var user = {
        username: "ayman",
        password_digest: "123"
        // eslint-disable-next-line prettier/prettier
    };
    var myToken = "";
    beforeAll(function () { return __awaiter(void 0, void 0, void 0, function () {
        var conn, createUser;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, database_1.default.connect()];
                case 1:
                    conn = _a.sent();
                    return [4 /*yield*/, conn.query("ALTER SEQUENCE users_id_seq RESTART WITH 1;")];
                case 2:
                    _a.sent();
                    conn.release();
                    return [4 /*yield*/, MyStore.CreateNewUser(user)];
                case 3:
                    createUser = _a.sent();
                    user.id = createUser.id;
                    return [2 /*return*/];
            }
        });
    }); });
    afterAll(function () { return __awaiter(void 0, void 0, void 0, function () {
        var conn, sql;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, database_1.default.connect()];
                case 1:
                    conn = _a.sent();
                    sql = "delete from users";
                    return [4 /*yield*/, conn.query(sql)];
                case 2:
                    _a.sent();
                    conn.release();
                    return [2 /*return*/];
            }
        });
    }); });
    it("Test Create Function", function () { return __awaiter(void 0, void 0, void 0, function () {
        var res;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, request.post("/user")
                        .set("Content-Type", "application/json")
                        .send({
                        username: user.username,
                        password: user.password_digest
                    })];
                case 1:
                    res = _a.sent();
                    expect(res.statusCode).toBe(200);
                    expect(res.body).toBeInstanceOf(String);
                    return [2 /*return*/];
            }
        });
    }); });
    it("Take Token ", function () { return __awaiter(void 0, void 0, void 0, function () {
        var res;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, request.post("/userAu")
                        .set("Content-Type", "application/json")
                        .send({
                        username: user.username,
                        password: user.password_digest
                    })];
                case 1:
                    res = _a.sent();
                    myToken = res.body;
                    expect(res.status).toBe(200);
                    expect(res.body).toBeInstanceOf(String);
                    return [2 /*return*/];
            }
        });
    }); });
    it("Thet My Index", function () { return __awaiter(void 0, void 0, void 0, function () {
        var res;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, request.get('/users')
                        .set("Content-Type", "application/json")
                        .set('Authorization', "Bearer ".concat(myToken))];
                case 1:
                    res = _a.sent();
                    expect(res.status).toBe(200);
                    expect(res.body).toBeInstanceOf(Array);
                    return [2 /*return*/];
            }
        });
    }); });
    it("Test My Data", function () { return __awaiter(void 0, void 0, void 0, function () {
        var res;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, request.get("/user?id=".concat(user.id))
                        .set("Content-Type", "application/json")
                        .set('Authorization', "Bearer ".concat(myToken))];
                case 1:
                    res = _a.sent();
                    expect(res.status).toBe(200);
                    expect(res.body).toBeInstanceOf(Object);
                    return [2 /*return*/];
            }
        });
    }); });
    it("Test Delete Function", function () { return __awaiter(void 0, void 0, void 0, function () {
        var res;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, request.delete("/user?id=".concat(user.id))
                        .set("Content-Type", "application/json")
                        .set('Authorization', "Bearer ".concat(myToken))];
                case 1:
                    res = _a.sent();
                    expect(res.status).toBe(200);
                    expect(res.body).toBeNull();
                    return [2 /*return*/];
            }
        });
    }); });
});
