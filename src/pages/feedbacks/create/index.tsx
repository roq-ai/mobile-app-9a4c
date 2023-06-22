import AppLayout from 'layout/app-layout';
import React, { useState } from 'react';
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Text,
  Box,
  Spinner,
  FormErrorMessage,
  Switch,
  NumberInputStepper,
  NumberDecrementStepper,
  NumberInputField,
  NumberIncrementStepper,
  NumberInput,
} from '@chakra-ui/react';
import { useFormik, FormikHelpers } from 'formik';
import * as yup from 'yup';
import DatePicker from 'react-datepicker';
import { FiEdit3 } from 'react-icons/fi';
import { useRouter } from 'next/router';
import { createFeedback } from 'apiSdk/feedbacks';
import { Error } from 'components/error';
import { feedbackValidationSchema } from 'validationSchema/feedbacks';
import { AsyncSelect } from 'components/async-select';
import { ArrayFormField } from 'components/array-form-field';
import { AccessOperationEnum, AccessServiceEnum, withAuthorization } from '@roq/nextjs';
import { TestCaseInterface } from 'interfaces/test-case';
import { UserInterface } from 'interfaces/user';
import { getTestCases } from 'apiSdk/test-cases';
import { getUsers } from 'apiSdk/users';
import { FeedbackInterface } from 'interfaces/feedback';

function FeedbackCreatePage() {
  const router = useRouter();
  const [error, setError] = useState(null);

  const handleSubmit = async (values: FeedbackInterface, { resetForm }: FormikHelpers<any>) => {
    setError(null);
    try {
      await createFeedback(values);
      resetForm();
      router.push('/feedbacks');
    } catch (error) {
      setError(error);
    }
  };

  const formik = useFormik<FeedbackInterface>({
    initialValues: {
      comment: '',
      issue_reported: false,
      test_case_id: (router.query.test_case_id as string) ?? null,
      user_id: (router.query.user_id as string) ?? null,
    },
    validationSchema: feedbackValidationSchema,
    onSubmit: handleSubmit,
    enableReinitialize: true,
    validateOnChange: false,
    validateOnBlur: false,
  });

  return (
    <AppLayout>
      <Box bg="white" p={4} rounded="md" shadow="md">
        <Box mb={4}>
          <Text as="h1" fontSize="2xl" fontWeight="bold">
            Create Feedback
          </Text>
        </Box>
        {error && (
          <Box mb={4}>
            <Error error={error} />
          </Box>
        )}
        <form onSubmit={formik.handleSubmit}>
          <FormControl id="comment" mb="4" isInvalid={!!formik.errors?.comment}>
            <FormLabel>Comment</FormLabel>
            <Input type="text" name="comment" value={formik.values?.comment} onChange={formik.handleChange} />
            {formik.errors.comment && <FormErrorMessage>{formik.errors?.comment}</FormErrorMessage>}
          </FormControl>
          <FormControl
            id="issue_reported"
            display="flex"
            alignItems="center"
            mb="4"
            isInvalid={!!formik.errors?.issue_reported}
          >
            <FormLabel htmlFor="switch-issue_reported">Issue Reported</FormLabel>
            <Switch
              id="switch-issue_reported"
              name="issue_reported"
              onChange={formik.handleChange}
              value={formik.values?.issue_reported ? 1 : 0}
            />
            {formik.errors?.issue_reported && <FormErrorMessage>{formik.errors?.issue_reported}</FormErrorMessage>}
          </FormControl>
          <AsyncSelect<TestCaseInterface>
            formik={formik}
            name={'test_case_id'}
            label={'Select Test Case'}
            placeholder={'Select Test Case'}
            fetcher={getTestCases}
            renderOption={(record) => (
              <option key={record.id} value={record.id}>
                {record?.title}
              </option>
            )}
          />
          <AsyncSelect<UserInterface>
            formik={formik}
            name={'user_id'}
            label={'Select User'}
            placeholder={'Select User'}
            fetcher={getUsers}
            renderOption={(record) => (
              <option key={record.id} value={record.id}>
                {record?.email}
              </option>
            )}
          />
          <Button isDisabled={formik?.isSubmitting} colorScheme="blue" type="submit" mr="4">
            Submit
          </Button>
        </form>
      </Box>
    </AppLayout>
  );
}

export default withAuthorization({
  service: AccessServiceEnum.PROJECT,
  entity: 'feedback',
  operation: AccessOperationEnum.CREATE,
})(FeedbackCreatePage);
