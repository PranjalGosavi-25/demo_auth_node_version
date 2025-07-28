import { FormField } from '@components/Common';
import {
  CompanyOnboardActionEnum,
  RegionEnum
} from '@enums/companyOnboardingEnum';
import { Input, Select, Tooltip, message } from 'antd';
import { useFormik } from 'formik';
import React, { useMemo } from 'react';
import * as Yup from 'yup';
import VCPOnboardingLayout from './VCPOnboardingLayout';
import _ from 'lodash';
import { CompanyService } from '@services/CompanyService';
import { useRouter } from 'next/router';
import { PASSWORD_REGEX } from '@constants/common';
import { PasswordRequirements } from '@components/Common/PasswordRequirements';
import { ConfirmPasswordRequirements } from '@components/Common/ConfirmPasswordRequirements';
import { CustomerIoUtils } from '@utils/cutomerio';
import SelfServeOnboardingLayout from '../SelfServeOnboardingLayout';
import config from 'config';

const validationSchema = Yup.object().shape({
  password: Yup.string()
    .required()
    .matches(
      PASSWORD_REGEX,
      'Password must contain one capital letter, one lower letter, one number, one special character(@$!%*?&), and be at least 8 characters long'
    ),
  confirmPassword: Yup.string()
    .required('Confirm Password is required')
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
});

const validationSchemaOptional = Yup.object().shape({
  password: Yup.string(),
  confirmPassword: Yup.string()
});

function PasswordSetup(props: {
  currentStep: number;
  tokenData: any;
  setCurrentStep: (step: number) => void;
  setTokenData: (data: any) => void;
}) {
  const { currentStep, tokenData, setCurrentStep, setTokenData } = props;
  const router = useRouter();
  const token = router.query.token as string;

  const formValidationSchema = useMemo(() => {
    return tokenData?.user?.hasPassword
      ? validationSchemaOptional
      : validationSchema;
  }, [tokenData?.user?.hasPassword]);

  const form = useFormik({
    initialValues: {
      password: '',
      confirmPassword: ''
    },
    validationSchema: formValidationSchema,
    validateOnMount: true,
    enableReinitialize: true,
    onSubmit: async (values) => {
      const params = {
        password: values.password,
        token: token,
        action: CompanyOnboardActionEnum.PasswordSetup
      };

      CustomerIoUtils.trackEvent({
        eventName: 'onboarding',
        data: {
          step: 'Password Setup'
        }
      });

      if (tokenData?.user?.hasPassword) {
        const res = await handleCompleteOnboarding();
        if (!res.error) {
          // setCurrentStep(currentStep + 1);
          // router.push({
          //   pathname: '/company-onboarding',
          //   query: { step: currentStep + 1, token: token }
          // });
          // localStorage.setItem(currentStep.toString(), 'true');
        } else {
          message.error(res.error?.message || 'Something went wrong');
        }
        return;
      }

      const { data, error } =
        await CompanyService.updateOnboardingCompanyByToken(params);

      if (data) {
        const res = await handleCompleteOnboarding();
        if (!res.error) {
          // setCurrentStep(currentStep + 1);
          // router.push({
          //   pathname: '/company-onboarding',
          //   query: { step: currentStep + 1, token: token }
          // });
          // localStorage.setItem(currentStep.toString(), 'true');
          // setTokenData(data);
        } else {
          message.error(res.error?.message || 'Something went wrong');
        }
      } else {
        message.error(error?.message || 'Something went wrong');
      }
    }
  });

  async function handleCompleteOnboarding() {
    const { data, error } = await CompanyService.checkCompleteOnboarding({
      token: token as string
    });

    if (!error) {
      CustomerIoUtils.trackEvent({
        eventName: 'onboarding_completed',
        data: {}
      });
      localStorage.setItem('xv-token', 'true');
      router.push(config.FRONTEND_URL.CARBON_NEWTRAL as string);
      localStorage.clear();
    }

    return { data, error };
  }

  return (
    <SelfServeOnboardingLayout
      loading={form.isSubmitting}
      nextButtonProps={{
        label: 'Confirm',
        onClick: form.submitForm,
        disabled: !form.isValid
      }}
      previousButtonProps={{
        label: 'Back',
        onClick: () => {
          router.push({
            pathname: '/company-onboarding',
            query: { step: currentStep - 1, token: token }
          });
        }
      }}
    >
      <div className="flex flex-col gap-5 pb-5">
        <FormField
          title="Set up Your Password*"
          description="Minimum 8 characters, including a mix of lowercase letters, numbers, and symbols."
        >
          <Tooltip
            title={<PasswordRequirements password={form.values.password} />}
            color={'white'}
            overlayStyle={{
              minWidth: '300px'
            }}
            trigger={['focus']}
          >
            <Input.Password
              type="password"
              placeholder="Password"
              value={
                tokenData?.user?.hasPassword ? '********' : form.values.password
              }
              name="password"
              disabled={tokenData?.user?.hasPassword}
              onChange={form.handleChange}
              onBlur={form.handleBlur}
              className={`${
                form.errors.password &&
                form.touched.password &&
                'border-red-500'
              }`}
            />
          </Tooltip>
        </FormField>

        <FormField title="Confirm Password*">
          <Tooltip
            title={
              <ConfirmPasswordRequirements
                password={form.values.password}
                confirmPassword={form.values.confirmPassword}
              />
            }
            color={'white'}
            overlayStyle={{
              minWidth: '300px'
            }}
            trigger={['focus']}
          >
            <Input.Password
              type="password"
              placeholder="Confirm Password"
              value={
                tokenData?.user?.hasPassword
                  ? '********'
                  : form.values.confirmPassword
              }
              name="confirmPassword"
              disabled={tokenData?.user?.hasPassword}
              onChange={form.handleChange}
              onBlur={form.handleBlur}
              className={`${
                form.errors.confirmPassword &&
                form.touched.confirmPassword &&
                'border-red-500'
              }`}
            />
          </Tooltip>
        </FormField>
      </div>
    </SelfServeOnboardingLayout>
  );
}

export default PasswordSetup;
