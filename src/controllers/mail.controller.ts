import { NextFunction, Response, Request } from "express";
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
            throw new Error(e.message);
        }
    }
}

export default new MailController();
