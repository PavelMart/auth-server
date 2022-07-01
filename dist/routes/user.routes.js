"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_controller_js_1 = __importDefault(require("../controllers/user.controller.js"));
const express_1 = require("express");
const authMiddleware_js_1 = __importDefault(require("../middleware/authMiddleware.js"));
const express_validator_1 = require("express-validator");
const router = (0, express_1.Router)();
router.post("/registration", [(0, express_validator_1.body)("email").isEmail(), (0, express_validator_1.body)("password").isLength({ min: 6 }), (0, express_validator_1.body)("password").isLength({ max: 12 })], user_controller_js_1.default.registration);
router.post("/login", [(0, express_validator_1.body)("email").isEmail(), (0, express_validator_1.body)("password").isLength({ min: 6 }), (0, express_validator_1.body)("password").isLength({ max: 12 })], user_controller_js_1.default.login);
router.get("/logout", user_controller_js_1.default.logout);
router.get("/refresh", user_controller_js_1.default.refresh);
router.get("/", authMiddleware_js_1.default, user_controller_js_1.default.getUsers);
exports.default = router;
