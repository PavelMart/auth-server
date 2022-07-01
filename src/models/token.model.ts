import { User } from "./user.model";
import { CreationOptional, DataTypes, InferAttributes, InferCreationAttributes, Model } from "sequelize";
import sequelize from "../db";

export interface TokenModel extends Model<InferAttributes<TokenModel>, InferCreationAttributes<TokenModel>> {
    id: CreationOptional<string>;
    token: string;
    userId: CreationOptional<string>;
}

export const Token = sequelize.define<TokenModel>("token", {
    id: { type: DataTypes.UUID, primaryKey: true, unique: true, defaultValue: DataTypes.UUIDV4 },
    token: { type: DataTypes.STRING(1000), allowNull: false, unique: true },
    userId: { type: DataTypes.UUID, references: { model: User } },
});
