import { Request, Response } from "express";
import OrganizerDetailService from "./organizer.service";
import { ChangeOrganizerAccountStatusDto, OrganizerDetailDto } from "../../../shared/types/admin/organizerDetail.interface";


class OrganizerDetailController {
    private _OrganizerDetailService: OrganizerDetailService;
    
    constructor({ organizerDetailService } : {organizerDetailService: OrganizerDetailService, }) {
        this._OrganizerDetailService = organizerDetailService;
    }

    public getAllOganizer = async (req: Request, res: Response)  => {
        const {page, limit, search, status}  = req.query

        const query: OrganizerDetailDto = {limit: parseFloat(limit as string), page: parseFloat(page as string), search: search as string, status: status as string,}
        
        const { data, errors } = await this._OrganizerDetailService.getAllOganizer(query);

        if (errors && errors.length > 0) return res.status(401).json({
            error: errors,
            code: 401,
            status: false
        });
    
        if (data === null) return res.status(401).json({
            code: 401,
            status: false
        });
    
        return res.status(200).json({
            data: data,
            code: 200,
            status: true
        });
    
    }

    public getsingleOrganizer = async (req: Request, res: Response)  => {
        const {organizerId}  = req.params
        
        const { data, errors } = await this._OrganizerDetailService.getsingleOrganizer( organizerId);

        if (errors && errors.length > 0) return res.status(401).json({
            error: errors,
            code: 401,
            status: false
        });
    
        if (data === null) return res.status(401).json({
            code: 401,
            status: false
        });
    
        return res.status(200).json({
            data: data,
            code: 200,
            status: true
        });
    }

    public changeOrganizerAccountStatus = async (req: Request, res: Response)  => {
        const body: ChangeOrganizerAccountStatusDto  = req.body
        
        const { data, errors } = await this._OrganizerDetailService.changeOrganizerAccountStatus(body);

        if (errors && errors.length > 0) return res.status(401).json({
            error: errors,
            code: 401,
            status: false
        });
    
        if (data === null) return res.status(401).json({
            code: 401,
            status: false
        });
    
        return res.status(200).json({
            data: data,
            code: 200,
            status: true
        });
    
    }

}

export default OrganizerDetailController;