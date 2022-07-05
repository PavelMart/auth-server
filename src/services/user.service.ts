import { User } from "../models/user.model";
import bcrypt from "bcryptjs";
import UserDto from "../dtos/UserDto";
import tokenService from "./token.service";
import ApiError from "../error/ApiError";
import { Token } from "../models/token.model";
import boxService from "./box.service";
import { Box } from "../models/box.model";
import BoxDto from "../dtos/BoxDto";
import { UserFromServiceType, UserModel } from "../types/types";

class UserService {
    async registration(email: string, password: string): Promise<UserFromServiceType> {
        try {
            const candidate = await User.findOne({ where: { email } });
            if (candidate) {
                throw new Error("User already exists");
            }
            const hashPassword = await bcrypt.hash(password, 5);
            const user = await User.create({ email, password: hashPassword });
            const boxes = await boxService.createBoxes(user.id, user.email, 3);

            const responseData = this.createResponseData(user);
            return responseData;
        } catch (e: any) {
            throw new Error(`Service error (registration): ${e.message}`);
        }
    }

    async login(email: string, password: string) {
        try {
            const user = await User.findOne({ where: { email } });
            if (!user) {
                throw new Error("User isn't exists");
            }
            const isValidPassword = await bcrypt.compare(password, user.password);
            if (!isValidPassword) {
                throw new Error("Password isn't correct");
            }

            const responseData = this.createResponseData(user);
            return responseData;
        } catch (e: any) {
            throw new Error(`Service error (login): ${e.message}`);
        }
    }

    async logout(token: string) {
        try {
            return await tokenService.removeRefreshToken(token);
        } catch (e: any) {
            throw new Error(`Service error (logout): ${e.message}`);
        }
    }

    async refresh(token: string) {
        try {
            if (!token) {
                throw ApiError.Unauthorized();
            }
            const validateData = await tokenService.validateToken(token, process.env.JWT_REFRESH_SECRET);
            const tokenFromDb = await tokenService.findToken(token);
            if (!validateData || !tokenFromDb) {
                throw ApiError.Unauthorized();
            }
            const user = await User.findOne({ where: { id: validateData.id } });
            if (!user) {
                throw new Error(`User wasn't find`);
            }
            const responseData = await this.createResponseData(user);
            return responseData;
        } catch (e: any) {
            throw new Error(`Service error (refresh): ${e.message}`);
        }
    }

    async getUsers() {
        try {
            const users = await User.findAll({ include: [{ model: Token }, { model: Box }] });
            return users;
        } catch (e: any) {
            throw new Error(`Service error (getUsers): ${e.message}`);
        }
    }

    async createResponseData(user: UserModel) {
        const userDto = new UserDto(user.id, user.email);

        const tokens = tokenService.generateTokens({ ...userDto });
        await tokenService.saveRefreshToken(userDto.id, tokens.refreshToken);

        return { ...userDto, ...tokens };
    }
}
export default new UserService();
