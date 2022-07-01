import userController from "../controllers/user.controller.js";

import { Router } from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import { body } from "express-validator";
const router = Router();

router.post(
    "/registration",
    [body("email").isEmail(), body("password").isLength({ min: 6 }), body("password").isLength({ max: 12 })],
    userController.registration
);
router.post(
    "/login",
    [body("email").isEmail(), body("password").isLength({ min: 6 }), body("password").isLength({ max: 12 })],
    userController.login
);
router.get("/logout", userController.logout);
router.get("/refresh", userController.refresh);
router.get("/", authMiddleware, userController.getUsers);

export default router;
