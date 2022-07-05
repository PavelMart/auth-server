import { DataTypes } from "sequelize";
import sequelize from "../db";
import { MailModel } from "../types/types";
import { Box } from "./box.model";

export const Mail = sequelize.define<MailModel>("mail", {
    id: { type: DataTypes.UUID, primaryKey: true, unique: true, defaultValue: DataTypes.UUIDV4 },
    from: { type: DataTypes.STRING },
    theme: { type: DataTypes.STRING },
    html: { type: DataTypes.TEXT },
    boxId: { type: DataTypes.UUID, references: { model: Box } },
});
