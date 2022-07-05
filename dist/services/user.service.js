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
const user_model_1 = require("../models/user.model");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const UserDto_1 = __importDefault(require("../dtos/UserDto"));
const token_service_1 = __importDefault(require("./token.service"));
const ApiError_1 = __importDefault(require("../error/ApiError"));
const token_model_1 = require("../models/token.model");
const box_service_1 = __importDefault(require("./box.service"));
const box_model_1 = require("../models/box.model");
class UserService {
    registration(email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const candidate = yield user_model_1.User.findOne({ where: { email } });
                if (candidate) {
                    throw new Error("User already exists");
                }
                const hashPassword = yield bcryptjs_1.default.hash(password, 5);
                const user = yield user_model_1.User.create({ email, password: hashPassword });
                const boxes = yield box_service_1.default.createBoxes(user.id, user.email, 3);
                const responseData = this.createResponseData(user);
                return responseData;
            }
            catch (e) {
                throw new Error(`Service error (registration): ${e.message}`);
            }
        });
    }
    login(email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield user_model_1.User.findOne({ where: { email } });
                if (!user) {
                    throw new Error("User isn't exists");
                }
                const isValidPassword = yield bcryptjs_1.default.compare(password, user.password);
                if (!isValidPassword) {
                    throw new Error("Password isn't correct");
                }
                const responseData = this.createResponseData(user);
                return responseData;
            }
            catch (e) {
                throw new Error(`Service error (login): ${e.message}`);
            }
        });
    }
    logout(token) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield token_service_1.default.removeRefreshToken(token);
            }
            catch (e) {
                throw new Error(`Service error (logout): ${e.message}`);
            }
        });
    }
    refresh(token) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (!token) {
                    throw ApiError_1.default.Unauthorized();
                }
                const validateData = yield token_service_1.default.validateToken(token, process.env.JWT_REFRESH_SECRET);
                const tokenFromDb = yield token_service_1.default.findToken(token);
                if (!validateData || !tokenFromDb) {
                    throw ApiError_1.default.Unauthorized();
                }
                const user = yield user_model_1.User.findOne({ where: { id: validateData.id } });
                if (!user) {
                    throw new Error(`User wasn't find`);
                }
                const responseData = yield this.createResponseData(user);
                return responseData;
            }
            catch (e) {
                throw new Error(`Service error (refresh): ${e.message}`);
            }
        });
    }
    getUsers() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const users = yield user_model_1.User.findAll({ include: [{ model: token_model_1.Token }, { model: box_model_1.Box }] });
                return users;
            }
            catch (e) {
                throw new Error(`Service error (getUsers): ${e.message}`);
            }
        });
    }
    createResponseData(user) {
        return __awaiter(this, void 0, void 0, function* () {
            const userDto = new UserDto_1.default(user.id, user.email);
            const tokens = token_service_1.default.generateTokens(Object.assign({}, userDto));
            yield token_service_1.default.saveRefreshToken(userDto.id, tokens.refreshToken);
            return Object.assign(Object.assign({}, userDto), tokens);
        });
    }
}
exports.default = new UserService();
