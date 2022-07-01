import { DataTypes } from "sequelize";
import sequelize from "../db";

export const Mail = sequelize.define("mail", {
    id: { type: DataTypes.UUID, primaryKey: true, unique: true, defaultValue: DataTypes.UUIDV4 },
    text: { type: DataTypes.TEXT },
});
