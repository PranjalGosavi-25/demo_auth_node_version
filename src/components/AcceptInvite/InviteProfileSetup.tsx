import { Input, Select, Tooltip, message } from 'antd';
import { FormField } from '@components/Common';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useRouter } from 'next/router';
import { useMemo } from 'react';
import _ from 'lodash';
import { OnboardingLayout } from '@components/Onboarding/OnboardingLayout';
import { AuthService } from '@services/AuthService';
import { PASSWORD_REGEX } from '@constants/common';
import { PasswordRequirements } from '@components/Common/PasswordRequirements';
import { ConfirmPasswordRequirements } from '@components/Common/ConfirmPasswordRequirements';

const validationSchema = Yup.object().shape({
  designation: Yup.string().trim().optional(),
  password: Yup.string()
    .required()
    .matches(
      PASSWORD_REGEX,
      'Password must contain one capital letter, one lower letter, one number, one special character(@$!%*?&), and be at least 8 characters long'
    ),
  confirmPassword: Yup.string()
    .required()
    .oneOf([Yup.ref('password'), null], 'Password must match')
});

const validationSchemaOptional = Yup.object().shape({
  designation: Yup.string()
    .trim()
    // .matches(
    //   /^[A-Za-z\s]*$/,
    //   'Designation must only contain alphabetic characters'
    // )
    .optional(),
  password: Yup.string(),
  confirmPassword: Yup.string()
});

export const InviteProfileSetup = (props: {
  totalSteps: number;
  setCurrentStep: (step: number) => void;
  tokenData: any;
  setTokenData: (data: any) => void;
}) => {
  const { totalSteps, setCurrentStep, tokenData, setTokenData } = props;
  const router = useRouter();
  const token = router.query.token;

  const formValidationSchema = useMemo(() => {
    return tokenData?.hasPassword ? validationSchemaOptional : validationSchema;
  }, [tokenData?.hasPassword]);

  const form = useFormik({
    initialValues: {
      designation: tokenData?.designation || undefined,
      password: '',
      confirmPassword: ''
    },
    onSubmit: async (values) => {
      await handleSubmit(values);
    },
    validationSchema: formValidationSchema,
    validateOnMount: true,
    enableReinitialize: true
  });

  async function handleSubmit(values: any) {
    form.setSubmitting(true);

    const isEqual = _.isEqual(
      {
        designation: tokenData?.designation?.trim() || undefined
      },
      {
        designation: values?.designation?.trim() || undefined
      }
    );

    if (isEqual && tokenData?.hasPassword) {
      router.push(`/accept-invite?token=${token}&step=2`);
      setCurrentStep(2);
      return;
    }

    const { error, data } = await AuthService.verifyUser({
      //@ts-ignore
      token,
      password: values.password || undefined,
      designation: values.designation || undefined
    });
    form.setSubmitting(false);

    if (error) {
      message.error(error.message || 'Something went wrong');
    } else {
      router.push(`/accept-invite?token=${token}&step=2`);
      setCurrentStep(2);
      setTokenData(data);
    }
  }

  return (
    <OnboardingLayout
      title="Setting it up for your organisation"
      supportingData={{
        title: 'Profile Setup',
        descriptions: [
          'We will use this information to contextualise your account and communication.'
        ]
      }}
      currentStep={1}
      totalSteps={totalSteps}
      nextButtonProps={{
        visible: true,
        disabled: tokenData?.hasPassword
          ? !!form.errors.designation
          : !form.isValid,
        onClick: form.handleSubmit
      }}
      loading={form.isSubmitting}
    >
      <div className="flex flex-col gap-5 pb-5">
        <FormField
          title="Password*"
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
              value={tokenData?.hasPassword ? '********' : form.values.password}
              name="password"
              disabled={tokenData?.hasPassword}
              onChange={form.handleChange}
              onBlur={form.handleBlur}
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
                tokenData?.hasPassword
                  ? '********'
                  : form.values.confirmPassword
              }
              name="confirmPassword"
              disabled={tokenData?.hasPassword}
              onChange={form.handleChange}
              onBlur={form.handleBlur}
            />
          </Tooltip>
        </FormField>
      </div>
    </OnboardingLayout>
  );
};
