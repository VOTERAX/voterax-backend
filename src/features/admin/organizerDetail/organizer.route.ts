import express from "express";
const router = express.Router();
import OrganizerDetailController from "./organizer.controller";
import OrganizerDetailService from "./organizer.service";
import { OrganizerDetailValidation } from "./organizer.validation"
import { AdminAuthMiddleware } from "../../middlewares/adminAuth.middleware";


const organizerDetailService = new OrganizerDetailService()
const organizerCampaignController = new OrganizerDetailController({ organizerDetailService})


router.get("/organizers", AdminAuthMiddleware,  organizerCampaignController.getAllOganizer);
router.get("/organizer/:organizerId", AdminAuthMiddleware,  organizerCampaignController.getsingleOrganizer);
router.post("/organizer/status", AdminAuthMiddleware, OrganizerDetailValidation.changeOrganizerStatusParams, OrganizerDetailValidation.validateFormData,  organizerCampaignController.changeOrganizerAccountStatus);

export default router;