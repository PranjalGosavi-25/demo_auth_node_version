import { Button } from 'antd';
import { useMemo, useState } from 'react';
import { useRouter } from 'next/router';
import { useQuery } from 'react-query';
import { SubscriptionService } from '@services/SubscriptionService';
import { PLAN_DETAILS, PlanEnum, PlanFrequencyEnum } from '@constants/plan';
import LoginSignUpLayoutV2 from '@components/Common/LoginSignupLayoutV2';
import PlanTabs from '../PlanTabs';
import LoginSignupLayoutHeader from '@components/Common/LoginSignupLayoutHeader';
import VCPPlanDetail from './VCPPlanDetail';
import { CustomerIoUtils } from '@utils/cutomerio';
import { CALCOM_LINKS } from '@constants/common';

export const VCPSubscriptionPlan = (props: {
  setCurrentStep: React.Dispatch<React.SetStateAction<number>>;
  currentStep: number;
  tokenData: any;
}) => {
  const { setCurrentStep, currentStep, tokenData } = props;
  const router = useRouter();
  const token = router.query.token as string;
  const [selectedPlan, setSelectedPlan] = useState(PlanEnum.Basic);
  const [isAnnual, setIsAnnual] = useState(false);

  const { data, isLoading, error } = useQuery(
    [SubscriptionService.GET_FREE_TRIAL_PLANS, { token }],
    () => SubscriptionService.getFreeTrialPlans({ token }),
    {
      enabled: !!token
    }
  );

  function handleNext() {
    CustomerIoUtils.trackEvent({
      eventName: 'onboarding',
      data: {
        step: 'Start Free'
      }
    });
    setCurrentStep(currentStep + 1);
    router.push({
      pathname: '/company-onboarding',
      query: { step: currentStep + 1, token: token }
    });
    localStorage.setItem(currentStep.toString(), 'true');
  }

  const planDetail = useMemo(() => {
    const trialPlan = data?.find((plan) => {
      if (isAnnual) {
        return (
          plan.frequency == PlanFrequencyEnum.Yearly &&
          plan.plan == selectedPlan
        );
      } else {
        return (
          plan.frequency == PlanFrequencyEnum.Monthly &&
          plan.plan == selectedPlan
        );
      }
    });

    return {
      ...PLAN_DETAILS[selectedPlan],
      ...trialPlan,
      primaryCta:
        selectedPlan == PlanEnum.Basic
          ? 'Start Free'
          : PLAN_DETAILS[selectedPlan].primaryCta,
      price:
        selectedPlan == PlanEnum.Basic
          ? PLAN_DETAILS[selectedPlan].pricePlan[
              isAnnual ? PlanFrequencyEnum.Yearly : PlanFrequencyEnum.Monthly
            ]
          : PLAN_DETAILS[selectedPlan].price
    };
  }, [selectedPlan, data, isAnnual]);

  function handleePrimaryCTA() {
    switch (selectedPlan) {
      case PlanEnum.Basic:
        handleNext();
        break;
      case PlanEnum.Business:
        window.open(CALCOM_LINKS.newtral, '_blank');
        break;
      case PlanEnum.Enterprise:
        window.open(CALCOM_LINKS.newtral, '_blank');
        break;
      default:
        break;
    }
  }

  return (
    <LoginSignUpLayoutV2 rootClassName="relative">
      <div className="flex flex-col gap-4 w-full h-full py-8">
        <div className="w-full bg-gray-50 px-8">
          <LoginSignupLayoutHeader name={tokenData?.user?.name} />

          <PlanTabs
            selectedPlan={selectedPlan}
            setSelectedPlan={setSelectedPlan}
          />
        </div>

        <VCPPlanDetail
          planDetail={planDetail}
          isAnnual={isAnnual}
          setIsAnnual={setIsAnnual}
          referralCompanyName={tokenData?.company?.referralCompany?.name}
        />
      </div>
      <div className="flex gap-3 absolute bottom-0 left-0 bg-white w-full py-4 px-8">
        <Button
          className="btn-primary font-semibold"
          onClick={handleePrimaryCTA}
        >
          {planDetail.primaryCta}
        </Button>
        <Button
          className="link-gray font-semibold"
          onClick={() => window.open(CALCOM_LINKS.newtral, '_blank')}
        >
          Contact Support
        </Button>
      </div>
    </LoginSignUpLayoutV2>
  );
};
