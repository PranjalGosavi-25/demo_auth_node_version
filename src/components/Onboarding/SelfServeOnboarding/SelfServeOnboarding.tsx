import { useEffect, useState } from 'react';
import { PageNotFound } from '@components/Common/PageNotFound';
import { useRouter } from 'next/router';
import { CompanyAccountTypeEnum, StateEnum } from '@enums/common';
import { CompanyService } from '@services/CompanyService';
import { useQuery } from 'react-query';
import { Loader, State } from '@components/Common';
import { CommonUtils } from '@utils/common';
import { IntercomHelper } from '@utils/intercom';
import { CustomerIoUtils } from '@utils/cutomerio';
import { SelfServeAccountSetup } from './SelfServeAccountSetup';
import { SelfServeSubscriptionPlan } from './SelfServeSubscriptionPlan';
import SuccessScreen from '@components/Common/SuccessScreen';
import { message } from 'antd';
import config from 'config';
import { CALCOM_LINKS } from '@constants/common';

export const SelfServeOnboarding = () => {
  const [tokenData, setTokenData] = useState<any>(null);
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 3;
  const router = useRouter();
  const token = router.query.token as string;

  const { data, error, isLoading } = useQuery(
    [CompanyService.GET_SELF_SERVE_COMPANY_BY_TOKEN, { token }],
    () => CompanyService.getSelfServeCompanyByToken(token as string),
    {
      enabled: !!token,
      onSuccess: (data) => {
        setTokenData(data);
        if (data) {
          CustomerIoUtils.identifyUser({
            user: {
              name: data?.name,
              emailId: data?.emailId
            }
          });
        }
      }
    }
  );

  useEffect(() => {
    if (localStorage.getItem('token')) {
      router.push({
        pathname: '/onboarding',
        query: { step: 3, token }
      });
      setCurrentStep(3);
    } else if (tokenData?.razorpaySubscriptionId && currentStep != 3) {
      localStorage.setItem('1', 'true');
      setCurrentStep(2);
      router.push({
        pathname: '/onboarding',
        query: { step: 2, token }
      });
    }
  }, [tokenData]);

  useEffect(() => {
    const step = router.query.step;
    setCurrentStep(step ? parseInt(step as string) : 1);
  }, [router.query]);

  if (isLoading) {
    return <Loader fullScreen />;
  }

  if (error && !localStorage.getItem('xss-token')) {
    return (
      <State
        state={StateEnum.Warning}
        title={'Onboarding Status'}
        description={
          'The link you are trying to access is invalid or has expired. Please contact your account manager for assistance.'
        }
      />
    );
  }

  if (error) {
    return (
      <State
        state={StateEnum.Warning}
        title={'Onboarding Status'}
        description={
          'The link you are trying to access is invalid or has expired. Please contact your account manager for assistance.'
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
        <SelfServeSubscriptionPlan
          setCurrentStep={setCurrentStep}
          currentStep={currentStep}
          tokenData={tokenData}
        />
      )}

      {currentStep === 2 && (
        <SelfServeAccountSetup
          setCurrentStep={setCurrentStep}
          tokenData={tokenData}
          setTokenData={setTokenData}
          currentStep={currentStep}
        />
      )}

      {currentStep === 3 && (
        <SuccessScreen
          successMessage="That’s it. Account Created."
          primaryBtnProps={{
            label: 'Yes, Schedule Demo',
            onClick: () => {
              window.open(CALCOM_LINKS.newtral, '_blank');
            }
          }}
          secondaryBtnProps={{
            onClick: () => {
              router.push(config.FRONTEND_URL.CARBON_NEWTRAL as string);
              localStorage.clear();
            },
            label: "No, I'll do it myself"
          }}
        />
      )}
    </>
  );
};
