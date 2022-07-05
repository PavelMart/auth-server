"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const box_controller_js_1 = __importDefault(require("../controllers/box.controller.js"));
const mail_controller_js_1 = __importDefault(require("../controllers/mail.controller.js"));
const authMiddleware_js_1 = __importDefault(require("../middleware/authMiddleware.js"));
const router = (0, express_1.Router)();
router.get("/", authMiddleware_js_1.default, box_controller_js_1.default.getBoxes);
router.get("/:id", authMiddleware_js_1.default, box_controller_js_1.default.getMailsFromBox);
router.delete("/:id", authMiddleware_js_1.default, mail_controller_js_1.default.deleteMails);
exports.default = router;
