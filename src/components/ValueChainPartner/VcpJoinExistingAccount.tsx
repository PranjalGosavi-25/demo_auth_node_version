import { Button, Typography } from 'antd';
import { ArrowRightOutlineIcon } from 'newtral-icons';

export const VcpJoinExistingAccount = (props: {
  data: any;
  setReceiverCompanyId: (companyId: string) => void;
}) => {
  const { data, setReceiverCompanyId } = props;
  return (
    <>
      <section className="flex flex-col gap-2">
        <Typography className="text-gray-700 font-semibold text-3xl">
          Join existing account
        </Typography>

        <Typography className="text-sm text-gray-500 font-medium">
          {data?.senderCompany?.name} wants to connect with Value Chain Partner{' '}
          {data?.valueChainPartner?.name}.
        </Typography>
      </section>

      <section className="mt-8 flex flex-col gap-4">
        {data?.userCompanies?.map((company: any, index: number) => (
          <section
            className="p-4 border border-solid border-gray-200 rounded-lg flex justify-between items-center gap-2"
            key={index}
          >
            <Typography className="text-gray-900 font-medium text-xl">
              {company?.name}
            </Typography>

            <Button
              type="text"
              onClick={() => setReceiverCompanyId(company?._id)}
            >
              <ArrowRightOutlineIcon className="text-gray-600" />
            </Button>
          </section>
        ))}
      </section>

      <Typography className="text-sm text-gray-500 mt-4">
        In Newtral, everything happens in an account. Like a virtual company, an
        account is where your team can gather in Newtral to collaborate and get
        work done.
      </Typography>
    </>
  );
};
