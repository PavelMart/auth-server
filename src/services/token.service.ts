import jwt from "jsonwebtoken";
import { Token } from "../models/token.model";
import { TokenModel } from "../types/types";

type ValidateData = {
    id: string;
    email: string;
};

class TokenService {
    generateTokens(payload: { id: string; email: string }) {
        const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET, { expiresIn: "30m" });
        const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, { expiresIn: "1d" });

        return { accessToken, refreshToken };
    }

    async saveRefreshToken(userId: string, token: string) {
        const tokenData = await Token.findOne({ where: { userId } });
        if (tokenData) return await tokenData.update({ token });
        else return await Token.create({ userId, token });
    }

    async removeRefreshToken(token: string) {
        try {
            return await Token.destroy({ where: { token } });
        } catch (e: any) {
            throw new Error(`Error when deleting a token (tokenService -> removeRefreshToken): ${e.message}`);
        }
    }

    async validateToken(token: string, secretKey: string) {
        try {
            const data = jwt.verify(token, secretKey);
            return data as ValidateData;
        } catch (e) {
            return null;
        }
    }

    async findToken(token: string): Promise<TokenModel | null> {
        const tokenData = await Token.findOne({ where: { token } });
        return tokenData;
    }
}

export default new TokenService();
