import express from "express";
const router = express.Router();
import AdminAuthController from "./auth.controller";
import AdminAuthService from "./auth.service";
import { AdminAuthValidation } from "./auth.validation";


const adminAuthService = new AdminAuthService()
const adminAuthController = new AdminAuthController({adminAuthService})


router.post("/signup", AdminAuthValidation.registerParams, AdminAuthValidation.validateFormData, adminAuthController.register);
router.post("/resend-email", AdminAuthValidation.resendEmailParams, AdminAuthValidation.validateFormData, adminAuthController.resendEmail);
router.post("/verify-email", AdminAuthValidation.verifyEmailParams, AdminAuthValidation.validateFormData, adminAuthController.verifyEmail);
router.post("/login", AdminAuthValidation.loginParams, AdminAuthValidation.validateFormData, adminAuthController.login);
router.post("/forgot-password", AdminAuthValidation.resendEmailParams, AdminAuthValidation.validateFormData, adminAuthController.forgotPassword);
router.post("/reset-password", AdminAuthValidation.resetPasswordParams, AdminAuthValidation.validateFormData, adminAuthController.resetPassword);


export default router;