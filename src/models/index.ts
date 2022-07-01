import { Box } from "./box.model";
import { Mail } from "./mail.model";
import { Token } from "./token.model";
import { User } from "./user.model";
import sequelize from "../db";

User.hasOne(Token);
Token.belongsTo(User);

User.hasMany(Box);
Box.belongsTo(User);

Box.hasMany(Mail);
Mail.belongsTo(Box);

export default {
    sequelize,
    User,
    Token,
};
