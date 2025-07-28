import { Button, Input, Select, Typography } from 'antd';
import { CompanyOnboardingTemplate } from './CompanyOnboardingTemplate';
import { FormField } from '@components/Common';
import { FormikProps } from 'formik';
import { ICompanyOnboardingStepTwoForm } from '@hooks/auth';
import { CompanyOnboardingTutorialVideosEnum } from '@enums/companyOnboardingEnum';
import { SelectLocation } from '@components/Common/SelectLocation';
import { useCountries } from '@hooks/useCountries';

export const CompanyOnboardingStepTwo = (props: {
  formData: {
    industryList: string[];
    companySizeList: string[];
    experienceInCarbonAccountingList: string[];
  };
  selectedLocations: any[];
  setSelectedLocations: (value: any[]) => void;
  form: FormikProps<ICompanyOnboardingStepTwoForm>;
  handleNextStep: () => void;
  handlePreviousStep: () => void;
}) => {
  const {
    formData,
    form,
    handleNextStep,
    handlePreviousStep,
    selectedLocations,
    setSelectedLocations
  } = props;
  const { countries, handleCountrySearch } = useCountries();

  return (
    <CompanyOnboardingTemplate
      videoURL={CompanyOnboardingTutorialVideosEnum.COMPANY_DETAILS}
    >
      <div className="w-[360px] lg:px-0 px-8">
        <Typography className="font-semibold text-4xl text-gray-900 mb-8">
          Welcome!
        </Typography>

        <div className="flex flex-col gap-5 mb-5">
          <FormField title="Company Name*">
            <Input
              name="companyName"
              value={form.values.companyName}
              onChange={form.handleChange}
              onBlur={form.handleBlur}
            />
          </FormField>

          <FormField title="Industry*">
            <Select
              value={form.values.industry}
              onChange={(value) => form.setFieldValue('industry', value)}
              onBlur={form.handleBlur}
              options={formData?.industryList?.map((industry) => ({
                label: industry,
                value: industry
              }))}
            />
          </FormField>

          <FormField title="Company Size*">
            <Select
              value={form.values.companySize}
              onChange={(value) => form.setFieldValue('companySize', value)}
              onBlur={form.handleBlur}
              options={formData?.companySizeList?.map((companySize) => ({
                label: companySize,
                value: companySize
              }))}
            />
          </FormField>

          <FormField title="Your experience in carbon accounting*">
            <Select
              value={form.values.experienceInCarbonAccounting}
              onChange={(value) =>
                form.setFieldValue('experienceInCarbonAccounting', value)
              }
              onBlur={form.handleBlur}
              options={formData?.experienceInCarbonAccountingList?.map(
                (experienceInCarbonAccounting) => ({
                  label: experienceInCarbonAccounting,
                  value: experienceInCarbonAccounting
                })
              )}
            />
          </FormField>

          <FormField title="Country*">
            <Select
              value={form.values.countryCode}
              onChange={(value) => {
                form.setFieldValue('countryCode', value || '');
                form.setFieldValue('locations', []);
              }}
              onBlur={form.handleBlur}
              onSearch={handleCountrySearch}
              showSearch={true}
              filterOption={false}
              allowClear
              onClear={() => {
                handleCountrySearch('');
              }}
              autoClearSearchValue
            >
              {countries?.map((country) => (
                <Select.Option value={country.code} key={country.code}>
                  {country.name}
                </Select.Option>
              ))}
            </Select>
          </FormField>

          <FormField title="Locations*">
            <SelectLocation
              onChange={(value: string[]) =>
                form.setFieldValue('locations', value)
              }
              onBlur={
                form.handleBlur as (eventOrString?: any) => void | undefined
              }
              value={form.values.locations}
              countryCode={form.values.countryCode}
              disableDropdown={!form.values.countryCode}
              withCountryCode={true}
              setSelectedLocations={setSelectedLocations}
              selectedLocations={selectedLocations}
            />
          </FormField>
        </div>

        <Button
          className="btn-primary w-full mb-5"
          disabled={!(form.isValid && form.dirty)}
          onClick={handleNextStep}
        >
          Next
        </Button>

        <Button
          className="w-full text-gray-600 text-sm"
          type="text"
          onClick={handlePreviousStep}
        >
          Go back
        </Button>
      </div>
    </CompanyOnboardingTemplate>
  );
};
