import express from "express";
const router = express.Router();
import OrganizerCampaignController from "./campaign.controller";
import OrganzationCampaignService from "./campaign.service";
import { OrganizerCampaignValidation } from "./campaign.validation";
import { OrganizerAuthMiddleware } from "../../middlewares/organizerAuth.middleware";


const organzationCampaignService = new OrganzationCampaignService()
const organizerCampaignController = new OrganizerCampaignController({organzationCampaignService})


router.post("/create-compaign", OrganizerAuthMiddleware, OrganizerCampaignValidation.createCampaignParams, OrganizerCampaignValidation.validateFormData, organizerCampaignController.createCampign);
router.get("/compaigns", OrganizerAuthMiddleware,  organizerCampaignController.getAllCampign);
router.get("/compaign/:campaignId", OrganizerAuthMiddleware,  organizerCampaignController.getsingleCampign);

router.post("/add-tasks", OrganizerAuthMiddleware, OrganizerCampaignValidation.AddTaskParams, OrganizerCampaignValidation.validateFormData, organizerCampaignController.addTask);
router.post("/add-requirements", OrganizerAuthMiddleware, OrganizerCampaignValidation.AddRequirementParams, OrganizerCampaignValidation.validateFormData, organizerCampaignController.addRequirement);
router.post("/add-rewords", OrganizerAuthMiddleware, OrganizerCampaignValidation.AddRewordParams, OrganizerCampaignValidation.validateFormData, organizerCampaignController.addReword);

router.get("/tasks/:campaignId", OrganizerAuthMiddleware,  organizerCampaignController.getAllTask);
router.get("/requirements/:campaignId", OrganizerAuthMiddleware,  organizerCampaignController.getAllRequirement);
router.get("/rewords/:campaignId", OrganizerAuthMiddleware,  organizerCampaignController.getAllReword);

export default router;