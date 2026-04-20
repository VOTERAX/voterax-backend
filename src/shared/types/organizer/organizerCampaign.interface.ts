export enum CampaignStatus {
  DRAFT = "DRAFT",
  ACTIVE = "ACTIVE",
  COMPLETED = "COMPLETED",
  CANCELLED = "CANCELLED"
}

export interface ICreateCampaign {
  title: string;
  category: "BOUNTY" | "AIRDROP" | "QUEST";
  description?: string;

  startDate?: Date;
  endDate?: Date;

  treasuryPool: number;
  cpPerTask: number;
}

export interface ITaskInput {
  title: string;
  description?: string;
  type?: "TWITTER" | "DISCORD" | "TELEGRAM" | "CUSTOM";
  link?: string;
}

export interface IRequirementInput {
  title: string;
  description?: string;
}

export interface IRewardInput {
  position: string; // 1, 2, 3
  amount: number;
}

export interface ICreateFullCampaign extends ICreateCampaign {
  tasks: ITaskInput[];
  requirements: IRequirementInput[];
  rewards: IRewardInput[];
}

export interface IAddTask  {
  campaignId: string;
  tasks: ITaskInput[];
}

export interface IAddReqiurement  {
  campaignId: string;
  requirements: IRequirementInput[];
}

export interface IAddReward  {
  campaignId: string;
  rewards: IRewardInput[];
}

export interface IUpdateCampaignStep {
  campaignId: string;

  campaign?: Partial<ICreateCampaign>;
  tasks?: ITaskInput[];
  requirements?: IRequirementInput[];
  rewards?: IRewardInput[];
}

export interface CampaignPaginationDto{
  page: number; 
  limit: number;
}