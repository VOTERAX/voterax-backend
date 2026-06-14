import { OrganizerAccountStatus } from "@prisma/client";

export interface OrganizerDetailDto{
  page: number; 
  limit: number;
  search?: string;
  status?: string;
}

export interface ChangeOrganizerAccountStatusDto{
  organizerId: string;
  status: OrganizerAccountStatus;
}