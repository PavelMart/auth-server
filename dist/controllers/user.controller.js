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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ApiError_1 = __importDefault(require("../error/ApiError"));
const user_service_1 = __importDefault(require("../services/user.service"));
class UserController {
    registration(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { email, password } = req.body;
                const user = yield user_service_1.default.registration(email, password);
                res.cookie("refresh_token", user.refreshToken, { httpOnly: true, maxAge: 24 * 60 * 60 * 1000 });
                res.json(user);
            }
            catch (e) {
                next(ApiError_1.default.BadRequest(e.message));
            }
        });
    }
    login(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { email, password } = req.body;
                const user = yield user_service_1.default.login(email, password);
                res.cookie("refresh_token", user.refreshToken, { httpOnly: true, maxAge: 24 * 60 * 60 * 1000 });
                res.json(user);
            }
            catch (e) {
                next(ApiError_1.default.BadRequest(e.message));
            }
        });
    }
    logout(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { refresh_token } = req.cookies;
                yield user_service_1.default.logout(refresh_token);
                res.clearCookie("refresh_token");
                return res.json(1);
            }
            catch (e) {
                next(ApiError_1.default.BadRequest(e.message));
            }
        });
    }
    refresh(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { refresh_token } = req.cookies;
                const user = yield user_service_1.default.refresh(refresh_token);
                res.cookie("refresh_token", user.refreshToken, { httpOnly: true, maxAge: 24 * 60 * 60 * 1000 });
                return res.json(user);
            }
            catch (e) {
                next(ApiError_1.default.BadRequest(e.message));
            }
        });
    }
    getUsers(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const users = yield user_service_1.default.getUsers();
                return res.json(users);
            }
            catch (e) {
                next(ApiError_1.default.BadRequest(e.message));
            }
        });
    }
}
exports.default = new UserController();
