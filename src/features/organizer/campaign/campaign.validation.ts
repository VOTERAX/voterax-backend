import { body, query, validationResult } from "express-validator";
import { Request, Response, NextFunction } from "express";

export const validateFormData = (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }
    next();
};

export const campaignParams = [
  body("title").notEmpty().withMessage("Title is required"),

  body("category")
    .notEmpty()
    .isIn(["BOUNTY", "AIRDROP", "QUEST"])
    .withMessage("Invalid campaign category"),

  body("description").optional().isString(),

  body("startDate").optional().isISO8601().toDate(),
  body("endDate").optional().isISO8601().toDate(),

  body("treasuryPool")
    .notEmpty()
    .isNumeric()
    .withMessage("Treasury pool must be a number"),

  body("cpPerTask")
    .notEmpty()
    .isInt({ min: 0 })
    .withMessage("CP per task must be a valid integer"),
];

export const taskParams = [
  body("tasks").isArray().withMessage("Tasks must be an array"),

  body("tasks.*.title").notEmpty().withMessage("Task title is required"),

  body("tasks.*.description").optional().isString(),

  body("tasks.*.type")
    .optional()
    .isIn(["TWITTER", "DISCORD", "TELEGRAM", "CUSTOM"])
    .withMessage("Invalid task type"),

  body("tasks.*.link").optional().isString(),
];

export const requirementParams = [
  body("requirements").isArray().withMessage("Requirements must be an array"),

  body("requirements.*.title")
    .notEmpty()
    .withMessage("Requirement title is required"),

  body("requirements.*.description").optional().isString(),
];

export const rewardParams = [
  body("rewards").isArray().withMessage("Rewards must be an array"),

  body("rewards.*.position")
    .notEmpty()
    .withMessage("Reward position must be a positive integer"),

  body("rewards.*.amount")
    .notEmpty()
    .isNumeric()
    .withMessage("Reward amount must be a number"),
];


export const createCampaignParams = [
  ...campaignParams,
  ...taskParams,
  ...requirementParams,
  ...rewardParams,
];

export const AddTaskParams = [
 body("campaignId").notEmpty().withMessage("campaignId is required"),
  ...taskParams,
];

export const AddRequirementParams = [
 body("campaignId").notEmpty().withMessage("campaignId is required"),
  ...requirementParams,
];

export const AddRewordParams = [
 body("campaignId").notEmpty().withMessage("campaignId is required"),
  ...rewardParams,
];



export const OrganizerCampaignValidation = {
    validateFormData,
    createCampaignParams,
    AddTaskParams,
    AddRequirementParams,
    AddRewordParams
    
}