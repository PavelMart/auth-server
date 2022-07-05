import MailDto from "../dtos/MailDto";
import { Mail } from "../models/mail.model";

class MailService {
    async createMail(boxId: string, from: string, html: string, theme: string) {
        try {
            return await Mail.create({ from, html, theme, boxId });
        } catch (e: any) {
            throw new Error(e.message);
        }
    }

    async deleteMail(id: string) {
        try {
            return await Mail.destroy({ where: { id } });
        } catch (e: any) {
            throw new Error(e.message);
        }
    }

    async clearBox(boxId: string) {
        try {
            return await Mail.destroy({ where: { boxId } });
        } catch (e: any) {
            throw new Error(e.message);
        }
    }

    async getBoxMails(boxId: string) {
        try {
            const mails = await Mail.findAll({ where: { boxId } });
            const mailsDto = mails.map((mail) => new MailDto(mail));
            return mailsDto;
        } catch (e: any) {
            throw new Error(e.message);
        }
    }
}

export default new MailService();
