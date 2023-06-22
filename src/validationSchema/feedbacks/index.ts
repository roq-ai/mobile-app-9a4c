import * as yup from 'yup';

export const feedbackValidationSchema = yup.object().shape({
  comment: yup.string().required(),
  issue_reported: yup.boolean().required(),
  test_case_id: yup.string().nullable(),
  user_id: yup.string().nullable(),
});
