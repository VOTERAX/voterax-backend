import { Request, Response } from "express";
import UserAuthService from "./auth.service";
import { IUserRegistration } from "../../../shared/types/user/userAuth.interface";

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

    public login = async ({body }: { body: IUserRegistration }, res: Response)  => {
      
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

}

export default UserAuthController;

    