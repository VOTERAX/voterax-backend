import { body, query, validationResult } from "express-validator";
import { Request, Response, NextFunction } from "express";

export const validateFormData = (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }
    next();
};

export const changeOrganizerStatusParams = [
    body("organizerId").notEmpty(),
    body("status").notEmpty(),
];

export const OrganizerDetailValidation = {
    validateFormData,
    changeOrganizerStatusParams,
}