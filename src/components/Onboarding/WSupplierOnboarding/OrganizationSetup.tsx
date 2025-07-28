import { useFormik } from 'formik';
import { OnboardingLayout } from '../OnboardingLayout';
import { FormField } from '@components/Common';
import { Input, Select, message } from 'antd';
import * as Yup from 'yup';
import { SECTOR_INDUSTRY_MAPPING } from '@constants/Sector';
import { useMemo } from 'react';
import { useRouter } from 'next/router';
import { CompanyService } from '@services/CompanyService';
import {
  CompanyOnboardActionEnum,
  CompanySizeEnum,
  RegionEnum
} from '@enums/companyOnboardingEnum';
import _ from 'lodash';
import { CompanyAccountTypeEnum, SupplierTypeEnum } from '@enums/common';
import { CustomerIoUtils } from '@utils/cutomerio';

const validationSchema = Yup.object().shape({
  companyName: Yup.string().required('Company name is required'),
  sector: Yup.string().required('Sector is required'),
  industry: Yup.string().required('Industry is required'),
  size: Yup.string().required('Number of Employees is required'),
  region: Yup.string().required('Region is required')
});

const supplierValidationSchema = Yup.object().shape({
  companyName: Yup.string().required('Company name is required'),
  sector: Yup.string().required('Sector is required'),
  industry: Yup.string().required('Industry is required'),
  size: Yup.string().required('Number of Employees is required')
});

export const OrganizationSetup = (props: {
  totalSteps: number;
  setCurrentStep: (step: number) => void;
  tokenData: any;
  setTokenData: (data: any) => void;
  currentStep: number;
}) => {
  const { totalSteps, setCurrentStep, tokenData, setTokenData, currentStep } =
    props;
  const router = useRouter();
  const token = router.query.token;

  const form = useFormik({
    initialValues: {
      companyName: tokenData?.company?.name || '',
      sector: tokenData?.company?.sector || undefined,
      industry: tokenData?.company?.industry || undefined,
      size: tokenData?.company?.size || undefined,
      region: tokenData?.company?.region || undefined
    },
    onSubmit: async (values) => {
      const params = {
        ...values,
        action: CompanyOnboardActionEnum.OrganisationSetup,
        token: token as string
      };

      const isEqual = _.isEqual(
        {
          name: tokenData?.company?.name.trim(),
          sector: tokenData?.company?.sector,
          industry: tokenData?.company?.industry,
          size: tokenData?.company?.size,
          region: tokenData?.company?.region
        },
        {
          name: values.companyName.trim(),
          sector: values.sector,
          industry: values.industry,
          size: values.size,
          region: values.region
        }
      );

      CustomerIoUtils.trackEvent({
        eventName: 'onboarding',
        data: {
          step: 'Organization Setup'
        }
      });

      if (isEqual) {
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
    validationSchema:
      tokenData?.company?.accountType === CompanyAccountTypeEnum.VCP
        ? supplierValidationSchema
        : validationSchema,
    validateOnMount: true,
    enableReinitialize: true
  });

  const industryOptions = useMemo(() => {
    const sector = SECTOR_INDUSTRY_MAPPING.find(
      (sector) => sector.name === form.values.sector
    );

    if (!sector) {
      return [];
    }

    return sector.industries.map((industry) => {
      return {
        label: industry.name,
        value: industry.name
      };
    });
  }, [form.values.sector]);

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
      title="Welcome"
      supportingData={{
        title: 'Need help?',
        descriptions: []
      }}
      currentStep={currentStep}
      totalSteps={totalSteps}
      nextButtonProps={{
        visible: true,
        disabled: !form.isValid,
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
        <FormField title="Company Name*">
          <Input
            placeholder="Company Name"
            name="companyName"
            onBlur={form.handleBlur}
            value={form.values.companyName}
            onChange={form.handleChange}
          />
        </FormField>

        <FormField title="Sector*">
          <Select
            value={form.values.sector}
            onChange={(value) => {
              form.setFieldValue('sector', value);
              form.setFieldValue('industry', undefined);
            }}
            onBlur={() => form.setFieldTouched('sector', true)}
            placeholder="Select Sector"
            options={SECTOR_INDUSTRY_MAPPING.map((sector) => {
              return {
                label: sector.name,
                value: sector.name
              };
            })}
          />
        </FormField>

        <FormField title="Industry*">
          <Select
            value={form.values.industry}
            onChange={(value) => {
              form.setFieldValue('industry', value);
            }}
            onBlur={() => form.setFieldTouched('industry', true)}
            placeholder="Select Industry"
            options={industryOptions}
            disabled={!form.values.sector}
          />
        </FormField>

        <FormField title="Number of Employees*">
          <Select
            className="`w-full placeholder:text-gray-500 placeholder:font-normal  bg-white"
            placeholder="Employee Headcount"
            value={form.values.size}
            onChange={(value: any) => {
              form.setFieldValue('size', value);
            }}
          >
            {Object.values(CompanySizeEnum)?.map((item: any, i: number) => (
              <Select.Option key={i} value={item}>
                <div className="text-gray-900 font-medium">{item}</div>
              </Select.Option>
            ))}
          </Select>
        </FormField>

        {CompanyAccountTypeEnum.Organization ===
          tokenData?.company?.accountType && (
          <FormField
            title="Data Hosting Region Preference*"
            description="Newtral uses Amazon Web Services (AWS) for Data Hosting. Selected region will be preferred for Data Hosting."
          >
            <Select
              className="`w-full placeholder:text-gray-500 placeholder:font-normal  bg-white"
              placeholder="Select Data Hosting Region"
              value={form.values.region}
              onChange={(value: any) => {
                form.setFieldValue('region', value);
              }}
            >
              {Object.values(RegionEnum)?.map((item: any, i: number) => (
                <Select.Option key={i} value={item}>
                  <div className="text-gray-900 font-medium">{item}</div>
                </Select.Option>
              ))}
            </Select>
          </FormField>
        )}
      </div>
    </OnboardingLayout>
  );
};
