import { FormField } from '@components/Common';
import {
  CompanyOnboardActionEnum,
  RegionEnum
} from '@enums/companyOnboardingEnum';
import { Input, Select, message } from 'antd';
import { useFormik } from 'formik';
import React from 'react';
import * as Yup from 'yup';
import VCPOnboardingLayout from './VCPOnboardingLayout';
import _ from 'lodash';
import { CompanyService } from '@services/CompanyService';
import { useRouter } from 'next/router';
import { CustomerIoUtils } from '@utils/cutomerio';
import SelfServeOnboardingLayout from '../SelfServeOnboardingLayout';

const validationSchema = Yup.object().shape({
  userName: Yup.string().required('Your name is required'),
  companyName: Yup.string().required('Company name is required'),
  dataHostingRegion: Yup.string().required('Data hosting region is required')
});

function AccountSetup(props: {
  currentStep: number;
  tokenData: any;
  setCurrentStep: (step: number) => void;
  setTokenData: (data: any) => void;
}) {
  const { currentStep, tokenData, setCurrentStep, setTokenData } = props;
  const router = useRouter();
  const token = router.query.token as string;

  const form = useFormik({
    initialValues: {
      userName: tokenData?.user?.name || '',
      companyName: tokenData?.company?.name || '',
      dataHostingRegion: tokenData?.company?.region || RegionEnum.USA
    },
    validationSchema,
    validateOnMount: true,
    enableReinitialize: true,
    onSubmit: async (values) => {
      const params = {
        ...values,
        token: token,
        action: CompanyOnboardActionEnum.OrganisationSetup
      };

      const isEqual = _.isEqual(
        {
          userName: tokenData?.user?.name || '',
          companyName: tokenData?.company?.name || '',
          dataHostingRegion: tokenData?.company?.region
        },
        {
          userName: values.userName?.trim(),
          companyName: values.companyName?.trim(),
          dataHostingRegion: values.dataHostingRegion
        }
      );

      CustomerIoUtils.trackEvent({
        eventName: 'onboarding',
        data: {
          step: 'Organization Setup'
        }
      });

      if (isEqual) {
        setCurrentStep(currentStep + 1);
        router.push({
          pathname: '/company-onboarding',
          query: { step: currentStep + 1, token: token }
        });
        localStorage.setItem(currentStep.toString(), 'true');
        return;
      }

      const { data, error } =
        await CompanyService.updateOnboardingCompanyByToken(params);

      if (data) {
        setCurrentStep(currentStep + 1);
        router.push({
          pathname: '/company-onboarding',
          query: { step: currentStep + 1, token: token }
        });
        localStorage.setItem(currentStep.toString(), 'true');
        setTokenData(data);
      } else {
        message.error(error?.message || 'Something went wrong');
      }
    }
  });

  return (
    <SelfServeOnboardingLayout
      nextButtonProps={{
        label: 'Next',
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
      loading={form.isSubmitting}
      // description={
      //   tokenData?.company?.referralCompanyName
      //     ? `Invited by ${tokenData?.company?.referralCompanyName}`
      //     : `Newtral AI Platform`
      // }
    >
      <div className="flex flex-col gap-5 pb-5">
        <FormField title="Your Name*">
          <Input
            placeholder="eg. John Doe"
            name="userName"
            onBlur={form.handleBlur}
            value={form.values.userName}
            onChange={form.handleChange}
          />
        </FormField>

        <FormField title="Company Name*">
          <Input
            placeholder="eg. Acme Inc"
            name="companyName"
            onBlur={form.handleBlur}
            value={form.values.companyName}
            onChange={form.handleChange}
          />
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
      </div>
    </SelfServeOnboardingLayout>
  );
}

export default AccountSetup;
