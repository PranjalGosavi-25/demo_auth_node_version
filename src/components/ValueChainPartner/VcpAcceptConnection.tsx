import { Button, Typography } from 'antd';

export const VcpAcceptConnection = (payload: {
  data: any;
  receiverCompanyId: string;
  setReceiverCompanyId: (companyId: string | null) => void;
  acceptConnectionLoading: boolean;
  handleAcceptConnection: () => void;
}) => {
  const {
    data,
    receiverCompanyId,
    setReceiverCompanyId,
    acceptConnectionLoading,
    handleAcceptConnection
  } = payload;

  return (
    <>
      <Typography className="text-gray-700 font-semibold text-3xl">
        Confirm Connection
      </Typography>

      <Typography className="mt-3 text-sm text-gray-500 font-medium">
        You are about to confirm adding a connection request from{' '}
        {data?.senderCompany?.name} to your network{' '}
        {
          data?.userCompanies?.find(
            (company: any) => company._id === receiverCompanyId
          )?.name
        }
        .
      </Typography>

      <section className="flex items-center gap-4 mt-8 justify-end">
        <Button
          onClick={() => setReceiverCompanyId(null)}
          disabled={acceptConnectionLoading}
        >
          Back
        </Button>
        <Button
          className="btn-primary"
          loading={acceptConnectionLoading}
          onClick={handleAcceptConnection}
        >
          Accept
        </Button>
      </section>
    </>
  );
};
