import { FormField, State } from '@components/Common';
import { PageNotFound } from '@components/Common/PageNotFound';
import { Loader } from '@components/Common';
import { StateEnum } from '@enums/common';
import { useValueChainPartnerConnection } from '@hooks/valueChainPartner/useValueChainPartnerConnection';
import { Button, Divider, Select, Typography } from 'antd';
import {
  ArrowRightOutlineIcon,
  Building07OutlineIcon,
  ClockOutlineIcon
} from '@components/Icons';
import VCPOnboardingLayout from '@components/Onboarding/VCPOnboarding/VCPOnboardingLayout';
import dayjs from 'dayjs';

export const VcpConnection = () => {
  const {
    data,
    error,
    isLoading,
    noToken,
    receiverCompanyId,
    setReceiverCompanyId,
    acceptConnectionLoading,
    acceptedConnection,
    handleAcceptConnection
  } = useValueChainPartnerConnection();

  if (isLoading) {
    return <Loader />;
  }

  if (error || noToken) {
    return (
      <State
        state={StateEnum.Error}
        title="Value Chain Partner Connection"
        description="The value chain partner connection you are attempting to see is either completed or expired."
      />
    );
  }

  if (acceptedConnection) {
    return (
      <State
        state={StateEnum.Success}
        title="Value Chain Partner Connection"
        description="You have successfully added a connection request to your network."
      />
    );
  }

  return (
    <VCPOnboardingLayout
      nextButtonProps={{
        onClick: handleAcceptConnection,
        label: 'Confirm',
        disabled: !receiverCompanyId
      }}
      loading={acceptConnectionLoading}
      title="Link Value Chain Partner"
      description={`Invitation from ${data?.senderCompany?.name} to link with Value Chain Partner ${data?.valueChainPartner?.name}.`}
    >
      <div>
        <div className="flex flex-col sm:flex-row gap-5 sm:gap-16">
          <div>
            <Building07OutlineIcon className="text-gray-500" />
            <p className="text-gray-700 font-semibold mt-2 mb-1">
              {data?.senderCompany?.name}
            </p>
            <p className="text-gray-500 text-xs">Sender Company</p>
          </div>
          <div>
            <ClockOutlineIcon className="text-gray-500" />
            <p className="text-gray-700 font-semibold mt-2 mb-1">
              {dayjs(data?.createdAt).format('DD MMM YYYY hh:mm')}
            </p>
            <p className="text-gray-500 text-xs">Requested At</p>
          </div>
        </div>
        <Divider className="mb-5 mt-8" />
        <div>
          <FormField
            title="Select Newtral Account for Linking"
            description="All your existing Newtral accounts will appear here."
          >
            <Select
              placeholder="Existing Accounts"
              value={receiverCompanyId}
              onChange={(value) => setReceiverCompanyId(value)}
              style={{ width: '100%' }}
            >
              {data?.userCompanies?.map((company: any, index: number) => (
                <Select.Option key={index} value={company?._id}>
                  {company?.name}
                </Select.Option>
              ))}
            </Select>
          </FormField>
        </div>
      </div>
    </VCPOnboardingLayout>
  );
};
