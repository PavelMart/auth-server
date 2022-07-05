import { Box } from "../models/box.model";
import { v4 } from "uuid";
import { BoxModel } from "../types/types";
import mailService from "./mail.service";
import BoxDto from "../dtos/BoxDto";

class BoxService {
    async createBox(userId: string, userName: string) {
        const email = `${userName}-${v4().slice(0, 4)}@test-server-by-pm.ru`;
        const box = await Box.create({ email, userId });

        return box;
    }

    async createBoxes(userId: string, userEmail: string, boxesNumber: number) {
        try {
            const boxes: BoxModel[] = [];
            const userNameTest = userEmail.match(/[a-z0-9_-]+@/);

            if (userNameTest === null) throw new Error("Ошибка определения имени пользователя с помощью RegExp");

            const userName = userNameTest[0].slice(0, -1);

            for (let i = 0; i < boxesNumber; i++) {
                const box = await this.createBox(userId, userName);
                await mailService.createMail(
                    box.id,
                    "От разработчика",
                    `<div style="width:100%;background-color:white;padding:25px;border-radius:25px;color:lightblue;display:flex;flex-direction:column;align-items:center"><h1>Это первое сообщение</h1><p>Оно создается автоматически для каждого ящика при регистрации</p></div>`,
                    "С любовью"
                );
                boxes.push(box);
            }

            return boxes;
        } catch (e: any) {
            throw new Error(e.message);
        }
    }

    async getBoxes(userId: string) {
        const boxes = await Box.findAll({ where: { userId } });
        const boxesDto = boxes.map((box) => new BoxDto(box.id, box.email));
        return boxesDto;
    }
}

export default new BoxService();
