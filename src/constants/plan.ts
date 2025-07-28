export enum PlanEnum {
  Basic = 'Basic',
  Business = 'Business',
  Enterprise = 'Enterprise'
}

export enum PlanFrequencyEnum {
  Monthly = 'Monthly',
  Yearly = 'Yearly'
}

export const PLAN_DETAILS = {
  [PlanEnum.Basic]: {
    name: 'Basic',
    description: 'For small teams just getting started',
    price: '29',
    currency: 'USD',
    priceInfo: 'per team member/month billed annually',
    features: [
      'Access to all basic features',
      'Basic reporting and analytics',
      'Up to 10 individual users'
    ],
    limits: [
      {
        resource: 'ESG Data Activities',
        limit: 'Unlimited'
      },
      {
        resource: 'Value Chain Partners',
        limit: 'Unlimited'
      }
    ],
    extra: ['*minimum of 5 team members'],
    primaryCta: 'Activate Free Trial',
    pricePlan: {
      [PlanFrequencyEnum.Monthly]: 29,
      [PlanFrequencyEnum.Yearly]: 299
    }
  },
  [PlanEnum.Business]: {
    name: 'Business',
    description: 'For growing teams with advanced needs',
    price: `Let's talk`,
    currency: 'USD',
    priceInfo: '',
    features: [
      'Access to all basic features',
      'Basic reporting and analytics',
      'Up to 10 individual users'
    ],
    limits: [
      {
        resource: 'ESG Data Activities',
        limit: 'Unlimited'
      },
      {
        resource: 'Value Chain Partners',
        limit: 'Unlimited'
      }
    ],
    extra: ['Flexible Payment Plans', 'Unlimited Users'],
    primaryCta: 'Book a Demo'
  },
  [PlanEnum.Enterprise]: {
    name: 'Enterprise',
    description: 'For large teams with advanced needs',
    price: `Let's talk`,
    priceInfo: '',
    currency: 'USD',
    features: [
      'Access to all basic features',
      'Basic reporting and analytics',
      'Up to 10 individual users'
    ],
    limits: [
      {
        resource: 'ESG Data Activities',
        limit: 'Unlimited'
      },
      {
        resource: 'Value Chain Partners',
        limit: 'Unlimited'
      }
    ],
    extra: ['Flexible Payment Plans', 'Unlimited Users'],
    primaryCta: 'Book a Demo'
  }
};
