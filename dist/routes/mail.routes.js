"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const mail_controller_js_1 = __importDefault(require("../controllers/mail.controller.js"));
const authMiddleware_js_1 = __importDefault(require("../middleware/authMiddleware.js"));
const corsMiddleware_js_1 = require("../middleware/corsMiddleware.js");
const router = (0, express_1.Router)();
router.post("/", mail_controller_js_1.default.createMail);
router.delete("/:id", corsMiddleware_js_1.cors, authMiddleware_js_1.default, mail_controller_js_1.default.deleteMails);
exports.default = router;
