import { prisma } from "../../../prisma";
import ErrorInterface from "../../../shared/types/general/error.interface";
import { CampaignPaginationDto, CampaignStatus, IAddReqiurement, IAddReward, IAddTask, ICreateFullCampaign, } from "../../../shared/types/organizer/organizerCampaign.interface";

class OrganzationCampaignService {
    constructor() { }

    public createCampign = async (data: ICreateFullCampaign, organizerId: string ) : Promise<{ errors?: ErrorInterface[]; data?:  any }> => {
        try {
            const { title, category, description, startDate, endDate, treasuryPool, cpPerTask, rewards, requirements, tasks } = data;
            const createdCampaign = await prisma.$transaction(async (tx) => {
            // 1. Create Campaign
            const newCampaign = await tx.campaign.create({
                data: {
                title: title,
                category: category,
                description: description,
                startDate: startDate,
                endDate: endDate,
                treasuryPool: treasuryPool,
                cpPerTask: cpPerTask,
                organizerId,
                status: CampaignStatus.DRAFT,
                },
            });

            // 2. Create Tasks
            if (tasks?.length) {
                await tx.task.createMany({
                data: tasks.map((task) => ({
                    title: task.title,
                    description: task.description,
                    type: task.type,
                    link: task.link,
                    campaignId: newCampaign.id,
                })),
                });
            }

            // 3. Create Requirements
            if (requirements?.length) {
                await tx.requirement.createMany({
                data: requirements.map((req) => ({
                    title: req.title,
                    description: req.description,
                    campaignId: newCampaign.id,
                })),
                });
            }

            // 4. Create Rewards
            if (rewards?.length) {
                await tx.reward.createMany({
                data: rewards.map((reward) => ({
                    position: reward.position,
                    amount: reward.amount,
                    campaignId: newCampaign.id,
                })),
                });
            }

            return newCampaign;
        });

        return { data: createdCampaign };
            
        } catch (error) {
            console.log("error", error)
            return {
                errors: [{message: "Failed to create campaign"}]
            };
        }
    }

    public getAllCampign = async ({ page = 1, limit = 10 }: CampaignPaginationDto, organizerId: string ) : Promise<{ errors?: ErrorInterface[]; data?:  any }> => {
        try {
            const skip = (page - 1) * limit;

            const [campaigns, total] = await Promise.all([
            prisma.campaign.findMany({
                where: {
                    organizerId
                },
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

            prisma.campaign.count({where: {organizerId}}),
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

    public getsingleCampign = async (campaignId: string, organizerId: string ) : Promise<{ errors?: ErrorInterface[]; data?:  any }> => {
        try {

            const [campaign] = await Promise.all([
            prisma.campaign.findFirst({
                where: {
                    organizerId,
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
            }),

           
        ]);

        return { data: campaign};
            
        } catch (error) {
            console.log("error", error)
            return {
                errors: [{message: "Server error"}]
            };
        }
    }

    public addTask = async (data: IAddTask, organizerId: string ) : Promise<{ errors?: ErrorInterface[]; data?:  any }> => {
        try {
            const { campaignId, tasks } = data;
            
            const checkCampaign = await prisma.campaign.findFirst({where: {id: campaignId, organizerId}})
            if (!checkCampaign) return { errors: [{message: "Campaign not found"}] };

            const createTasks = await prisma.task.createMany({
                data: tasks.map((task) => ({
                    title: task.title,
                    description: task.description,
                    type: task.type,
                    link: task.link,
                    campaignId
                })),
            });

            return { data: createTasks.count };
            
        } catch (error) {
            console.log("error", error)
            return {
                errors: [{message: "Failed to create campaign"}]
            };
        }
    }

    public addRequirement = async (data: IAddReqiurement, organizerId: string ) : Promise<{ errors?: ErrorInterface[]; data?:  any }> => {
        try {
            const { requirements, campaignId } = data;

            const checkCampaign = await prisma.campaign.findFirst({where: {id: campaignId, organizerId}})
            if (!checkCampaign) return { errors: [{message: "Campaign not found"}] };

            const createRequirements = await prisma.requirement.createMany({
                data: requirements.map((requirement) => ({
                    title: requirement.title,
                    description: requirement.description,
                    campaignId
                })),
            });
          
            return { data: createRequirements.count };
            
        } catch (error) {
            console.log("error", error)
            return {
                errors: [{message: "Failed to create campaign"}]
            };
        }
    }

    public addReword = async (data: IAddReward, organizerId: string ) : Promise<{ errors?: ErrorInterface[]; data?:  any }> => {
        try {
            const { rewards, campaignId } = data;

            const checkCampaign = await prisma.campaign.findFirst({where: {id: campaignId, organizerId}})
            if (!checkCampaign) return { errors: [{message: "Campaign not found"}] };

            const createRewords = await prisma.reward.createMany({
                data: rewards.map((reward) => ({
                    position: reward.position,
                    amount: reward.amount,
                    campaignId
                })),
            });

            return { data: createRewords.count };
            
        } catch (error) {
            console.log("error", error)
            return {
                errors: [{message: "Failed to create campaign"}]
            };
        }
    }

    public getAllTask = async ({ page = 1, limit = 10 }: CampaignPaginationDto, campaignId: string, organizerId: string ) : Promise<{ errors?: ErrorInterface[]; data?:  any }> => {
        try {
            const skip = (page - 1) * limit;

            const checkCampaign = await prisma.campaign.findFirst({where: {id: campaignId, organizerId}})
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

    public getAllRequirement = async ({ page = 1, limit = 10 }: CampaignPaginationDto, campaignId: string, organizerId: string ) : Promise<{ errors?: ErrorInterface[]; data?:  any }> => {
        try {
            const skip = (page - 1) * limit;

            const checkCampaign = await prisma.campaign.findFirst({where: {id: campaignId, organizerId}})
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

    public getAllReword = async ({ page = 1, limit = 10 }: CampaignPaginationDto, campaignId: string, organizerId: string ) : Promise<{ errors?: ErrorInterface[]; data?:  any }> => {
        try {
            const skip = (page - 1) * limit;

            const checkCampaign = await prisma.campaign.findFirst({where: {id: campaignId, organizerId}})
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

export default OrganzationCampaignService;
