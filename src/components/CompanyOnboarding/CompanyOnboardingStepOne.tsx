import { ICompanyOnboardingStepOneForm } from '@hooks/auth';
import { FormikProps } from 'formik';
import { CompanyOnboardingTemplate } from './CompanyOnboardingTemplate';
import { Button, Input, Typography } from 'antd';
import { FormField } from '@components/Common';
import { EyeOutlineIcon } from 'newtral-icons';

export const CompanyOnboardingStepOne = (props: {
  form: FormikProps<ICompanyOnboardingStepOneForm>;
  handleNextStep: () => void;
}) => {
  const { form, handleNextStep } = props;

  return (
    <CompanyOnboardingTemplate>
      <div className="w-[360px]">
        <Typography className="font-semibold text-4xl text-gray-900 mb-8">
          Set up account
        </Typography>

        <div className="flex flex-col gap-5 mb-5">
          <FormField title="Your name">
            <Input
              name="userName"
              value={form.values.userName}
              onChange={form.handleChange}
              onBlur={form.handleBlur}
            />
          </FormField>

          <FormField
            title="Password"
            description="Your password must be at least 8 characters long"
          >
            <Input
              type="password"
              name="password"
              value={form.values.password}
              onChange={form.handleChange}
              onBlur={form.handleBlur}
            />
          </FormField>

          <FormField title="Confirm Password">
            <Input
              type="password"
              name="confirmPassword"
              value={form.values.confirmPassword}
              onChange={form.handleChange}
              onBlur={form.handleBlur}
            />
          </FormField>
        </div>

        <Button
          className="btn-primary w-full"
          onClick={handleNextStep}
          disabled={!(form.isValid && form.dirty)}
        >
          Next
        </Button>
      </div>
    </CompanyOnboardingTemplate>
  );
};
