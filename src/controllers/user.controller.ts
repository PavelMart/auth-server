import { Request, Response, NextFunction } from "express";
import ApiError from "../error/ApiError";
import userService from "../services/user.service";
import { CustomRequestWithUser, UserBodyForLogReg, UserFromServiceType } from "../types/types";

class UserController {
    async registration(req: CustomRequestWithUser<UserBodyForLogReg>, res: Response, next: NextFunction) {
        try {
            const { email, password } = req.body;
            const user: UserFromServiceType = await userService.registration(email, password);
            res.cookie("refresh_token", user.refreshToken, { httpOnly: true, maxAge: 24 * 60 * 60 * 1000 });
            res.json(user);
        } catch (e: any) {
            next(ApiError.BadRequest(e.message));
        }
    }

    async login(req: CustomRequestWithUser<UserBodyForLogReg>, res: Response, next: NextFunction) {
        try {
            const { email, password } = req.body;
            const user: UserFromServiceType = await userService.login(email, password);
            res.cookie("refresh_token", user.refreshToken, { httpOnly: true, maxAge: 24 * 60 * 60 * 1000 });
            res.json(user);
        } catch (e: any) {
            next(ApiError.BadRequest(e.message));
        }
    }

    async logout(req: Request, res: Response, next: NextFunction) {
        try {
            const { refresh_token } = req.cookies;
            await userService.logout(refresh_token);
            res.clearCookie("refresh_token");
            return res.json(1);
        } catch (e: any) {
            next(ApiError.BadRequest(e.message));
        }
    }

    async refresh(req: Request, res: Response, next: NextFunction) {
        try {
            const { refresh_token } = req.cookies;
            const user: UserFromServiceType = await userService.refresh(refresh_token);
            res.cookie("refresh_token", user.refreshToken, { httpOnly: true, maxAge: 24 * 60 * 60 * 1000 });
            return res.json(user);
        } catch (e: any) {
            next(ApiError.BadRequest(e.message));
        }
    }

    async getUsers(req: Request, res: Response, next: NextFunction) {
        try {
            const users = await userService.getUsers();
            return res.json(users);
        } catch (e: any) {
            next(ApiError.BadRequest(e.message));
        }
    }
}

export default new UserController();
