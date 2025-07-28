import { OnboardCompanyTemplateEnum } from '@enums/authEnum';
import { CompanyService } from '@services/CompanyService';
import { message } from 'antd';
import config from 'config';
import { useFormik } from 'formik';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import * as Yup from 'yup';

export interface ICompanyOnboardingStepOneForm {
  userName: string;
  password: string;
  confirmPassword: string;
}

const stepOneValidationSchema = Yup.object().shape({
  userName: Yup.string().required('User name is required'),
  password: Yup.string().required('Password is required').min(8),
  confirmPassword: Yup.string()
    .required('Confirm password is required')
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
});

export interface ICompanyOnboardingStepTwoForm {
  companyName: string;
  industry: string;
  companySize: string;
  experienceInCarbonAccounting: string;
  countryCode: string;
  locations: string[];
}

const stepTwoValidationSchema = Yup.object().shape({
  companyName: Yup.string().required('Company name is required'),
  industry: Yup.string().required('Industry is required'),
  companySize: Yup.string().required('Company size is required'),
  experienceInCarbonAccounting: Yup.string().required(
    'Carbon accounting experience is required'
  ),
  countryCode: Yup.string().required('Country is required'),
  locations: Yup.array().min(1, 'At least one location is required')
});

enum CompanyOnboardingStepsEnum {
  SET_PASSWORD = 1,
  COMPANY_DETAILS = 2,
  SELECT_TEMPLATE = 3
}

export const useCompanyOnboarding = () => {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState<CompanyOnboardingStepsEnum>(1);
  const [template, setTemplate] = useState<OnboardCompanyTemplateEnum>(
    OnboardCompanyTemplateEnum.Industry
  );

  const stepOneForm = useFormik<ICompanyOnboardingStepOneForm>({
    initialValues: {
      userName: '',
      password: '',
      confirmPassword: ''
    },
    onSubmit: async (values) => {},
    validationSchema: stepOneValidationSchema
  });

  const stepTwoForm = useFormik<ICompanyOnboardingStepTwoForm>({
    initialValues: {
      companyName: '',
      industry: '',
      companySize: '',
      experienceInCarbonAccounting: '',
      countryCode: '',
      locations: []
    },
    onSubmit: async (values) => {},
    validationSchema: stepTwoValidationSchema
  });

  const { data, error, isLoading } = useQuery(
    [CompanyService.CHECK_ONBOARDING_TOKEN_URL, router.query.token],
    () => CompanyService.checkOnboardingToken(router.query.token as string),
    {
      enabled: router.isReady
    }
  );

  const { data: formData, isLoading: formDataIsLoading } = useQuery<{
    industryList: string[];
    companySizeList: string[];
    experienceInCarbonAccountingList: string[];
  }>(CompanyService.GET_ONBOARD_COMPANY_FORM_DATA_URL, () =>
    CompanyService.getOnboardCompanyFormData()
  );

  const handleNextStep = () => {
    setCurrentStep((prev) => prev + 1);
  };

  const handlePreviousStep = () => {
    setCurrentStep((prev) => prev - 1);
  };

  const handleChangeTemplate = (template: OnboardCompanyTemplateEnum) => {
    setTemplate(template);
  };

  const completeOnboarding = async () => {
    const { data, error } = await CompanyService.completeOnboarding({
      companyName: stepTwoForm.values.companyName,
      userName: stepOneForm.values.userName,
      userPassword: stepOneForm.values.password,
      token: router.query.token as string,
      industry: stepTwoForm.values.industry,
      companySize: stepTwoForm.values.companySize,
      experienceInCarbonAccounting:
        stepTwoForm.values.experienceInCarbonAccounting,
      template,
      countryCode: stepTwoForm.values.countryCode || undefined,
      locations: stepTwoForm.values.locations.length
        ? stepTwoForm.values.locations
        : undefined
    });

    if (error) {
      message.error(error.message || 'Something went wrong');
    } else {
      message.success(data?.message || 'Company onboarded successfully');
      router.push(config.FRONTEND_URL.CARBON_NEWTRAL);
    }
  };

  return {
    isValidToken: !error && data?.emailId,
    isLoading: isLoading || formDataIsLoading,
    formData,
    stepOneForm,
    stepTwoForm,
    currentStep,
    handleNextStep,
    handlePreviousStep,
    template,
    handleChangeTemplate,
    completeOnboarding
  };
};
