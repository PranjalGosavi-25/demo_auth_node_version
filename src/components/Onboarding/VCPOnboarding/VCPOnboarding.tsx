import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useQuery } from 'react-query';
import { CompanyService } from '@services/CompanyService';
import { IntercomHelper } from '@utils/intercom';
import { CustomerIoUtils } from '@utils/cutomerio';
import { Loader, State } from '@components/Common';
import { StateEnum } from '@enums/common';
import AccountSetup from './AccountSetup';
import PasswordSetup from './PasswordSetup';
import Congratulate from './Congratulate';
import { CommonUtils } from '@utils/common';
import { PageNotFound } from '@components/Common/PageNotFound';
import { InvitationDetail } from './InvitationDetail';
import { VCPSubscriptionPlan } from './VCPSubscriptionPlan';
import SuccessScreen from '@components/Common/SuccessScreen';
import { CALCOM_LINKS } from '@constants/common';
import config from 'config';

function VCPOnboarding() {
  const [tokenData, setTokenData] = useState<any>(null);
  const [currentStep, setCurrentStep] = useState(1);
  const [serverTokenData, setServerTokenData] = useState<any>(null);
  const router = useRouter();
  const token = router.query.token;
  const totalSteps = 3;

  const { data, error, isLoading } = useQuery(
    [CompanyService.VERIFY_COMPANY_INVITE_TOKEN, { token }],
    () => CompanyService.verifyCompanyInviteToken(token as string),
    {
      enabled: !!token,
      onSuccess: (data) => {
        setTokenData(data);
        setServerTokenData(data);
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
    setCurrentStep(step ? parseInt(step as string) : 1);
  }, [router.query]);

  if (isLoading) {
    return <Loader fullScreen />;
  }

  if (error && !localStorage.getItem('xv-token')) {
    return (
      <State
        state={StateEnum.Warning}
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

  return (
    <>
      {currentStep === 1 && (
        <InvitationDetail
          setCurrentStep={setCurrentStep}
          tokenData={tokenData}
          setTokenData={setTokenData}
          currentStep={currentStep}
          serverTokenData={serverTokenData}
        />
      )}
      {/* {currentStep === 2 && (
        <VCPSubscriptionPlan
          setCurrentStep={setCurrentStep}
          tokenData={tokenData}
          currentStep={currentStep}
        />
      )} */}
      {currentStep === 2 && (
        <AccountSetup
          setCurrentStep={setCurrentStep}
          tokenData={tokenData}
          setTokenData={setTokenData}
          currentStep={currentStep}
        />
      )}
      {currentStep === 3 && (
        <PasswordSetup
          setCurrentStep={setCurrentStep}
          tokenData={tokenData}
          setTokenData={setTokenData}
          currentStep={currentStep}
        />
      )}
      {/* {currentStep === 5 && <Congratulate tokenData={tokenData} />} */}
      {/* {currentStep === 4 && (
        <SuccessScreen
          successMessage="That's it. Account Created."
          primaryBtnProps={{
            label: 'Yes, Schedule Demo',
            onClick: () => {
              CustomerIoUtils.trackEvent({
                eventName: 'onboarding_completed',
                data: {}
              });
              window.open(CALCOM_LINKS.newtral, '_blank');
            }
          }}
          secondaryBtnProps={{
            onClick: () => {
              CustomerIoUtils.trackEvent({
                eventName: 'onboarding_completed',
                data: {}
              });
              router.push(config.FRONTEND_URL.CARBON_NEWTRAL as string);
              localStorage.clear();
            },
            label: "No, I'll do it myself"
          }}
        />
      )} */}
    </>
  );
}

export default VCPOnboarding;
