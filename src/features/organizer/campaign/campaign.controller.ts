import { Request, Response } from "express";
import OrganzationCampaignService from "./campaign.service";
import { CampaignPaginationDto, IAddReqiurement, IAddReward, IAddTask, ICreateFullCampaign } from "../../../shared/types/organizer/organizerCampaign.interface";

class OrganizerCampaignController {
    private _OrganzationCampaignService: OrganzationCampaignService;
    
    constructor({ organzationCampaignService } : {organzationCampaignService: OrganzationCampaignService, }) {
        this._OrganzationCampaignService = organzationCampaignService;
    }

    public createCampign = async (req: Request, res: Response)  => {
        const body: ICreateFullCampaign  = req.body
        const organizerId = req.organizer?.id!
        
        const { data, errors } = await this._OrganzationCampaignService.createCampign(body, organizerId);

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
        const {page, limit}  = req.query

        const query: CampaignPaginationDto = {limit: parseFloat(limit as string), page: parseFloat(page as string)}
        const organizerId = req.organizer?.id!
        
        const { data, errors } = await this._OrganzationCampaignService.getAllCampign(query, organizerId);

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

    public getsingleCampign = async (req: Request, res: Response)  => {
        const {campaignId}  = req.params

        const organizerId = req.organizer?.id!
        
        const { data, errors } = await this._OrganzationCampaignService.getsingleCampign(campaignId, organizerId);

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


    public sendCampigntoAdmin = async (req: Request, res: Response)  => {
        const {campaignId}  = req.params

        const organizerId = req.organizer?.id!
        
        const { data, errors } = await this._OrganzationCampaignService.sendCampignToAdmin(campaignId, organizerId);

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

    public addTask = async (req: Request, res: Response)  => {
        const body: IAddTask  = req.body
        const organizerId = req.organizer?.id!
        
        const { data, errors } = await this._OrganzationCampaignService.addTask(body, organizerId);

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

    public addRequirement = async (req: Request, res: Response)  => {
        const body: IAddReqiurement  = req.body
        const organizerId = req.organizer?.id!
        
        const { data, errors } = await this._OrganzationCampaignService.addRequirement(body, organizerId);

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

    public addReword = async (req: Request, res: Response)  => {
        const body: IAddReward  = req.body
        const organizerId = req.organizer?.id!
        
        const { data, errors } = await this._OrganzationCampaignService.addReword(body, organizerId);

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

        const query: CampaignPaginationDto = {limit: parseFloat(limit as string), page: parseFloat(page as string)}
        const organizerId = req.organizer?.id!
        const {campaignId}  = req.params
        
        const { data, errors } = await this._OrganzationCampaignService.getAllTask(query, campaignId, organizerId);

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

        const query: CampaignPaginationDto = {limit: parseFloat(limit as string), page: parseFloat(page as string)}
        const organizerId = req.organizer?.id!
        const {campaignId}  = req.params
        
        const { data, errors } = await this._OrganzationCampaignService.getAllRequirement(query, campaignId, organizerId);

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

        const query: CampaignPaginationDto = {limit: parseFloat(limit as string), page: parseFloat(page as string)}
        const organizerId = req.organizer?.id!
        const {campaignId}  = req.params
        
        const { data, errors } = await this._OrganzationCampaignService.getAllReword(query, campaignId, organizerId);

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

export default OrganizerCampaignController;

    