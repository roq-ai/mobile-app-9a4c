import { FeedbackInterface } from 'interfaces/feedback';
import { OrganizationInterface } from 'interfaces/organization';
import { GetQueryInterface } from 'interfaces';

export interface TestCaseInterface {
  id?: string;
  title: string;
  description?: string;
  status: string;
  organization_id?: string;
  created_at?: any;
  updated_at?: any;
  feedback?: FeedbackInterface[];
  organization?: OrganizationInterface;
  _count?: {
    feedback?: number;
  };
}

export interface TestCaseGetQueryInterface extends GetQueryInterface {
  id?: string;
  title?: string;
  description?: string;
  status?: string;
  organization_id?: string;
}
