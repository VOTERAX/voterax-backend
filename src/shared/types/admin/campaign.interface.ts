import { CampaignStatus } from "@prisma/client";

export interface CampaignDetailDto{
  page: number; 
  limit: number;
  search?: string;
  status?: string;
}

export interface ApprovedCampignDto{
  campaignId: string;
}

export interface ChangeCampignStatusDto{
  campaignId: string;
  status: CampaignStatus;
}

export interface ChangeOrganizerAccountStatusDto{
  organizerId: string;
//   status: OrganizerAccountStatus;
}