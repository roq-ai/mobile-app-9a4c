import { TestCaseInterface } from 'interfaces/test-case';
import { UserInterface } from 'interfaces/user';
import { GetQueryInterface } from 'interfaces';

export interface FeedbackInterface {
  id?: string;
  comment: string;
  issue_reported: boolean;
  test_case_id?: string;
  user_id?: string;
  created_at?: any;
  updated_at?: any;

  test_case?: TestCaseInterface;
  user?: UserInterface;
  _count?: {};
}

export interface FeedbackGetQueryInterface extends GetQueryInterface {
  id?: string;
  comment?: string;
  test_case_id?: string;
  user_id?: string;
}
