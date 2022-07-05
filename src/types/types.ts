import { Request } from "express";
import { CreationOptional, InferAttributes, InferCreationAttributes, Model } from "sequelize";

export type UserFromServiceType = {
    id: string;
    email: string;
    accessToken: string;
    refreshToken: string;
};

export type UserBodyForLogReg = {
    email: string;
    password: string;
};

export interface CustomRequest<T> extends Request {
    body: T;
}

export interface MailRequest extends Request {
    params: {
        id: string;
    };
}

export interface RequestWithUser extends Request {
    user?: {
        id: string;
        email: string;
    } | null;
}

export interface CustomRequestWithUser<T> extends CustomRequest<T> {
    user?: {
        id: string;
        email: string;
    } | null;
}

/////////// MODELS TYPES /////////////////

export interface UserModel extends Model<InferAttributes<UserModel>, InferCreationAttributes<UserModel>> {
    id: CreationOptional<string>;
    email: string;
    password: string;
}

export interface TokenModel extends Model<InferAttributes<TokenModel>, InferCreationAttributes<TokenModel>> {
    id: CreationOptional<string>;
    token: string;
    userId: CreationOptional<string>;
}

export interface BoxModel extends Model<InferAttributes<BoxModel>, InferCreationAttributes<BoxModel>> {
    id: CreationOptional<string>;
    email: string;
    userId: CreationOptional<string>;
}

export interface MailModel extends Model<InferAttributes<MailModel>, InferCreationAttributes<MailModel>> {
    id: CreationOptional<string>;
    from: string;
    theme: string;
    html: string;
    boxId: CreationOptional<string>;
}
