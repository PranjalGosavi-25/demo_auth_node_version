import { Button, message } from 'antd';
import { useMemo, useState } from 'react';
import { useRouter } from 'next/router';
import _ from 'lodash';
import { useQuery } from 'react-query';
import { SubscriptionService } from '@services/SubscriptionService';
import { RazorPayUtils } from '@utils/razorPayUtils';
import { PLAN_DETAILS, PlanEnum, PlanFrequencyEnum } from '@constants/plan';
import PlanDetail from './PlanDetail';
import LoginSignUpLayoutV2 from '@components/Common/LoginSignupLayoutV2';
import PlanTabs from '../PlanTabs';
import LoginSignupLayoutHeader from '@components/Common/LoginSignupLayoutHeader';
import { CustomerIoUtils } from '@utils/cutomerio';
import { CALCOM_LINKS } from '@constants/common';

export const SelfServeSubscriptionPlan = (props: {
  setCurrentStep: React.Dispatch<React.SetStateAction<number>>;
  currentStep: number;
  tokenData: any;
}) => {
  const { setCurrentStep, currentStep, tokenData } = props;
  const router = useRouter();
  const token = router.query.token as string;
  const [selectedPlan, setSelectedPlan] = useState(PlanEnum.Basic);
  const [isAnnual, setIsAnnual] = useState(false);
  const [loading, setLoading] = useState(false);

  const { data, isLoading, error } = useQuery(
    [SubscriptionService.GET_FREE_TRIAL_PLANS, { token }],
    () => SubscriptionService.getFreeTrialPlans({ token }),
    {
      enabled: !!token
    }
  );

  async function handleVerifyPayment(payload: {
    razorpay_payment_id: string;
    razorpay_subscription_id: string;
    razorpay_signature: string;
  }) {
    const { data, error } = await SubscriptionService.verifySubscription({
      razorpayPaymentId: payload.razorpay_payment_id,
      razorpaySignature: payload.razorpay_signature,
      razorpaySubscriptionId: payload.razorpay_subscription_id,
      token
    });

    if (error) {
      message.error(error?.message || 'Something went wrong');
    } else {
      setCurrentStep(currentStep + 1);
      router.push({
        pathname: '/onboarding',
        query: { step: currentStep + 1, token }
      });
      localStorage.setItem(currentStep.toString(), 'true');
    }
    setLoading(false);
  }

  async function handlePayment() {
    setLoading(true);
    const { data, error } = await SubscriptionService.startFreeTrial({
      planId: planDetail.planId as string,
      token
    });

    if (data) {
      await RazorPayUtils.displayRazorpay({
        subscriptionId: data.id,
        handleVerifyPayment,
        setLoading
      });
    } else {
      setLoading(false);
      message.error(error?.message || 'Something went wrong');
    }
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
      ...trialPlan
    };
  }, [selectedPlan, data, isAnnual]);

  function handleePrimaryCTA() {
    switch (selectedPlan) {
      case PlanEnum.Basic:
        handlePayment();
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
          <LoginSignupLayoutHeader
            name={tokenData?.oauthData?.given_name}
            imageUrl={tokenData?.oauthData?.picture}
          />

          <PlanTabs
            selectedPlan={selectedPlan}
            setSelectedPlan={setSelectedPlan}
          />
        </div>

        <PlanDetail
          planDetail={planDetail}
          isAnnual={isAnnual}
          setIsAnnual={setIsAnnual}
        />
      </div>
      <div className="flex gap-3 absolute bottom-0 left-0 bg-white w-full py-4 px-8">
        <Button
          className="btn-primary font-semibold"
          onClick={handleePrimaryCTA}
          loading={loading}
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
