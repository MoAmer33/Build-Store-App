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
exports.MyStoreOrder_Products = void 0;
var database_1 = __importDefault(require("../database"));
var MyStoreOrder_Products = /** @class */ (function () {
    function MyStoreOrder_Products() {
    }
    MyStoreOrder_Products.prototype.MyOrder_Products = function () {
        return __awaiter(this, void 0, void 0, function () {
            var MyConnection, GetOrders_Products, err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, database_1.default.connect()];
                    case 1:
                        MyConnection = _a.sent();
                        return [4 /*yield*/, MyConnection.query("SELECT * FROM order_products;")];
                    case 2:
                        GetOrders_Products = _a.sent();
                        MyConnection.release();
                        return [2 /*return*/, GetOrders_Products.rows];
                    case 3:
                        err_1 = _a.sent();
                        throw new Error("Error in the MyOrder_Products" + err_1);
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    MyStoreOrder_Products.prototype.GetSpecifcOrder_Products = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var MyConnection, MyRow, err_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, database_1.default.connect()];
                    case 1:
                        MyConnection = _a.sent();
                        return [4 /*yield*/, MyConnection.query("SELECT * FROM order_products WHERE id = $1;", [id])];
                    case 2:
                        MyRow = _a.sent();
                        MyConnection.release();
                        return [2 /*return*/, MyRow.rows[0]];
                    case 3:
                        err_2 = _a.sent();
                        throw new Error("Error in get specific Order_Product:" + err_2 + " " + id);
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    MyStoreOrder_Products.prototype.CreateNewOrder_Product = function (NewOrder_Product) {
        return __awaiter(this, void 0, void 0, function () {
            var MyConnection, CreateOrder_Product, err_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, database_1.default.connect()];
                    case 1:
                        MyConnection = _a.sent();
                        return [4 /*yield*/, MyConnection.query("INSERT INTO order_products (quantity,order_id,product_id) VALUES($1,$2,$3) RETURNING *;", [NewOrder_Product.quantity, NewOrder_Product.order_id, NewOrder_Product.product_id])];
                    case 2:
                        CreateOrder_Product = _a.sent();
                        MyConnection.release();
                        return [2 /*return*/, CreateOrder_Product.rows[0]];
                    case 3:
                        err_3 = _a.sent();
                        throw new Error("Error in create Order" + NewOrder_Product.order_id + " " + err_3);
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    MyStoreOrder_Products.prototype.DeleteOrder_Product = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var MyConnection, DeleteOrder_Product, err_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, database_1.default.connect()];
                    case 1:
                        MyConnection = _a.sent();
                        return [4 /*yield*/, MyConnection.query("DELETE from order_products WHERE id = ($1);", [id])];
                    case 2:
                        DeleteOrder_Product = _a.sent();
                        MyConnection.release();
                        return [2 /*return*/, DeleteOrder_Product.rows[0]];
                    case 3:
                        err_4 = _a.sent();
                        throw new Error("Error in Delete Order_Product" + id + " " + err_4);
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    return MyStoreOrder_Products;
}());
exports.MyStoreOrder_Products = MyStoreOrder_Products;
