import { OnboardingLayout } from '../OnboardingLayout';
import { useRouter } from 'next/router';
import { Input, message } from 'antd';
import { FormField } from '@components/Common';
import { useFormik } from 'formik';
import { CompanyService } from '@services/CompanyService';
import { CompanyOnboardActionEnum } from '@enums/companyOnboardingEnum';
import * as Yup from 'yup';
import _ from 'lodash';
import { CustomerIoUtils } from '@utils/cutomerio';
import { SupplierTypeEnum } from '@enums/common';

const validationSchema = Yup.object().shape({
  gstNumber: Yup.string().trim(),
  // .matches(
  //   /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/,
  //   'Invalid GST number'
  // ),
  contactPersonName: Yup.string()
    .trim()
    .required('Contact Person Name is Required'),
  contactPersonNumber: Yup.string()
    .trim()
    .matches(/^(\+\d{1,3}[- ]?)?\d{10}$/, 'Invalid mobile number')
    .required('Contact Person Number is Required'),
  contactPersonEmail: Yup.string()
    .email()
    .trim()
    .required('Contact Person Email is Required')
});

export const BusinessSetup = (props: {
  totalSteps: number;
  currentStep: number;
  setCurrentStep: (step: number) => void;
  tokenData: any;
  setTokenData: (data: any) => void;
}) => {
  const { totalSteps, setCurrentStep, tokenData, currentStep, setTokenData } =
    props;
  const router = useRouter();
  const token = router.query.token;

  const form = useFormik({
    initialValues: {
      gstNumber: tokenData?.company?.billingInfo?.gstNumber || undefined,
      contactPersonName:
        tokenData?.company?.billingInfo?.contactPersonName || undefined,
      contactPersonNumber:
        tokenData?.company?.billingInfo?.contactPersonNumber || undefined,
      contactPersonEmail:
        tokenData?.company?.billingInfo?.contactPersonEmail || undefined
    },

    onSubmit: async (values) => {
      const params: any = {
        token: token as string,
        action: CompanyOnboardActionEnum.BillingSetup,
        billingInfo: {
          gstNumber: values?.gstNumber?.trim() || undefined,
          contactPersonName: values?.contactPersonName,
          contactPersonNumber: values?.contactPersonNumber,
          contactPersonEmail: values?.contactPersonEmail
        }
      };

      CustomerIoUtils.trackEvent({
        eventName: 'onboarding',
        data: {
          step: 'Billing Setup'
        }
      });

      if (
        _.isEqual(
          {
            gstNumber: tokenData?.company?.billingInfo?.gstNumber?.trim(),
            contactPersonName:
              tokenData?.company?.billingInfo?.contactPersonName?.trim(),
            contactPersonNumber:
              tokenData?.company?.billingInfo?.contactPersonNumber?.trim(),
            contactPersonEmail:
              tokenData?.company?.billingInfo?.contactPersonEmail?.trim()
          },
          {
            gstNumber: values?.gstNumber?.trim() || undefined,
            contactPersonName: values?.contactPersonName,
            contactPersonNumber: values?.contactPersonNumber,
            contactPersonEmail: values?.contactPersonEmail
          }
        )
      ) {
        router.push(`/supplier-onboarding/${currentStep + 1}?token=${token}`);
        localStorage.setItem(`${currentStep}`, 'true');
        //@ts-ignore
        setCurrentStep((prev) => prev + 1);
        return;
      }

      const { data, error } =
        await CompanyService.updateCompanyByInviteToken(params);

      if (error) {
        message.error(error?.message || 'Something went wrong');
      } else {
        setTokenData(data);
        router.push(`/supplier-onboarding/${currentStep + 1}?token=${token}`);
        localStorage.setItem(`${currentStep}`, 'true');
        //@ts-ignore
        setCurrentStep((prev) => prev + 1);
      }
    },
    validationSchema,
    validateOnMount: true,
    // validateOnChange: false,
    enableReinitialize: true
  });

  function handlePrevious() {
    router.push(`/supplier-onboarding/${currentStep - 1}?token=${token}`);
    //@ts-ignore
    setCurrentStep((prev) => prev - 1);
  }

  return (
    <OnboardingLayout
      title={'Business Information'}
      supportingData={{
        title: 'Need help?',
        descriptions: []
      }}
      currentStep={currentStep}
      totalSteps={totalSteps}
      nextButtonProps={{
        visible: true,
        onClick: form.handleSubmit,
        disabled: !form.isValid
      }}
      previousButtonProps={{
        visible: true,
        onClick: handlePrevious
      }}
      loading={form.isSubmitting}
      tokenData={tokenData}
    >
      <div className="flex flex-col gap-4">
        <FormField title="GST Number (optional)">
          <Input
            placeholder="GST Number"
            value={form.values.gstNumber}
            name="gstNumber"
            onChange={form.handleChange}
            onBlur={form.handleBlur}
          />
          {form.errors.gstNumber && form.touched.gstNumber && (
            <p className="text-red-500 text-sm">
              {/* @ts-ignore */}
              {form.errors.gstNumber}
            </p>
          )}
        </FormField>

        <div className="flex w-full gap-4">
          <div className="w-full">
            <FormField title="Contact Person Name*">
              <Input
                placeholder="Full Name"
                value={form.values.contactPersonName}
                name="contactPersonName"
                onChange={form.handleChange}
                onBlur={form.handleBlur}
              />
              {form.errors.contactPersonName &&
                form.touched.contactPersonName && (
                  <p className="text-red-500 text-sm">
                    {/* @ts-ignore */}
                    {form.errors.contactPersonName}
                  </p>
                )}
            </FormField>
          </div>
          <div className="w-full">
            <FormField title="Contact Person Number*">
              <Input
                placeholder="+91 0000000000"
                value={form.values.contactPersonNumber}
                name="contactPersonNumber"
                onChange={form.handleChange}
                onBlur={form.handleBlur}
              />
              {form.errors.contactPersonNumber &&
                form.touched.contactPersonNumber && (
                  <p className="text-red-500 text-sm">
                    {/* @ts-ignore */}
                    {form.errors.contactPersonNumber}
                  </p>
                )}
            </FormField>
          </div>
        </div>
        <FormField title="Contact Person Email ID*">
          <Input
            placeholder="Contact Person Email"
            value={form.values.contactPersonEmail}
            name="contactPersonEmail"
            onChange={form.handleChange}
            onBlur={form.handleBlur}
          />
          {form.errors.contactPersonEmail &&
            form.touched.contactPersonEmail && (
              <p className="text-red-500 text-sm">
                {/* @ts-ignore */}
                {form.errors.contactPersonEmail}
              </p>
            )}
        </FormField>
      </div>
    </OnboardingLayout>
  );
};
