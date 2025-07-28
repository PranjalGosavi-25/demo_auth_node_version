import { fetcher } from '@utils/fetcher';
import config from '@config';
import { queryFetcher } from '@utils/queryFetcher';

const { AUTH_SERVICE } = config.BACKEND_URL;

export class SubscriptionService {
  static GET_FREE_TRIAL_PLANS = `${AUTH_SERVICE}/subscription/getFreeTrialPlans`;
  static START_FREE_TRIAL = `${AUTH_SERVICE}/subscription/startFreeTrial`;
  static VERIFY_FREE_TRIAL_SUBSCRIPTION = `${AUTH_SERVICE}/subscription/verifyFreeTrialSubscription`;

  static async getFreeTrialPlans(payload: { token: string }): Promise<
    Array<{
      planId: string;
      plan: string;
      frequency: string;
      amount: number;
      currency: string;
    }>
  > {
    return await queryFetcher({
      url: this.GET_FREE_TRIAL_PLANS,
      method: 'GET',
      params: payload
    });
  }

  static async startFreeTrial(payload: { token: string; planId: string }) {
    return await fetcher({
      url: this.START_FREE_TRIAL,
      method: 'POST',
      data: payload
    });
  }

  static async verifySubscription(payload: {
    token: string;
    razorpaySubscriptionId: string;
    razorpaySignature: string;
    razorpayPaymentId: string;
  }) {
    return await fetcher({
      url: this.VERIFY_FREE_TRIAL_SUBSCRIPTION,
      method: 'POST',
      data: payload
    });
  }
}
