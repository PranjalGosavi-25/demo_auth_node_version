import { FeaturedIcon, FormField } from '@components/Common';
import LoginSignUpLayoutV2 from '@components/Common/LoginSignupLayoutV2';
import { StateEnum } from '@enums/common';
import { AuthService } from '@services/AuthService';
import { Button, Input, message } from 'antd';
import { useFormik } from 'formik';
import { CheckCircleOutlineIcon } from '@components/Icons';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import * as Yup from 'yup';

function ClimateProgramSignUp() {
  const router = useRouter();
  const result = router.query.result;
  const form = useFormik({
    initialValues: {
      emailId: ''
    },
    validationSchema: Yup.object({
      emailId: Yup.string().email('Invalid email').required('Required').trim()
    }),
    onSubmit: async (values) => {
      const { data, error } = await AuthService.partnerProgramSignup({
        emailId: values.emailId
      });
      router.push({
        query: { result: 'success' }
      });
    }
  });

  return (
    <LoginSignUpLayoutV2 showScheduleMeeting>
      <div className="flex items-center justify-center h-full">
        <div className="w-4/5 lg:w-3/5 h-fit">
          {(result !== 'success' && (
            <div>
              <form
                className="flex flex-col gap-5"
                onSubmit={(e) => {
                  e.preventDefault();
                  !form.isSubmitting && form.handleSubmit();
                }}
              >
                <FormField title="Email">
                  <Input
                    placeholder="Enter your emailId"
                    name="emailId"
                    value={form.values.emailId}
                    onChange={form.handleChange}
                  />
                </FormField>
                <Button
                  className="btn-primary font-medium"
                  disabled={form.isSubmitting || !(form.dirty && form.isValid)}
                  htmlType="submit"
                  loading={form.isSubmitting}
                >
                  Get link
                </Button>
              </form>
              <p className="text-gray-600 mt-2">
                Already have an account?{' '}
                <Link href={'/login'} className="text-primary-700 font-medium">
                  Sign In
                </Link>
              </p>
            </div>
          )) || (
            <div className="text-center flex flex-col items-center">
              <FeaturedIcon
                icon={CheckCircleOutlineIcon}
                color={StateEnum.Success}
                size={'lg'}
                variant={'double-circle-light'}
              />
              <p className="text-gray-900 text-3xl font-semibold mt-5">
                Email sent successfully
              </p>
              <p className="text-gray-600 text-base my-3">
                If you are a part of the Climate Program, you will receive an
                email with the link to create your account.
              </p>
              <div className="w-full flex justify-center">
                <Link
                  href={'/login'}
                  className="font-semibold text-sm text-primary-700 no-underline w-fit"
                >
                  Back to login
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </LoginSignUpLayoutV2>
  );
}

export default ClimateProgramSignUp;
