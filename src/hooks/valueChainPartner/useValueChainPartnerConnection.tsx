import { CompanyService } from '@services/CompanyService';
import { message } from 'antd';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { useQuery } from 'react-query';

export const useValueChainPartnerConnection = () => {
  const router = useRouter();
  const [receiverCompanyId, setReceiverCompanyId] = useState<string | null>(
    null
  );
  const [acceptedConnection, setAcceptedConnection] = useState(false);
  const [acceptConnectionLoading, setAcceptConnectionLoading] = useState(false);

  const { data, error, isLoading } = useQuery(
    [
      CompanyService.VERIFY_COMPANY_CONNECTION_TOKEN,
      {
        token: router.query.token as string
      }
    ],
    () =>
      CompanyService.verifyCompanyConnectionToken({
        token: router.query.token as string
      }),
    {
      enabled: Boolean(router.isReady && router.query.token)
    }
  );

  const handleAcceptConnection = async () => {
    setAcceptConnectionLoading(true);
    const { data, error } = await CompanyService.makeCompanyConnectionByToken({
      token: router.query.token as string,
      receiverCompanyId: receiverCompanyId as string
    });

    if (!error) {
      setAcceptedConnection(true);
    } else {
      message.error(error?.message || 'Something went wrong');
    }
    setAcceptConnectionLoading(false);
  };

  return {
    data,
    error,
    isLoading,
    noToken: router.isReady && !router.query?.token,
    receiverCompanyId,
    setReceiverCompanyId,
    handleAcceptConnection,
    acceptConnectionLoading,
    acceptedConnection
  };
};
