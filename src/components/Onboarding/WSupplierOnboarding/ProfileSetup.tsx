import { Input, Select, Tooltip, message } from 'antd';
import { OnboardingLayout } from '../OnboardingLayout';
import { FormField } from '@components/Common';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import {
  CompanyOnboardActionEnum,
  CompanySizeEnum
} from '@enums/companyOnboardingEnum';
import { useRouter } from 'next/router';
import { CompanyService } from '@services/CompanyService';
import { useMemo } from 'react';
import _ from 'lodash';
import { CompanyAccountTypeEnum, SupplierTypeEnum } from '@enums/common';
import { DEPARTMENTS, ROLES } from '@constants/onboarding';
import { CustomerIoUtils } from '@utils/cutomerio';
import { PASSWORD_REGEX } from '@constants/common';
import { PasswordRequirements } from '@components/Common/PasswordRequirements';
import { ConfirmPasswordRequirements } from '@components/Common/ConfirmPasswordRequirements';

const validationSchema = Yup.object().shape({
  userName: Yup.string().trim().required('Name is required'),
  designation: Yup.string().optional(),
  department: Yup.string().optional(),
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
  userName: Yup.string().trim().required('Name is required'),
  designation: Yup.string().optional(),
  department: Yup.string().optional(),
  password: Yup.string(),
  confirmPassword: Yup.string()
});

export const ProfileSetup = (props: {
  totalSteps: number;
  setCurrentStep: (step: number) => void;
  currentStep: number;
  tokenData: any;
  setTokenData: (data: any) => void;
}) => {
  const { totalSteps, currentStep, setCurrentStep, tokenData, setTokenData } =
    props;
  const router = useRouter();
  const token = router.query.token;

  const formValidationSchema = useMemo(() => {
    return tokenData?.user?.hasPassword
      ? validationSchemaOptional
      : validationSchema;
  }, [tokenData?.user?.hasPassword]);

  const form = useFormik({
    initialValues: {
      designation: tokenData?.user?.designation || undefined,
      department: tokenData?.user?.department || undefined,
      userName: tokenData?.user?.name || '',
      password: '',
      confirmPassword: ''
    },
    onSubmit: async (values) => {
      const params = {
        userName: values.userName,
        designation: values.designation || undefined,
        department: values.department || undefined,
        password: values.password || undefined,
        action: CompanyOnboardActionEnum.ProfileSetup,
        token: token as string
      };

      const isEqual = _.isEqual(
        {
          name: tokenData?.user?.name.trim(),
          designation: tokenData?.user?.designation?.trim() || undefined,
          department: tokenData?.user?.department?.trim() || undefined
        },
        {
          name: values?.userName?.trim(),
          designation: values?.designation?.trim() || undefined,
          department: values?.department?.trim() || undefined
        }
      );

      CustomerIoUtils.trackEvent({
        eventName: 'onboarding',
        data: {
          step: 'Profile Setup'
        }
      });

      if (tokenData?.user?.hasPassword && isEqual) {
        switch (tokenData?.company?.accountType) {
          case CompanyAccountTypeEnum.VCP:
            router.push(
              `/supplier-onboarding/${currentStep + 1}?token=${token}`
            );

            break;

          case CompanyAccountTypeEnum.Organization:
            router.push(
              `/organization-onboarding/${currentStep + 1}?token=${token}`
            );
            break;
        }
        //@ts-ignore
        setCurrentStep((prev) => prev + 1);
        localStorage.setItem(currentStep.toString(), 'true');
        return;
      }

      const { data, error } =
        await CompanyService.updateCompanyByInviteToken(params);

      if (!error) {
        setTokenData(data);
        switch (tokenData?.company?.accountType) {
          case CompanyAccountTypeEnum.VCP:
            router.push(
              `/supplier-onboarding/${currentStep + 1}?token=${token}`
            );

            break;

          case CompanyAccountTypeEnum.Organization:
            router.push(
              `/organization-onboarding/${currentStep + 1}?token=${token}`
            );
            break;
        }
        //@ts-ignore
        setCurrentStep((prev) => prev + 1);
        localStorage.setItem(currentStep.toString(), 'true');
      } else {
        message.error(error?.message || 'Something went wrong');
      }
    },
    validationSchema: formValidationSchema,
    // validateOnMount: true,
    validateOnChange: true,
    enableReinitialize: true
  });

  function handlePrevious() {
    switch (tokenData?.company?.accountType) {
      case CompanyAccountTypeEnum.VCP:
        router.push(`/supplier-onboarding/${currentStep - 1}?token=${token}`);

        break;

      case CompanyAccountTypeEnum.Organization:
        router.push(
          `/organization-onboarding/${currentStep - 1}?token=${token}`
        );
        break;
    }

    //@ts-ignore
    setCurrentStep((prev) => prev - 1);
  }

  return (
    <OnboardingLayout
      title={'Secure your account'}
      supportingData={{
        title: 'Need help?',
        descriptions: []
      }}
      currentStep={currentStep}
      totalSteps={totalSteps}
      nextButtonProps={{
        visible: true,
        disabled: tokenData?.user?.hasPassword
          ? !!form.errors.userName
          : !form.isValid,
        onClick: form.handleSubmit
      }}
      previousButtonProps={{
        visible: true,
        onClick: handlePrevious
      }}
      loading={form.isSubmitting}
      tokenData={tokenData}
    >
      <div className="flex flex-col gap-5 pb-5">
        <div>
          <FormField
            title="Set up Your Password*"
            description="Create a strong password with at least 8 characters that includes a combination of uppercase and lowercase letters, numbers, and symbols."
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
                  tokenData?.user?.hasPassword
                    ? '********'
                    : form.values.password
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
        </div>
        <div>
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
      </div>
    </OnboardingLayout>
  );
};
