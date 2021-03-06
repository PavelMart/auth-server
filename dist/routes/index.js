"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
const user_routes_1 = __importDefault(require("./user.routes"));
const box_routes_1 = __importDefault(require("./box.routes"));
const mail_routes_1 = __importDefault(require("./mail.routes"));
const corsMiddleware_1 = require("../middleware/corsMiddleware");
router.use("/users", corsMiddleware_1.cors, user_routes_1.default);
router.use("/boxes", corsMiddleware_1.cors, box_routes_1.default);
router.use("/mails", mail_routes_1.default);
exports.default = router;
