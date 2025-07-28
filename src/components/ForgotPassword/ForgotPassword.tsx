import { Button, Input, message } from 'antd';
import Link from 'next/link';
import React, { useState } from 'react';
import * as Yup from 'yup';
import { SpecialKeyIcon, SpecialMailIcon } from '@components/UI/SpecialIcons';
import { ArrowLeftOutlineIcon } from '@components/Icons';
import { useFormik } from 'formik';
import { AuthService } from '@services/AuthService';
import Image from 'next/image';
import LoginSignUpLayoutV2 from '@components/Common/LoginSignupLayoutV2';
import { ForgotPassowordState, useForgotPassword } from '@hooks/auth';
import { useRouter } from 'next/router';

const formSchema = Yup.object({
  email: Yup.string().email().required()
});

export function ForgotPassword(props: {}) {
  // const { state, markSuccess, updateEmail, email } = useForgotPassword();
  const [isSending, setIsSending] = useState(false);
  const router = useRouter();
  const result = router.query.result;

  const form = useFormik({
    initialValues: {
      email: ''
    },
    validationSchema: formSchema,
    onSubmit: handleForgotPassword
  });

  async function handleForgotPassword(values: any) {
    const { error } = await AuthService.forgotPassword({
      emailId: values.email
    });

    form.setSubmitting(false);

    if (error) {
      message.error(error.message);
    } else {
      router.push({
        query: { result: 'success' }
      });
    }
  }

  async function handleResend() {
    setIsSending(true);

    const { error } = await AuthService.forgotPassword({
      emailId: form.values.email
    });

    if (error) {
      message.error(error.message);
    } else {
      message.success('Email sent');
    }

    setIsSending(false);
  }

  return (
    <LoginSignUpLayoutV2>
      <div className="flex items-center justify-center h-full">
        {result != 'success' ? (
          <div className="w-4/5 lg:w-3/5 h-fit flex flex-col gap-8">
            <div className="flex flex-col items-center gap-6 text-center">
              <SpecialKeyIcon />
              <div className="flex flex-col gap-3">
                <div className="text-xl font-semibold">Forgot password?</div>
                <div className="text-base text-gray-600">
                  No worries, we&apos;ll send you reset instructions.
                </div>
              </div>
            </div>
            <div className="w-full flex flex-col gap-6">
              <div className="flex flex-col gap-2">
                <div className="text-sm text-gray-700 font-medium">Email</div>
                <Input
                  type="email"
                  placeholder="Enter your email"
                  className="shadow-xs"
                  name="email"
                  value={form.values.email}
                  onChange={form.handleChange}
                />
              </div>
              <Button
                type="primary"
                className="font-semibold shadow-xs disabled:bg-primary-200 bg-primary-800 disabled:text-white"
                disabled={!(form.dirty && form.isValid)}
                onClick={() => form.handleSubmit()}
                loading={form.isSubmitting}
              >
                Reset password
              </Button>
            </div>
            <div className="flex justify-center">
              <Link
                href="/login"
                className="text-sm text-gray-600 font-semibold flex items-center gap-2 no-underline"
              >
                <span>
                  <Image
                    src="/icons/arrow-left.svg"
                    alt="Arrow left"
                    width={12}
                    height={12}
                  />
                </span>
                Back to log in
              </Link>
            </div>
          </div>
        ) : (
          <div className="w-4/5 lg:w-3/5 h-fit flex flex-col gap-8">
            <div className="flex flex-col items-center gap-6 text-center">
              <SpecialMailIcon />
              <div className="flex flex-col gap-3">
                <div className="text-3xl font-semibold">Check your email</div>
                <div className="text-base text-gray-600">
                  We sent a password reset link to{' '}
                  <span className="font-medium">{form.values.email}</span>
                </div>
              </div>
            </div>
            <div>
              <div className="flex items-center gap-1 justify-center">
                <span className="text-sm text-gray-600">
                  Didn&apos;t receive the email?
                </span>
                <Button
                  type="link"
                  className="font-semibold text-sm px-0"
                  onClick={handleResend}
                  disabled={isSending}
                >
                  Click to resend
                </Button>
              </div>
            </div>
            <div className="flex justify-center">
              <Link
                href="/login"
                className="text-sm text-gray-600 font-semibold flex items-center gap-2 no-underline"
              >
                <span>
                  <Image
                    src="/icons/arrow-left.svg"
                    alt="Arrow left"
                    width={12}
                    height={12}
                  />
                </span>
                Back to log in
              </Link>
            </div>
          </div>
        )}
      </div>
    </LoginSignUpLayoutV2>
  );
}
