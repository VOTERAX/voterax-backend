import express from "express";
const router = express.Router();
import OrganizerAuthController from "./auth.controller";
import OrganzationAuthService from "./auth.service";
import { OrganizerAuthValidation } from "./auth.validation";
import { multipleFieldsUploadWithDifferentName, multipleFileUpload, singleFileUpload } from "../../middlewares/fileupload.middleware";
import { OrganizerAuthMiddleware } from "../../middlewares/organizerAuth.middleware";


const orgainizerAuthService = new OrganzationAuthService()
const organizerAuthController = new OrganizerAuthController({orgainizerAuthService})


router.post("/signup", OrganizerAuthValidation.registerParams, OrganizerAuthValidation.validateFormData, organizerAuthController.register);
router.post("/resend-email", OrganizerAuthValidation.resendEmailParams, OrganizerAuthValidation.validateFormData, organizerAuthController.resendEmail);
router.post("/verify-email", OrganizerAuthValidation.verifyEmailParams, OrganizerAuthValidation.validateFormData, organizerAuthController.verifyEmail);
router.post("/login", OrganizerAuthValidation.loginParams, OrganizerAuthValidation.validateFormData, organizerAuthController.login);
router.post("/forgot-password", OrganizerAuthValidation.resendEmailParams, OrganizerAuthValidation.validateFormData, organizerAuthController.forgotPassword);
router.post("/reset-password", OrganizerAuthValidation.resetPasswordParams, OrganizerAuthValidation.validateFormData, organizerAuthController.resetPassword);


router.post("/update-profile", OrganizerAuthMiddleware, multipleFieldsUploadWithDifferentName([{name: "picture", maxCount: 1}, {name: "logo", maxCount: 1}], ['image'], true), OrganizerAuthValidation.profileParams, OrganizerAuthValidation.validateFormData, organizerAuthController.profile);

export default router;