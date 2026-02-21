import express from "express";
const router = express.Router();
import UserAuthController from "./auth.controller";
import UserAuthService from "./auth.service";
import { AuthValidation } from "./auth.validation";


const userAuthService = new UserAuthService()
const userAuthController = new UserAuthController({userAuthService})

router.post("/signup", AuthValidation.registerParams, AuthValidation.validateFormData, userAuthController.register);
// router.post("/resend-email", AuthValidation.resendEmailParams, AuthValidation.validateFormData, authController.resendEmail);
// router.post("/verify-email", AuthValidation.verifyEmailParams, AuthValidation.validateFormData, authController.verifyEmail);
router.post("/login", AuthValidation.loginParams, AuthValidation.validateFormData, userAuthController.login);

export default router;