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
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const token_model_1 = require("../models/token.model");
class TokenService {
    generateTokens(payload) {
        const accessToken = jsonwebtoken_1.default.sign(payload, process.env.JWT_ACCESS_SECRET, { expiresIn: "30m" });
        const refreshToken = jsonwebtoken_1.default.sign(payload, process.env.JWT_REFRESH_SECRET, { expiresIn: "1d" });
        return { accessToken, refreshToken };
    }
    saveRefreshToken(userId, token) {
        return __awaiter(this, void 0, void 0, function* () {
            const tokenData = yield token_model_1.Token.findOne({ where: { userId } });
            if (tokenData)
                return yield tokenData.update({ token });
            else
                return yield token_model_1.Token.create({ userId, token });
        });
    }
    removeRefreshToken(token) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield token_model_1.Token.destroy({ where: { token } });
            }
            catch (e) {
                throw new Error(`Error when deleting a token (tokenService -> removeRefreshToken): ${e.message}`);
            }
        });
    }
    validateToken(token, secretKey) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = jsonwebtoken_1.default.verify(token, secretKey);
                return data;
            }
            catch (e) {
                return null;
            }
        });
    }
    findToken(token) {
        return __awaiter(this, void 0, void 0, function* () {
            const tokenData = yield token_model_1.Token.findOne({ where: { token } });
            return tokenData;
        });
    }
}
exports.default = new TokenService();
