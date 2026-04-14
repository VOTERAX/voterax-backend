import { body, query, validationResult } from "express-validator";
import { Request, Response, NextFunction } from "express";

export const validateFormData = (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }
    next();
};

export const registerParams = [
    body("companyEmail").isEmail(),
    body("firstName").notEmpty(),
    body("lastName").notEmpty(),
    body("telegram").notEmpty(),
    body("companyName").notEmpty(),
    body("url").notEmpty(),
    body("companyX").notEmpty(),
    body("entityName").notEmpty(),
    body("industry").notEmpty(),
    body("bio").notEmpty(),
    body("souceOFfund").notEmpty(),
    body("password").notEmpty(),
    body("userName").notEmpty()
];

export const resendEmailParams = [
    body("companyEmail").isEmail(),
];

export const verifyEmailParams = [
    body("companyEmail").isEmail(),
    body("otp").notEmpty(),
];

export const loginParams = [
    body("companyEmail").isEmail(),
    body("password").notEmpty(),
];

export const resetPasswordParams = [
    body("companyEmail").isEmail(),
    body("otp").notEmpty(),
    body("password").notEmpty(),
];

export const OrganizerAuthValidation = {
    validateFormData,
    registerParams,
    resendEmailParams,
    verifyEmailParams,
    loginParams,
    resetPasswordParams
}