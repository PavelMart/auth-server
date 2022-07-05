import { NextFunction, Response, Request } from "express";
import ApiError from "../error/ApiError";
import boxService from "../services/box.service";
import mailService from "../services/mail.service";
import { MailRequest, RequestWithUser } from "../types/types";

interface QueryParamsRequest extends Request {
    params: {
        id: string;
    };
    query: {
        id: string;
    };
}

class BoxController {
    async getBoxes(req: RequestWithUser, res: Response, next: NextFunction) {
        try {
            const user = req.user;

            if (!user) throw ApiError.Unauthorized();

            const boxes = await boxService.getBoxes(user.id);
            return res.json(boxes);
        } catch (e: any) {
            throw new Error(e.message);
        }
    }

    async getMailsFromBox(req: MailRequest, res: Response, next: NextFunction) {
        try {
            const { id } = req.params;
            const mails = await mailService.getBoxMails(id);

            return res.json(mails);
        } catch (e: any) {
            throw new Error(e.message);
        }
    }
}

export default new BoxController();
