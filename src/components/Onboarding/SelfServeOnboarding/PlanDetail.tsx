import { PlanEnum } from '@constants/plan';
import { Switch } from 'antd';
import { CheckCircleOutlineIcon } from '@components/Icons';
import React from 'react';

function PlanDetail(props: {
  planDetail: any;
  isAnnual: boolean;
  setIsAnnual: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const { planDetail, isAnnual, setIsAnnual } = props;
  return (
    <div className="flex flex-col gap-4 w-full overflow-auto px-8 pb-20">
      <div className="bg-primary-25 rounded-2xl flex flex-col gap-8 pt-8 pb-4 px-8">
        <div>
          <p className="mb-1 text-gray-900 font-medium text-3xl">
            {planDetail?.name}
          </p>
          <p className="text-gray-600">{planDetail?.description}</p>
        </div>
        <div>
          <div className="flex items-center gap-4">
            <p className="text-gray-900 font-medium text-5xl">
              {planDetail.amount / 100 || planDetail.price}{' '}
              {planDetail.plan == PlanEnum.Basic ? planDetail?.currency : ''}
            </p>
            {planDetail?.priceInfo && (
              <p className="text-gray-600">{planDetail?.priceInfo}</p>
            )}
          </div>

          <div className="mt-4">
            {planDetail.extra?.map((info: any, key: number) => (
              <p key={key} className="text-gray-600">
                {info}
              </p>
            ))}
          </div>
        </div>
        {planDetail.plan == PlanEnum.Basic && (
          <div className="flex gap-4 items-center">
            <Switch
              onChange={(checked) => setIsAnnual(checked)}
              checked={isAnnual}
            />
            <p className="text-gray-700 font-medium">Annual (20% off)</p>
          </div>
        )}
      </div>

      {planDetail.plan == PlanEnum.Basic && (
        <p className="text-gray-600 font-medium px-8">
          *14-day free trial requires payment method verification in the next
          step.
        </p>
      )}

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

export default PlanDetail;
