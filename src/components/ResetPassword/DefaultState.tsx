import { ConfirmPasswordRequirements } from '@components/Common/ConfirmPasswordRequirements';
import { PasswordRequirements } from '@components/Common/PasswordRequirements';
import { SpecialKeyIcon } from '@components/UI/SpecialIcons';
import { PASSWORD_REGEX } from '@constants/common';
import { AuthService } from '@services/AuthService';
import { Button, Input, Tooltip } from 'antd';
import { useFormik } from 'formik';
import Image from 'next/image';
import Link from 'next/link';
import * as Yup from 'yup';

const formSchema = Yup.object({
  password: Yup.string()
    .matches(
      PASSWORD_REGEX,
      'Password must contain one capital letter, one lower letter, one number, one special character(@$!%*?&), and be at least 8 characters long'
    )
    .required(),
  confirmPassword: Yup.string()
    .required()
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
});

export default function DefaultState(props: {
  markSuccess: Function;
  markFailed: Function;
  token: string;
}) {
  const { markSuccess, markFailed, token } = props;
  const form = useFormik({
    initialValues: {
      password: '',
      confirmPassword: ''
    },
    validationSchema: formSchema,
    onSubmit: handleSubmit
  });

  async function handleSubmit(values: any) {
    const { error } = await AuthService.resetPassword({
      token,
      password: values.password
    });

    form.setSubmitting(false);

    if (error) {
      markFailed();
    } else {
      markSuccess();
    }
  }

  return (
    <>
      <div className="flex justify-center pt-24">
        <div className="flex flex-col gap-8 max-w-sm">
          <div className="flex flex-col items-center gap-6 text-center">
            <SpecialKeyIcon />
            <div className="flex flex-col gap-3">
              <div className="text-3xl font-semibold">Set new password</div>
              <div className="text-base text-gray-600">
                Your new password must be different to previously used
                passwords.
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-2">
              <div className="text-sm text-gray-700 font-medium">
                New Password
              </div>
              <Tooltip
                title={<PasswordRequirements password={form.values.password} />}
                color={'white'}
                overlayStyle={{
                  minWidth: '300px'
                }}
                trigger={['focus']}
              >
                <Input.Password
                  type="password"
                  placeholder="New password"
                  className="shadow-xs"
                  name="password"
                  value={form.values.password}
                  onChange={form.handleChange}
                />
              </Tooltip>
              <div className="text-sm text-gray-600">
                Create a strong password with at least 8 characters that
                includes a combination of uppercase and lowercase letters,
                numbers, and symbols.
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <div className="text-sm text-gray-700 font-medium">
                Confirm password
              </div>
              <Tooltip
                title={
                  <ConfirmPasswordRequirements
                    password={form.values.password}
                    confirmPassword={form.values.confirmPassword}
                  />
                }
                color={'white'}
                overlayStyle={{
                  minWidth: '300px'
                }}
                trigger={['focus']}
              >
                <Input.Password
                  type="password"
                  placeholder="Confirm password"
                  className="shadow-xs"
                  name="confirmPassword"
                  value={form.values.confirmPassword}
                  onChange={form.handleChange}
                />
              </Tooltip>
            </div>
            <Button
              type="primary"
              className="font-semibold shadow-xs disabled:bg-primary-200 bg-primary-800 disabled:text-white"
              onClick={() => form.handleSubmit()}
              loading={form.isSubmitting}
              disabled={!(form.dirty && form.isValid)}
            >
              Reset password
            </Button>
          </div>
          <div className="flex justify-center">
            <Link
              href="/login"
              className="text-sm text-gray-600 font-semibold flex items-center gap-2 no-underline"
            >
              <span>
                <Image
                  src="/icons/arrow-left.svg"
                  alt="Arrow left"
                  width={12}
                  height={12}
                />
              </span>
              Back to log in
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
