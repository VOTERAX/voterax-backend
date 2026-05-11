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
    body("email").isEmail(),
    body("password").notEmpty(),
];


export const resendEmailParams = [
    body("email").isEmail(),
];

export const verifyEmailParams = [
    body("email").isEmail(),
    body("otp").notEmpty(),
];

export const loginParams = [
    body("email").isEmail(),
    body("password").notEmpty(),
];

export const resetPasswordParams = [
    body("email").isEmail(),
    body("otp").notEmpty(),
    body("password").notEmpty(),
];

export const AdminAuthValidation = {
    validateFormData,
    registerParams,
    resendEmailParams,
    verifyEmailParams,
    loginParams,
    resetPasswordParams,
}