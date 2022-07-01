import { Request, Response, NextFunction } from "express";
import ApiError from "../error/ApiError";
import tokenService from "../services/token.service";

interface CustomRequest extends Request {
    user?: {
        id: string;
        email: string;
    } | null;
}

export default async (req: CustomRequest, res: Response, next: NextFunction) => {
    try {
        const { authorization } = req.headers;

        if (!authorization) {
            return next(ApiError.Unauthorized());
        }

        const accessToken = String(authorization)?.split(" ")[1];
        if (!accessToken) {
            return next(ApiError.Unauthorized());
        }

        const validateData = await tokenService.validateToken(accessToken, process.env.JWT_ACCESS_SECRET);
        if (!validateData) {
            return next(ApiError.Unauthorized());
        }

        req.user = validateData;
        next();
    } catch (e) {
        next(ApiError.Unauthorized());
    }
};
