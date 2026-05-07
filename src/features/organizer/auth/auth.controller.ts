import { Request, Response } from "express";
import OrganzationAuthService from "./auth.service";
import { IOrganizerLogin, IOrganizerRegistration, IOrganizerReSendEmail, IOrganizerReSetPassword, IOrganizerUpdateProfile, IOrganizerVerifyEmail } from "../../../shared/types/organizer/organizerAuth.interface";
import { uploadToCloudinary } from "../../../shared/services/cloudinary/cloudinary.stream";

class OrganizerAuthController {
    private _OrganizerAuthService: OrganzationAuthService;
    
    constructor({ orgainizerAuthService } : {orgainizerAuthService: OrganzationAuthService, }) {
        this._OrganizerAuthService = orgainizerAuthService;
    }

    public register = async (req: Request, res: Response)  => {
        const body: IOrganizerRegistration  = req.body
        
        const { user, errors } = await this._OrganizerAuthService.register(body);

        if (errors && errors.length > 0) return res.status(401).json({
            error: errors,
            code: 401,
            status: false
        });
    
        if (user === null) return res.status(401).json({
            code: 401,
            status: false
        });
    
        return res.status(200).json({
            data: user,
            code: 200,
            status: true
        });
    
    }

    public resendEmail = async (req: Request, res: Response)  => {
        const body: IOrganizerReSendEmail  = req.body
        
        const { user, errors } = await this._OrganizerAuthService.resendEmail(body);

        if (errors && errors.length > 0) return res.status(401).json({
            error: errors,
            code: 401,
            status: false
        });
    
        if (user === null) return res.status(401).json({
            code: 401,
            status: false
        });
    
        return res.status(200).json({
            data: user,
            code: 200,
            status: true
        });
    
    }

    public verifyEmail = async (req: Request, res: Response)  => {
        const body: IOrganizerVerifyEmail  = req.body
        
        const { user, errors } = await this._OrganizerAuthService.verifyEmail(body);

        if (errors && errors.length > 0) return res.status(401).json({
            error: errors,
            code: 401,
            status: false
        });
    
        if (user === null) return res.status(401).json({
            code: 401,
            status: false
        });
    
        return res.status(200).json({
            data: user,
            code: 200,
            status: true
        });
    
    }

    public login = async (req: Request, res: Response)  => {
        const body: IOrganizerLogin  = req.body
        
        const { user, errors } = await this._OrganizerAuthService.login(body);

        if (errors && errors.length > 0) return res.status(401).json({
            error: errors,
            code: 401,
            status: false
        });
    
        if (user === null) return res.status(401).json({
            code: 401,
            status: false
        });
    
        return res.status(200).json({
            data: user,
            code: 200,
            status: true
        });
    
    }

    public forgotPassword = async (req: Request, res: Response)  => {
        const body: IOrganizerReSendEmail  = req.body
        
        const { user, errors } = await this._OrganizerAuthService.forgotPassword(body);

        if (errors && errors.length > 0) return res.status(401).json({
            error: errors,
            code: 401,
            status: false
        });
    
        if (user === null) return res.status(401).json({
            code: 401,
            status: false
        });
    
        return res.status(200).json({
            data: user,
            code: 200,
            status: true
        });
    
    }

    public resetPassword = async (req: Request, res: Response)  => {
        const body: IOrganizerReSetPassword  = req.body
        
        const { user, errors } = await this._OrganizerAuthService.resetPassword(body);

        if (errors && errors.length > 0) return res.status(401).json({
            error: errors,
            code: 401,
            status: false
        });
    
        if (user === null) return res.status(401).json({
            code: 401,
            status: false
        });
    
        return res.status(200).json({
            data: user,
            code: 200,
            status: true
        });
    
    }

    public profile = async (req: Request, res: Response)  => {
        const organizerId = req.organizer?.id!

        const files = req.files as {
            logo?: Express.Multer.File[];
            picture?: Express.Multer.File[];
        };

        const body: IOrganizerUpdateProfile  = req.body

        const logo = files.logo?.[0];
        const picture = files.picture?.[0];

        const uploadPicture = await uploadToCloudinary(picture!)
        const uploadLogo = await uploadToCloudinary(logo!)
        
        const { user, errors } = await this._OrganizerAuthService.profile(body, {picture: uploadPicture.secure_url, logo: uploadLogo.secure_url}, organizerId);

        if (errors && errors.length > 0) return res.status(401).json({
            error: errors,
            code: 401,
            status: false
        });
    
        if (user === null) return res.status(401).json({
            code: 401,
            status: false
        });
    
        return res.status(200).json({
            data: user,
            code: 200,
            status: true
        });
    
    }

}

export default OrganizerAuthController;

    