import { PlanEnum } from '@constants/plan';
import React from 'react';

function PlanTabs(props: {
  selectedPlan: string;
  setSelectedPlan: (plan: PlanEnum) => void;
}) {
  const { selectedPlan, setSelectedPlan } = props;
  return (
    <div className="rounded-md border border-solid border-gray-100 bg-gray-50 p-1 flex justify-evenly gap-2 w-fit sticky top-0">
      {Object.keys(PlanEnum).map((plan: any, key) => (
        <div
          key={key}
          className={`w-full border-none focus:outline-none px-3 py-2 rounded-md text-center cursor-pointer ${
            selectedPlan === plan
              ? 'bg-white text-gray-700 shadow-sm'
              : 'bg-transparent text-gray-500'
          }`}
          onClick={() => setSelectedPlan(plan)}
        >
          <p className=" font-semibold text-sm font-inter text-14 leading-20">
            {plan}
          </p>
        </div>
      ))}
    </div>
  );
}

export default PlanTabs;
