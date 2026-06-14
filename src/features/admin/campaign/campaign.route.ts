import express from "express";
const router = express.Router();
import CampaignController from "./campaign.controller";
import CampaignService from "./campaign.service";
import {  CampaignValidation } from "./campaign.validation"
import { AdminAuthMiddleware } from "../../middlewares/adminAuth.middleware";


const campaignService = new CampaignService ()
const campaignController = new CampaignController({ campaignService})


router.get("/pending-campaigns", AdminAuthMiddleware,  campaignController.getAllPendingCampaign);
router.post("/approve-campaign", AdminAuthMiddleware, CampaignValidation.approveCampaignParams, CampaignValidation.validateFormData,  campaignController.approveCampaign);
router.post("/disapprove-campaign", AdminAuthMiddleware, CampaignValidation.approveCampaignParams, CampaignValidation.validateFormData,  campaignController.disapproveCampaign);
router.get("/campaigns", AdminAuthMiddleware,  campaignController.getAllCampign);
router.post("/change-campaign-status", AdminAuthMiddleware, CampaignValidation.changeCampaignStatusCampaignParams, CampaignValidation.validateFormData, campaignController.changeCampaignStatus);
router.get("/campaign/:campaignId", AdminAuthMiddleware,  campaignController.getSingleCampign);
router.get("/campaign-tasks/:campaignId", AdminAuthMiddleware,  campaignController.getAllTask);
router.get("/campaign-requirement/:campaignId", AdminAuthMiddleware,  campaignController.getAllRequirement);
router.get("/campaign-reward/:campaignId", AdminAuthMiddleware,  campaignController.getAllReword);

export default router;