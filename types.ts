export interface SocialPost {
  platform: 'Instagram' | 'TikTok' | 'LinkedIn';
  text: string;
}

export interface BudgetBreakdown {
  socialMediaAds: number;
  emailCampaigns: number;
  contentCreation: number;
  partnershipsOutreach: number;
}

export interface MonthData {
  id: string; // "jan", "feb", etc.
  month: string;
  season: string;
  quarter: 'Q1' | 'Q2' | 'Q3' | 'Q4';
  activityLevel: number; // 1-5
  marketingBudgetPct: number;
  bookingPriority: string;
  keyEvents: string[];
  targetAudience: string[];
  contentThemes: string[];
  marketingActions: string[];
  socialPosts: SocialPost[];
  emailSubject: string;
  emailBody: string;
  budgetBreakdown: BudgetBreakdown;
  criticalNotes: string[];
  proTip: string;
  isCritical?: boolean;
}

export interface ActionState {
  [key: string]: boolean; // "jan-0": true
}