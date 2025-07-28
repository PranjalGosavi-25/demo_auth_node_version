import { ForgotPassowordState, useForgotPassword } from '@hooks/auth';
import React from 'react';
import Link from 'next/link';
import * as Yup from 'yup';
import { SpecialKeyIcon } from '@components/UI/SpecialIcons';
import { ArrowLeftOutlineIcon } from '@components/Icons';
import { useFormik } from 'formik';
import Image from 'next/image';
import { SpecialMailIcon } from '@components/UI/SpecialIcons';
import { AuthService } from '@services/AuthService';
import { Button, Checkbox, Input, message } from 'antd';
import { useState } from 'react';
import { LoginTabsEnum } from './OrganizationLogin';

const formSchema = Yup.object({
  email: Yup.string().email().required()
});

function OrganizationForgetPassword(props: {
  setActiveTab: (tab: string) => void;
  setEmailSent: (value: boolean) => void;
}) {
  const { setActiveTab, setEmailSent } = props;
  const [isSending, setIsSending] = useState(false);
  const { state, markSuccess, updateEmail, email } = useForgotPassword();

  const form = useFormik({
    initialValues: {
      email: ''
    },
    validationSchema: formSchema,
    onSubmit: handleSubmit
  });

  async function handleSubmit(values: any) {
    const { error } = await AuthService.forgotPassword({
      emailId: values.email
    });

    form.setSubmitting(false);

    if (error) {
      message.error(error.message);
    } else {
      setEmailSent(true);
      updateEmail(values.email);
      markSuccess();
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
    <div className="w-full">
      {state == ForgotPassowordState.default ? (
        <form>
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
          <div className="font-semibold text-sm text-primary-700 mt-2 w-full flex justify-center">
            <p
              className="w-fit cursor-pointer text-center"
              onClick={() => props.setActiveTab(LoginTabsEnum.LOGIN)}
            >
              Back to log in
            </p>
          </div>
        </form>
      ) : (
        <div className="flex flex-col gap-8 max-w-sm">
          <div className="flex flex-col items-center gap-6 text-center">
            <SpecialMailIcon />
            <div className="flex flex-col gap-3">
              <div className="text-3xl font-semibold">Check your email</div>
              <div className="text-base text-gray-600">
                We sent a password reset link to{' '}
                <span className="font-medium">{email}</span>
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
            <div className="flex justify-center">
              <p
                onClick={() => props.setActiveTab(LoginTabsEnum.LOGIN)}
                className="text-sm text-gray-600 font-semibold flex items-center gap-2 no-underline  cursor-pointer"
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
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default OrganizationForgetPassword;
