import { Request, Response } from "express";
import UserAuthService from "./auth.service";
import { IUserLogin, IUserRegistration, IUserReSendEmail, IUserReSetPassword, IUserVerifyEmail } from "../../../shared/types/user/userAuth.interface";

class UserAuthController {
    private _UserAuthService: UserAuthService;
    
    constructor({ userAuthService } : {userAuthService: UserAuthService, }) {
        this._UserAuthService = userAuthService;
    }

    public register = async ({body }: { body: IUserRegistration }, res: Response)  => {
      
      const { user, errors } = await this._UserAuthService.register(body);

    if (errors && errors.length > 0) return res.status(401).json({
        error: errors,
        code: 401,
        status: false
      });
  
      if (user === null) return res.status(401).json({
        code: 401,
        status: false
      });
  
      return res.status(201).json({
        data: user,
        code: 201,
        status: true
      });
    
    }

    public resendEmail = async (req: Request, res: Response)  => {
      const body: IUserReSendEmail  = req.body
      
      const { user, errors } = await this._UserAuthService.resendEmail(body);

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
      const body: IUserVerifyEmail  = req.body
      
      const { user, errors } = await this._UserAuthService.verifyEmail(body);

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

    public login = async ({body }: { body: IUserLogin }, res: Response)  => {
      
      const { user, errors } = await this._UserAuthService.login(body);

      if (errors && errors.length > 0) return res.status(401).json({
          error: errors,
          code: 401,
          status: false
      });
  
      if (user === null) return res.status(401).json({
        code: 401,
        status: false
      });
  
      return res.status(201).json({
        data: user,
        code: 201,
        status: true
      });
    
    }

    public forgotPassword = async (req: Request, res: Response)  => {
      const body: IUserReSendEmail  = req.body
      
      const { user, errors } = await this._UserAuthService.forgotPassword(body);

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
        const body: IUserReSetPassword  = req.body
        
        const { user, errors } = await this._UserAuthService.resetPassword(body);

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

export default UserAuthController;

    