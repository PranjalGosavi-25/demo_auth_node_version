import React, { useState } from 'react';
import { useRouter } from 'next/router';
import LoginSignUpLayout from '@components/Common/LoginSignUpLayout';
import { useLogin } from '@hooks/auth';
import { AuthService } from '@services/AuthService';
import { Button, Checkbox, Input, message } from 'antd';
import Link from 'next/link';
import { FormField } from '@components/Common';
import LoginSignUpLayoutV2 from '@components/Common/LoginSignupLayoutV2';

function Login() {
  const router = useRouter();
  const { form, handleLogin } = useLogin();

  return (
    <LoginSignUpLayoutV2 showScheduleMeeting>
      <div className="flex items-center justify-center h-full">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            !form.isSubmitting && handleLogin();
          }}
          className="w-4/5 lg:w-3/5 h-fit"
        >
          <div className=" flex flex-col gap-5">
            <FormField title="Email">
              <Input
                placeholder="Enter your email"
                name="email"
                value={form.values.email}
                onChange={form.handleChange}
              />
            </FormField>
            <FormField title="Password">
              <Input.Password
                placeholder="Enter password"
                name="password"
                value={form.values.password}
                onChange={form.handleChange}
              />
            </FormField>
          </div>
          <div className="flex lg:flex-row flex-col gap-2 justify-between lg:items-center py-6">
            <Checkbox
              name="rememberMe"
              className="text-gray-700 font-medium text-sm"
              checked={form.values.rememberMe}
              onChange={form.handleChange}
            >
              Remember for 30 days
            </Checkbox>

            <Link
              href={'/forgot-password'}
              className="font-semibold text-sm text-primary-700 no-underline"
            >
              Forgot password?
            </Link>
          </div>

          <div className="flex flex-col gap-4">
            <Button
              className="disabled:bg-primary-200 bg-primary-600  text-white w-full mt-6 font-medium"
              loading={form.isSubmitting}
              disabled={!(form.dirty && form.isValid)}
              htmlType="submit"
            >
              Sign In
            </Button>
            <Button
              className="btn-secondary-gray font-semibold flex items-center justify-center gap-3 w-full"
              onClick={() => router.push(AuthService.GOOGLE_OAUTH_LOGIN)}
            >
              <div>
                <img src="/images/google-icon.svg" alt="" width={24} />
              </div>
              Sign In with Google
            </Button>
          </div>
          {/* <div className="text-sm text-center mt-4">
            <p className="text-gray-600">
              Don&apos;t have an account?{' '}
              <Link href="/signup" className="text-primary-700 font-semibold">
                Sign Up
              </Link>
            </p>
          </div> */}
        </form>
      </div>
    </LoginSignUpLayoutV2>
  );
}

export default Login;
