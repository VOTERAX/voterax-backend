import { Request, Response } from "express";
import CampaignService from "./campaign.service";
import { ApprovedCampignDto, CampaignDetailDto, ChangeCampignStatusDto } from "../../../shared/types/admin/campaign.interface";


class CampaignController {
     private _CampaignService: CampaignService;
    
    constructor({ campaignService } : {campaignService: CampaignService, }) {
        this._CampaignService = campaignService;
    }

    public getAllPendingCampaign = async (req: Request, res: Response)  => {
        const {page, limit, search}  = req.query

        const query: CampaignDetailDto = {limit: parseFloat(limit as string), page: parseFloat(page as string), search: search as string}
        
        const { data, errors } = await this._CampaignService.getAllPendingCampaign(query);

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

    public approveCampaign = async (req: Request, res: Response)  => {
         const body: ApprovedCampignDto  = req.body
        
        const { data, errors } = await this._CampaignService.approveCampaign(body);

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

    public disapproveCampaign = async (req: Request, res: Response)  => {
         const body: ApprovedCampignDto  = req.body
        
        const { data, errors } = await this._CampaignService.disapproveCampaign(body);

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

    public getAllCampign = async (req: Request, res: Response)  => {
        const {page, limit, search, status}  = req.query

        const query: CampaignDetailDto = {limit: parseFloat(limit as string), page: parseFloat(page as string), search: search as string, status: status as string}
        
        const { data, errors } = await this._CampaignService.getAllCampign(query);

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

    public changeCampaignStatus = async (req: Request, res: Response)  => {
         const body: ChangeCampignStatusDto  = req.body
        
        const { data, errors } = await this._CampaignService.changeCampaignStatus(body);

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

    public getSingleCampign = async (req: Request, res: Response)  => {
        const {campaignId}  = req.params
        
        const { data, errors } = await this._CampaignService.getSingleCampign( campaignId);

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

    public getAllTask = async (req: Request, res: Response)  => {
        const {page, limit}  = req.query

        const query: CampaignDetailDto = {limit: parseFloat(limit as string), page: parseFloat(page as string)}

        const {campaignId}  = req.params
        
        const { data, errors } = await this._CampaignService.getAllTask(query, campaignId);

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

    public getAllRequirement = async (req: Request, res: Response)  => {
        const {page, limit}  = req.query

        const query: CampaignDetailDto = {limit: parseFloat(limit as string), page: parseFloat(page as string)}

        const {campaignId}  = req.params
        
        const { data, errors } = await this._CampaignService.getAllRequirement(query, campaignId);

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

    public getAllReword = async (req: Request, res: Response)  => {
        const {page, limit}  = req.query

        const query: CampaignDetailDto = {limit: parseFloat(limit as string), page: parseFloat(page as string)}

        const {campaignId}  = req.params
        
        const { data, errors } = await this._CampaignService.getAllReword(query, campaignId);

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

export default CampaignController;