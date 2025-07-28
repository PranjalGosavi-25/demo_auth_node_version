import { useFormik } from 'formik';
import * as Yup from 'yup';

import { AuthService } from '@services/AuthService';
import { LoginActionEnum } from '@enums/authEnum';
import { message } from 'antd';
import { useMemo, useState } from 'react';
import { useRouter } from 'next/router';
import config from 'config';

export const validationSchema = Yup.object({
  email: Yup.string().email('Invalid email').required('Required'),
  password: Yup.string().required('Required'),
  organizationId: Yup.string().length(10, 'Invalid Organization Id')
});

export function useLogin() {
  const router = useRouter();
  const { redirect } = router.query;
  const [loginData, setLoginData] = useState(null);

  const form = useFormik({
    initialValues: {
      email: '',
      password: '',
      rememberMe: false,
      organizationId: '',
      otp: undefined
    },
    onSubmit: async (values) => {},
    validationSchema
  });

  const handleLogin = async (payload?: { orgId?: string }) => {
    const { orgId } = payload || {};
    const { email, password, rememberMe } = form.values;
    form.setSubmitting(true);

    const { data, error } = await AuthService.login({
      emailId: email,
      password,
      rememberMe,
      orgId
    });
    form.setSubmitting(false);

    if (error) {
      message.error(error.message);
    } else if (data?.loginCompleted) {
      message.success('Logged in successfully');
      router.push(
        (redirect as string) ?? (config.FRONTEND_URL.CARBON_NEWTRAL as string)
      );
    } else if (data) {
      switch (data.action) {
        case LoginActionEnum.MFA:
          if (orgId) {
            router.push(
              `/organization/${orgId}/otp-verification?token=${data.token}`
            );
          } else {
            router.push(`/login/otp-verification?token=${data.token}`);
          }
          break;
        case LoginActionEnum.SELECT_COMPANY:
          router.push(`/login/companies?token=${data.token}`);
          break;
        default:
          break;
      }
    }
  };

  return { form, handleLogin };
}
