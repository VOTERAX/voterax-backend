import { prisma } from "../../../prisma";
import { ApprovedCampignDto, CampaignDetailDto, ChangeCampignStatusDto } from "../../../shared/types/admin/campaign.interface";
import ErrorInterface from "../../../shared/types/general/error.interface";
import { CampaignStatus } from "@prisma/client";

class CampaignService {

    public getAllPendingCampaign = async ({ page = 1, limit = 10, search }: CampaignDetailDto ) : Promise<{ errors?: ErrorInterface[]; data?:  any }> => {
        try {
            const skip = (page - 1) * limit;

            const where: any = {status: CampaignStatus.PENDING};

            if (search) {
                where.OR = [
                    {
                        title: {
                            contains: search,
                            mode: "insensitive",
                        },
                    },
                ];
            }

            const [campaigns, total] = await Promise.all([
            prisma.campaign.findMany({
                where,
                skip,
                take: limit,
                orderBy: { createdAt: "desc" },
                include: {
                    tasks: true,
                    rewards: true,
                    requirements: true,
                    organizer: {
                        select: {
                        id: true,
                        companyName: true,
                        companyEmail: true,
                        },
                    },
                },
            }),

            prisma.organizer.count(),
        ]);

        return { data:{
            total,
            page,
            lastPage: Math.ceil(total / limit),
            limit,
            campaigns
        } };
            
        } catch (error) {
            console.log("error", error)
            return {
                errors: [{message: "Server error"}]
            };
        }
    }


    public approveCampaign = async ( data: ApprovedCampignDto ) : Promise<{ errors?: ErrorInterface[]; data?:  any }> => {
        try {
            const { campaignId } = data;
            
            const checkCampaign = await prisma.campaign.findFirst({where: {id: campaignId}})
            if (!checkCampaign) return { errors: [{message: "Campaign not found"}] };

            const campaign = await prisma.campaign.update({
                where: {id: checkCampaign.id},
                data: {
                    approvedByAdmin: true
                }
            })

            return { data: campaign};
            
        } catch (error) {
            console.log("error", error)
            return {
                errors: [{message: "Server error"}]
            };
        }
    }

    public disapproveCampaign = async ( data: ApprovedCampignDto ) : Promise<{ errors?: ErrorInterface[]; data?:  any }> => {
        try {
            const { campaignId } = data;
            
            const checkCampaign = await prisma.campaign.findFirst({where: {id: campaignId}})
            if (!checkCampaign) return { errors: [{message: "Campaign not found"}] };

            const campaign = await prisma.campaign.update({
                where: {id: checkCampaign.id},
                data: {
                    approvedByAdmin: false
                }
            })

            return { data: campaign};
            
        } catch (error) {
            console.log("error", error)
            return {
                errors: [{message: "Server error"}]
            };
        }
    }


    public getAllCampign = async ({ page = 1, limit = 10, status, search }: CampaignDetailDto, ) : Promise<{ errors?: ErrorInterface[]; data?:  any }> => {
        try {
            const skip = (page - 1) * limit;

            const where: any = {};

            if (status) {
                where.status = status;
            }

            if (search) {
                where.OR = [
                    {
                        title: {
                            contains: search,
                            mode: "insensitive",
                        },
                    },
                ];
            }

            const [campaigns, total] = await Promise.all([
            prisma.campaign.findMany({
                where,
                skip,
                take: limit,
                orderBy: { createdAt: "desc" },

                include: {
                tasks: true,
                rewards: true,
                requirements: true,
                organizer: {
                    select: {
                    id: true,
                    companyName: true,
                    companyEmail: true,
                    },
                },
                },
            }),

            prisma.campaign.count({where}),
        ]);

        return { data:{
            total,
            page,
            lastPage: Math.ceil(total / limit),
            limit,
            campaigns
        } };
            
        } catch (error) {
            console.log("error", error)
            return {
                errors: [{message: "Server error"}]
            };
        }
    }


