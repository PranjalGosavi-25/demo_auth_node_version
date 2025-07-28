import { useFormik } from 'formik';
import { OnboardingLayout } from '../OnboardingLayout';
import { FormField } from '@components/Common';
import { Input, Select, message } from 'antd';
import * as Yup from 'yup';
import { SECTOR_INDUSTRY_MAPPING } from '@constants/Sector';
import { useMemo } from 'react';
import { useRouter } from 'next/router';
import { CompanyService } from '@services/CompanyService';
import { CompanySizeEnum, RegionEnum } from '@enums/companyOnboardingEnum';
import _ from 'lodash';
import { CompanyAccountTypeEnum, SupplierTypeEnum } from '@enums/common';
import { CustomerIoUtils } from '@utils/cutomerio';
import VCPOnboardingLayout from '../VCPOnboarding/VCPOnboardingLayout';
import { NumberInput } from '@components/Common/NumberInput';
import SelfServeOnboardingLayout from '../SelfServeOnboardingLayout';

const validationSchema = Yup.object().shape({
  // userName: Yup.string().required('Name is required'),
  companyName: Yup.string().required('Company name is required'),
  // subIndustry: Yup.string().required('Industry is required'),
  size: Yup.string().required('Number of Employees is required'),
  dataHostingRegion: Yup.string().required('Region is required')
  // revenue: Yup.number().required('Revenue is required')
});

export const SelfServeAccountSetup = (props: {
  setCurrentStep: (step: number) => void;
  tokenData: any;
  setTokenData: (data: any) => void;
  currentStep: number;
}) => {
  const { setCurrentStep, tokenData, setTokenData, currentStep } = props;
  const router = useRouter();
  const token = router.query.token;

  const form = useFormik({
    initialValues: {
      // userName: tokenData?.companyData?.name || '',
      companyName: tokenData?.companyData?.name || '',
      subIndustry: tokenData?.companyData?.subIndustry || undefined,
      size: tokenData?.companyData?.size || undefined,
      dataHostingRegion:
        tokenData?.companyData?.dataHostingRegion || RegionEnum.USA,
      revenue: tokenData?.companyData?.revenue || undefined
    },
    onSubmit: async (values) => {
      const params = {
        token: token as string,
        companyData: {
          // // userName: values.userName.trim(),
          name: values.companyName.trim(),
          subIndustry: values.subIndustry,
          size: values.size,
          dataHostingRegion: values.dataHostingRegion,
          revenue: values.revenue
        }
      };

      const isEqual = _.isEqual(
        {
          // // userName: tokenData?.company?.userName.trim(),
          name: tokenData?.company?.name.trim(),
          subIndustry: tokenData?.company?.subIndustry,
          size: tokenData?.company?.size,
          dataHostingRegion: tokenData?.company?.dataHostingRegion,
          revenue: tokenData?.company?.revenue
        },
        {
          // // userName: values.userName.trim(),
          name: values.companyName.trim(),
          subIndustry: values.subIndustry,
          size: values.size,
          dataHostingRegion: values.dataHostingRegion,
          revenue: values.revenue
        }
      );

      if (isEqual) {
        setCurrentStep(currentStep + 1);
        router.push({
          pathname: '/onboarding',
          query: { step: currentStep + 1, token: token }
        });
        localStorage.setItem(currentStep.toString(), 'true');
        return;
      }

      const { data, error } =
        await CompanyService.updateSelfServeCompanyByToken(params);

      if (data) {
        await CompanyService.completeSelfServeCompanyOnboarding({
          token: token as string
        });

        setCurrentStep(currentStep + 1);
        router.push({
          pathname: '/onboarding',
          query: { step: currentStep + 1, token: token }
        });
        localStorage.setItem(currentStep.toString(), 'true');
        localStorage.setItem('xss-token', 'true');
      } else {
        message.error(error?.message || 'Something went wrong');
      }
    },
    validationSchema,
    enableReinitialize: true
  });

  const subIndustryOptions = useMemo(() => {
    const data = SECTOR_INDUSTRY_MAPPING.flatMap((item) => {
      return item.industries.flatMap((industry) => {
        return industry.subIndustries.map((subIndustry) => ({
          label: subIndustry.name,
          value: subIndustry.name
        }));
      });
    });

    return _.uniqBy(data, 'value');
  }, []);

  return (
    <SelfServeOnboardingLayout
      nextButtonProps={{
        disabled: !form.isValid,
        onClick: form.handleSubmit,
        label: 'Create Account'
      }}
      loading={form.isSubmitting}
    >
      <div className="flex flex-col gap-5 pb-5">
        {/* <FormField title="Your Name*">
          <Input
            placeholder="Your Name"
            name="userName"
            onBlur={form.handleBlur}
            value={form.values.userName}
            onChange={form.handleChange}
          />
        </FormField> */}

        <FormField title="Company Name*">
          <Input
            placeholder="Company Name"
            name="companyName"
            onBlur={form.handleBlur}
            value={form.values.companyName}
            onChange={form.handleChange}
          />
        </FormField>

        {/* <FormField title="Sub Industry*">
          <Select
            value={form.values.subIndustry}
            onChange={(value) => {
              form.setFieldValue('subIndustry', value);
            }}
            onBlur={() => form.setFieldTouched('subIndustry', true)}
            placeholder="Select Sub Industry"
            options={subIndustryOptions}
            filterOption={(input, option) => {
              return (option?.value ?? '')
                .toLowerCase()
                .includes(input.toLowerCase());
            }}
            showSearch
            filterSort={(optionA: any, optionB: any) =>
              (optionA?.value ?? '')
                .toLowerCase()
                .localeCompare((optionB?.value ?? '').toLowerCase())
            }
          />
        </FormField> */}

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
                {item}
              </Select.Option>
            ))}
          </Select>
        </FormField>

        <FormField
          title="Data Hosting Region Preference*"
          description="Selected region will be preferred for Data Hosting."
        >
          <Select
            className=""
            placeholder="Select Data Hosting Region"
            value={form.values.dataHostingRegion}
            onChange={(value: any) => {
              form.setFieldValue('dataHostingRegion', value);
            }}
          >
            {Object.values(RegionEnum).map((item: any, i: number) => (
              <Select.Option key={i} value={item}>
                {item}
              </Select.Option>
            ))}
          </Select>
        </FormField>

        {/* <FormField title="Revenue (USD)*">
          <NumberInput
            placeholder="Revenue"
            name="revenue"
            onBlur={form.handleBlur}
            value={form.values.revenue}
            onChange={form.handleChange}
          />
        </FormField> */}
      </div>
    </SelfServeOnboardingLayout>
  );
};
