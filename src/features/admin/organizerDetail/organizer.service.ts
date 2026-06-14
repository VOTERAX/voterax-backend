import { prisma } from "../../../prisma";
import { ChangeOrganizerAccountStatusDto, OrganizerDetailDto } from "../../../shared/types/admin/organizerDetail.interface";
import ErrorInterface from "../../../shared/types/general/error.interface";

class OrganizerDetailService {

    public getAllOganizer = async ({ page = 1, limit = 10, search, status }: OrganizerDetailDto ) : Promise<{ errors?: ErrorInterface[]; data?:  any }> => {
        try {
            console.log("page", page)

            const skip = (page - 1) * limit;

            const where: any = {};

            if (status) {
                where.status = status;
            }

            if (search) {
                where.OR = [
                    {
                        companyName: {
                            contains: search,
                            mode: "insensitive",
                        },
                    },
                    {
                        companyEmail: {
                            contains: search,
                            mode: "insensitive",
                        },
                    },
                    {
                        firstName: {
                            contains: search,
                            mode: "insensitive",
                        },
                    },
                    {
                        lastName: {
                            contains: search,
                            mode: "insensitive",
                        },
                    },
                    {
                        userName: {
                            contains: search,
                            mode: "insensitive",
                        },
                    },
                ];
            }

            const [organizers, total] = await Promise.all([
            prisma.organizer.findMany({
                where,
                skip,
                take: limit,
                orderBy: { createdAt: "desc" },
                select: {
                    id: true,
                    firstName: true,
                    lastName: true,
                    userName: true,
                    picture: true,
                    telegram: true,
                    companyName: true,
                    companyEmail: true,
                    url: true,
                    companyX: true,
                    entityName: true,
                    industry: true,
                    bio: true,
                    souceOFfund: true,
                    logo: true,
                    status: true,
                    isEmailVerified: true,
                    createdAt: true,
                    updatedAt: true,
                },
            }),

            prisma.organizer.count({where}),
        ]);

        return { data:{
            total,
            page,
            lastPage: Math.ceil(total / limit),
            limit,
            organizers: organizers
        } };
            
        } catch (error) {
            console.log("error", error)
            return {
                errors: [{message: "Server error"}]
            };
        }
    }

    public getsingleOrganizer = async (organizerId: string ) : Promise<{ errors?: ErrorInterface[]; data?:  any }> => {
        try {

            const [organzer] = await Promise.all([
            prisma.organizer.findFirst({
                where: {
                    id: organizerId,
                },
                select: {
                    id: true,
                    firstName: true,
                    lastName: true,
                    userName: true,
                    picture: true,
                    telegram: true,
                    companyName: true,
                    companyEmail: true,
                    url: true,
                    companyX: true,
                    entityName: true,
                    industry: true,
                    bio: true,
                    souceOFfund: true,
                    logo: true,
                    status: true,
                    isEmailVerified: true,
                    createdAt: true,
                    updatedAt: true,
                },
            }),

           
        ]);

        return { data: organzer};
            
        } catch (error) {
            console.log("error", error)
            return {
                errors: [{message: "Server error"}]
            };
        }
    }

    public changeOrganizerAccountStatus = async ( data: ChangeOrganizerAccountStatusDto ) : Promise<{ errors?: ErrorInterface[]; data?:  any }> => {
        try {
            const { organizerId, status } = data;
            
            const checkOrgnizer = await prisma.organizer.findFirst({where: {id: organizerId}})
            if (!checkOrgnizer) return { errors: [{message: "Organizer not found"}] };

            const { password, ...updateOrganzer} = await prisma.organizer.update({
                where: {id: checkOrgnizer.id},
                data: {
                    status: status
                }
            })

            return { data: updateOrganzer};
            
        } catch (error) {
            console.log("error", error)
            return {
                errors: [{message: "Server error"}]
            };
        }
    }

}


export default OrganizerDetailService;