import { NextFunction, Response, Request } from "express";
import ApiError from "../error/ApiError";
import boxService from "../services/box.service";
import mailService from "../services/mail.service";

interface QueryParamsRequest extends Request {
    params: {
        id: string;
    };
    query: {
        id: string;
    };
}

class MailController {
    async deleteMails(req: QueryParamsRequest, res: Response, next: NextFunction) {
        try {
            const { id: boxId } = req.params;
            const { id: mailId } = req.query;

            if (mailId) await mailService.deleteMail(mailId);
            else await mailService.clearBox(boxId);

            const mails = await mailService.getBoxMails(boxId);

            return res.json(mails);
        } catch (e: any) {
            return next(new Error(e.message));
        }
    }
    async createMail(req: Request, res: Response, next: NextFunction) {
        try {
            const { body } = req;
            const box = await boxService.getBox(body.to);
            if (!box) return next(ApiError.BadRequest("Email не найден"));
            const mail = await mailService.createMail(box.id, body.from, body.html, body.theme);

            return res.json(mail);
        } catch (e: any) {
            return next(ApiError.BadRequest(e.message));
        }
    }
}

export default new MailController();
