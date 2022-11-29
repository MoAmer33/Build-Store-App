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
exports.MyStoreProducts = void 0;
var database_1 = __importDefault(require("../database"));
var MyStoreProducts = /** @class */ (function () {
    function MyStoreProducts() {
    }
    MyStoreProducts.prototype.MyProduct = function () {
        return __awaiter(this, void 0, void 0, function () {
            var MyConnection, GetProducts, err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, database_1.default.connect()];
                    case 1:
                        MyConnection = _a.sent();
                        return [4 /*yield*/, MyConnection.query("SELECT * FROM products")];
                    case 2:
                        GetProducts = _a.sent();
                        MyConnection.release();
                        return [2 /*return*/, GetProducts.rows];
                    case 3:
                        err_1 = _a.sent();
                        throw new Error("Error in the MyProduct" + err_1);
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    MyStoreProducts.prototype.TopThreeProduct = function () {
        return __awaiter(this, void 0, void 0, function () {
            var MyConnection, GetTop3Products, err_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, database_1.default.connect()];
                    case 1:
                        MyConnection = _a.sent();
                        return [4 /*yield*/, MyConnection.query("SELECT * FROM products LIMIT 3;")];
                    case 2:
                        GetTop3Products = _a.sent();
                        MyConnection.release();
                        return [2 /*return*/, GetTop3Products.rows];
                    case 3:
                        err_2 = _a.sent();
                        throw new Error("Error in the MyProductTop3" + err_2);
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    MyStoreProducts.prototype.GetSpecifcProduct = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var MyConnection, MyRow, err_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, database_1.default.connect()];
                    case 1:
                        MyConnection = _a.sent();
                        return [4 /*yield*/, MyConnection.query("SELECT * FROM products WHERE id = $1;", [id])];
                    case 2:
                        MyRow = _a.sent();
                        MyConnection.release();
                        if (MyRow.rows.length != 0 || MyRow.rows.length < 0)
                            return [2 /*return*/, MyRow.rows[0]];
                        else
                            throw new Error();
                        return [3 /*break*/, 4];
                    case 3:
                        err_3 = _a.sent();
                        throw new Error("Error in get specific Product:" + err_3 + " " + id);
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    MyStoreProducts.prototype.CreateNewProduct = function (NewProduct) {
        return __awaiter(this, void 0, void 0, function () {
            var MyConnection, CreateProduct, err_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, database_1.default.connect()];
                    case 1:
                        MyConnection = _a.sent();
                        return [4 /*yield*/, MyConnection.query("INSERT INTO products (name,price) VALUES($1,$2) RETURNING *;", [NewProduct.name, NewProduct.price])];
                    case 2:
                        CreateProduct = _a.sent();
                        MyConnection.release();
                        return [2 /*return*/, CreateProduct.rows[0]];
                    case 3:
                        err_4 = _a.sent();
                        throw new Error("Error in create Product" + NewProduct.name + " " + err_4);
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    MyStoreProducts.prototype.DeleteProduct = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var MyConnection, DeleteProduct, err_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, database_1.default.connect()];
                    case 1:
                        MyConnection = _a.sent();
                        return [4 /*yield*/, MyConnection.query("DELETE from products WHERE id = ($1) RETURNING *", [id])];
                    case 2:
                        DeleteProduct = _a.sent();
                        MyConnection.release();
                        return [2 /*return*/, DeleteProduct.rows[0]];
                    case 3:
                        err_5 = _a.sent();
                        throw new Error("Error in Delete Product" + id + " " + err_5);
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    return MyStoreProducts;
}());
exports.MyStoreProducts = MyStoreProducts;