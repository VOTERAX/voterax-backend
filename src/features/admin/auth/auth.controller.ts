import { Request, Response } from "express";
import AdminAuthService from "./auth.service";
import { IAdminLogin, IAdminRegistration, IAdminReSendEmail, IAdminReSetPassword, IAdminVerifyEmail } from "../../../shared/types/admin/adminAuth.interface";

class AdminAuthController {
    private _AdminAuthService: AdminAuthService;
    
    constructor({  adminAuthService } : {adminAuthService: AdminAuthService, }) {
        this._AdminAuthService = adminAuthService;
    }

    public register = async (req: Request, res: Response)  => {
        const body: IAdminRegistration  = req.body
        
        const { user, errors } = await this._AdminAuthService.register(body);

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
        const body: IAdminReSendEmail  = req.body
        
        const { user, errors } = await this._AdminAuthService.resendEmail(body);

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
        const body: IAdminVerifyEmail  = req.body
        
        const { user, errors } = await this._AdminAuthService.verifyEmail(body);

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
        const body: IAdminLogin  = req.body
        
        const { user, errors } = await this._AdminAuthService.login(body);

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
        const body: IAdminReSendEmail  = req.body
        
        const { user, errors } = await this._AdminAuthService.forgotPassword(body);

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
        const body: IAdminReSetPassword  = req.body
        
        const { user, errors } = await this._AdminAuthService.resetPassword(body);

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

export default AdminAuthController;

    