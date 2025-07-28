import { useEffect, useState } from 'react';
import { PageNotFound } from '@components/Common/PageNotFound';
import { useRouter } from 'next/router';
import { OrganizationSetup } from './OrganizationSetup';
import { ProfileSetup } from './ProfileSetup';
import {
  CompanyAccountTypeEnum,
  StateEnum,
  SupplierTypeEnum
} from '@enums/common';
import { BusinessSetup } from './BusinessSetup';
import { CollectionAndSharing } from './CollectionAndSharing';
import { CompanyService } from '@services/CompanyService';
import { useQuery } from 'react-query';
import { Loader, State } from '@components/Common';
import { CommonUtils } from '@utils/common';
import { PlatformTrustMark } from './PlatformTrustMark';
import { IntercomHelper } from '@utils/intercom';
import { CustomerIoUtils } from '@utils/cutomerio';

export const WSupplierOnboarding = () => {
  const [tokenData, setTokenData] = useState<any>(null);
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 5;
  const router = useRouter();
  const token = router.query.token;

  const { data, error, isLoading } = useQuery(
    [CompanyService.VERIFY_COMPANY_INVITE_TOKEN, { token }],
    () => CompanyService.verifyCompanyInviteToken(token as string),
    {
      enabled: !!token,
      onSuccess: (data) => {
        setTokenData(data);
        if (data?.user && data?.company) {
          IntercomHelper.initIntercom({
            user: data?.user,
            company: data?.company
          });
          CustomerIoUtils.identifyUser({
            user: data?.user
          });
        }
      }
    }
  );

  useEffect(() => {
    const step = router.query.step;

    const stepMapping = {
      1: 'Platform Trust Mark',
      2: 'Organization Setup',
      3: 'Billing Setup',
      4: 'Profile Setup',
      5: 'Collection & Sharing'
    } as any;

    if (step) {
      CustomerIoUtils.trackEvent({
        eventName: 'onboarding_step_viewed',
        data: {
          step: stepMapping[step as string]
        }
      });
    }

    setCurrentStep(step ? parseInt(step as string) : 1);
  }, [router.query]);

  if (isLoading) {
    return <Loader fullScreen />;
  }

  if (error) {
    return (
      <State
        state={StateEnum.Warning}
        // @ts-ignore
        title={'Onboarding Status'}
        description={
          'The on-boarding invitation you are attempting to see is either completed or expired.'
        }
      />
    );
  }

  if (!CommonUtils.isValidOnboarding({ currentStep, totalSteps, token })) {
    return <PageNotFound fullScreen />;
  }

  if (tokenData?.company?.accountType != CompanyAccountTypeEnum.VCP) {
    return <PageNotFound fullScreen />;
  }

  return (
    <>
      {currentStep === 1 && (
        <PlatformTrustMark
          totalSteps={totalSteps}
          setCurrentStep={setCurrentStep}
          tokenData={tokenData}
          currentStep={currentStep}
        />
      )}
      {currentStep === 2 && (
        <OrganizationSetup
          totalSteps={totalSteps}
          setCurrentStep={setCurrentStep}
          tokenData={tokenData}
          setTokenData={setTokenData}
          currentStep={currentStep}
        />
      )}
      {currentStep === 3 && (
        <BusinessSetup
          totalSteps={totalSteps}
          setCurrentStep={setCurrentStep}
          tokenData={tokenData}
          setTokenData={setTokenData}
          currentStep={currentStep}
        />
      )}

      {currentStep === 4 && (
        <ProfileSetup
          totalSteps={totalSteps}
          setCurrentStep={setCurrentStep}
          tokenData={tokenData}
          currentStep={currentStep}
          setTokenData={setTokenData}
        />
      )}
      {currentStep === 5 && (
        <CollectionAndSharing
          totalSteps={totalSteps}
          setCurrentStep={setCurrentStep}
          tokenData={tokenData}
          currentStep={currentStep}
        />
      )}
    </>
  );
};
