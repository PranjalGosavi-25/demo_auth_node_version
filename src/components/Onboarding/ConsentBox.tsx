import { Checkbox } from 'antd';
import Link from 'next/link';
import React from 'react';

function ConsentBox(props: {
  isAgree: boolean;
  setIsAgree: (value: boolean) => void;
  companyName: string;
}) {
  const { isAgree, setIsAgree, companyName } = props;
  return (
    <div className="bg-white rounded-lg shadow-xs flex flex-col gap-2.5 px-6 py-4">
      <p className="text-gray-700 font-semibold">Data Sharing Permission</p>
      <div className="flex items-start gap-2">
        <Checkbox
          value={isAgree}
          onChange={(e) => setIsAgree(e.target.checked)}
          checked={isAgree}
          className="flex items-start"
          rootClassName="flex item-start"
        />
        <p className="font-medium text-gray-500">
          I agree to share this data with{' '}
          <span className="text-gray-700">{companyName}</span> and provide my
          consent to{' '}
          <Link
            href={'https://newtral.io/legal/privacy-policy'}
            target="_blank"
            className="text-gray-700 no-underline"
          >
            privacy and data sharing policy
          </Link>{' '}
          of Newtral. Data will only be used for intended purposes.
        </p>
      </div>
    </div>
  );
}

export default ConsentBox;
