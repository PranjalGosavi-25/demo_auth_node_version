import { CommonUtils } from '@utils/common';
import { Typography } from 'antd';
import { CheckCircleOutlineIcon, XOutlineIcon } from 'newtral-icons';
import { useMemo } from 'react';

export const PasswordRequirements = (props: { password: string }) => {
  const { password } = props;

  const { passwordRequirements } = useMemo(() => {
    return CommonUtils.getPasswordRequirements({ password });
  }, [password]);

  return (
    <>
      <section className="flex flex-col gap-1 p-2">
        {passwordRequirements.map((requirement, index) => {
          return (
            <section className="flex gap-1 items-start" key={index}>
              {requirement.isValid ? (
                <CheckCircleOutlineIcon className={`text-success-600  w-4`} />
              ) : (
                <XOutlineIcon className="text-error-600 w-4" />
              )}
              <Typography
                className={`text-xs ${
                  requirement.isValid ? 'text-success-600' : 'text-gray-600'
                }`}
              >
                {requirement.label}
              </Typography>
            </section>
          );
        })}
      </section>
    </>
  );
};
