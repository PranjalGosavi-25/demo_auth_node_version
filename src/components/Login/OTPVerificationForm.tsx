import { AuthService } from '@services/AuthService';
import { Button, Input, message } from 'antd';
import config from 'config';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import OTPInput from 'react-otp-input';

export const OTPVerificationForm = ({ token }: { token: string }) => {
  const router = useRouter();
  const [timer, setTimer] = useState(60);
  const [otp, setOtp] = useState('');
  const [verifyLoading, setVerifyLoading] = useState(false);
  const { redirect } = router.query;

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((timer) => {
        if (timer > 0) {
          return timer - 1;
        } else {
          return 0;
        }
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  async function resendOTP() {
    const { data, error } = await AuthService.resendOtp({
      token
    });

    if (data) {
      setTimer(60);
    } else {
      message.error(error?.message || 'Max limit reached');
    }
  }

  async function handleVerify() {
    setVerifyLoading(true);
    const { data, error } = await AuthService.loginWithOtp({
      token,
      otp
    });
    setVerifyLoading(false);

    if (error) {
      message.error(error?.message || 'Something went wrong');
    } else {
      router.push(
        (redirect as string) ?? (config.FRONTEND_URL.CARBON_NEWTRAL as string)
      );
    }
  }

  return (
    //main

    <form
      onSubmit={(e) => {
        e.preventDefault();
        !verifyLoading && handleVerify();
      }}
    >
      <div
        className="flex flex-col gap-4 p-2 overflow-auto remove-number-arrow"
        style={{
          height: '240px'
        }}
      >
        <OTPInput
          value={otp}
          onChange={(otp: any) => {
            setOtp(otp);
          }}
          numInputs={6}
          renderInput={(props) => <input {...props} />}
          inputStyle={
            'border border-solid border-gray-200 rounded-md text-center w-12 h-12 remove-number-arrow'
          }
          containerStyle={'flex justify-center items-center gap-2 w-full'}
          inputType="number"
          shouldAutoFocus
          skipDefaultStyles
        />

        <Button
          className="btn-primary font-semibold text-sm"
          onClick={handleVerify}
          loading={verifyLoading}
          disabled={otp.length != 6}
          htmlType="submit"
        >
          Verify
        </Button>
        <div className="flex justify-between items-center">
          <p className="text-sm text-gray-500">
            {timer > 0 ? `Resend OTP in ${timer} seconds` : ''}
          </p>
          {timer == 0 ? (
            <p className="text-gray-500 font-inter text-sm">
              Didn&apos;t receive OTP?{' '}
              <span
                className="text-primary-700 cursor-pointer font-medium"
                onClick={resendOTP}
              >
                Resend
              </span>
            </p>
          ) : null}
        </div>
      </div>
    </form>
  );
};

export default OTPVerificationForm;
