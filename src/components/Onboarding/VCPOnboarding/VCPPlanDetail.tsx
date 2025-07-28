import { PlanEnum } from '@constants/plan';
import { Switch } from 'antd';
import { CheckCircleOutlineIcon } from '@components/Icons';
import React from 'react';

function VCPPlanDetail(props: {
  planDetail: any;
  isAnnual: boolean;
  setIsAnnual: React.Dispatch<React.SetStateAction<boolean>>;
  referralCompanyName: string;
}) {
  const { planDetail, isAnnual, setIsAnnual, referralCompanyName } = props;
  return (
    <div className="flex flex-col gap-4 w-full overflow-auto px-8 pb-20">
      <div>
        <div className="bg-primary-50 rounded-t-2xl text-primary-700 py-1 px-8 text-sm font-medium">
          Special Pricing for {referralCompanyName} Partners
        </div>
        <div className="bg-primary-25 rounded-b-2xl flex flex-col gap-8 pt-8 pb-4 px-8">
          <div>
            <p className="mb-1 text-gray-900 font-medium text-3xl">
              {planDetail?.name}
            </p>
            <p className="text-gray-600">{planDetail?.description}</p>
          </div>
          <div>
            <div className="flex items-center gap-4">
              {(planDetail.name == PlanEnum.Basic && (
                <p className="text-gray-900 font-medium text-5xl">
                  0 <span className="line-through">{planDetail.price}</span>{' '}
                  {planDetail?.currency || ''}
                </p>
              )) || (
                <p className="text-gray-900 font-medium text-5xl">
                  {planDetail.price}
                </p>
              )}

              {planDetail.name == PlanEnum.Basic && (
                <p className="text-gray-600">for 1 team-member</p>
              )}
            </div>
          </div>
          {planDetail.name == PlanEnum.Basic && (
            <div className="flex gap-4 items-center">
              <Switch
                onChange={(checked) => setIsAnnual(checked)}
                checked={isAnnual}
              />
              <p className="text-gray-700 font-medium">Annual (20% off)</p>
            </div>
          )}
        </div>
      </div>

      <div className="py-8 border-y border-0 border-solid border-gray-200 flex flex-col gap-2 px-8">
        {planDetail.limits.map((plan: any, key: number) => (
          <p key={key} className="text-gray-600 font-bold">
            {plan.limit} <span className="font-normal">{plan.resource}</span>
          </p>
        ))}
      </div>

      <div className="text-gray-600 px-8">
        <p>Features you&apos;ll love:</p>

        <div className="mt-6 flex flex-col gap-4">
          {planDetail.features.map((feature: string, key: number) => (
            <div key={key} className="flex gap-3 items-center">
              <CheckCircleOutlineIcon className="w-5 h-5 text-success-600" />
              <p className="flex-1">{feature}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default VCPPlanDetail;