    public changeCampaignStatus = async ( data: ChangeCampignStatusDto ) : Promise<{ errors?: ErrorInterface[]; data?:  any }> => {
        try {
            const { campaignId, status } = data;
            
            const checkCampaign = await prisma.campaign.findFirst({where: {id: campaignId}})
            if (!checkCampaign) return { errors: [{message: "Campaign not found"}] };

            const campaign = await prisma.campaign.update({
                where: {id: checkCampaign.id},
                data: {
                    status: status
                }
            })

            return { data: campaign};
            
        } catch (error) {
            console.log("error", error)
            return {
                errors: [{message: "Server error"}]
            };
        }
    }

    public getSingleCampign = async (campaignId: string, ) : Promise<{ errors?: ErrorInterface[]; data?:  any }> => {
        try {
            const campaign = await prisma.campaign.findFirst({
                where: {
                    id: campaignId
                },
                include: {
                tasks: true,
                rewards: true,
                requirements: true,
                organizer: {
                    select: {
                    id: true,
                    companyName: true,
                    companyEmail: true,
                    },
                },
                },
            })

            if (!campaign) return { errors: [{message: "Campaign not found"}] };

            return { data: campaign};
            
        } catch (error) {
            console.log("error", error)
            return {
                errors: [{message: "Server error"}]
            };
        }
    }

    public getAllTask = async ({ page = 1, limit = 10 }: CampaignDetailDto, campaignId: string ) : Promise<{ errors?: ErrorInterface[]; data?:  any }> => {
        try {
            const skip = (page - 1) * limit;

            const checkCampaign = await prisma.campaign.findFirst({where: {id: campaignId}})
            if (!checkCampaign) return { errors: [{message: "Campaign not found"}] };

            const [tasks, total] = await Promise.all([
            prisma.task.findMany({
                where: {
                    campaignId
                },
                skip,
                take: limit,
                orderBy: { createdAt: "desc" },
            }),

            prisma.task.count({where: {campaignId}}),
        ]);

        return { data:{
            total,
            page,
            lastPage: Math.ceil(total / limit),
            limit,
            tasks
        } };
            
        } catch (error) {
            console.log("error", error)
            return {
                errors: [{message: "Server error"}]
            };
        }
    }

    public getAllRequirement = async ({ page = 1, limit = 10 }: CampaignDetailDto, campaignId: string ) : Promise<{ errors?: ErrorInterface[]; data?:  any }> => {
        try {
            const skip = (page - 1) * limit;

            const checkCampaign = await prisma.campaign.findFirst({where: {id: campaignId}})
            if (!checkCampaign) return { errors: [{message: "Campaign not found"}] };

            const [requirements, total] = await Promise.all([
            prisma.requirement.findMany({
                where: {
                    campaignId
                },
                skip,
                take: limit,
                orderBy: { createdAt: "desc" },
            }),

            prisma.requirement.count({where: {campaignId}}),
        ]);

        return { data:{
            total,
            page,
            lastPage: Math.ceil(total / limit),
            limit,
            requirements
        } };
            
        } catch (error) {
            console.log("error", error)
            return {
                errors: [{message: "Server error"}]
            };
        }
    }

    public getAllReword = async ({ page = 1, limit = 10 }: CampaignDetailDto, campaignId: string) : Promise<{ errors?: ErrorInterface[]; data?:  any }> => {
        try {
            const skip = (page - 1) * limit;

            const checkCampaign = await prisma.campaign.findFirst({where: {id: campaignId}})
            if (!checkCampaign) return { errors: [{message: "Campaign not found"}] };

            const [rewords, total] = await Promise.all([
            prisma.reward.findMany({
                where: {
                    campaignId
                },
                skip,
                take: limit,
                orderBy: { createdAt: "desc" },
            }),

            prisma.reward.count({where: {campaignId}}),
        ]);

        return { data:{
            total,
            page,
            lastPage: Math.ceil(total / limit),
            limit,
            rewords
        } };
            
        } catch (error) {
            console.log("error", error)
            return {
                errors: [{message: "Server error"}]
            };
        }
    }
    
}

export default CampaignService;