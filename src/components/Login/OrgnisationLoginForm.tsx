import { FormField } from '@components/Common';
import { useLogin } from '@hooks/auth';
import { Button, Checkbox, Input } from 'antd';
import { useRouter } from 'next/router';
import React from 'react';
import { LoginTabsEnum } from './OrganizationLogin';

function OrgnisationLoginForm(props: { setActiveTab: (tab: string) => void }) {
  const { setActiveTab } = props;
  const { form, handleLogin } = useLogin();
  const router = useRouter();
  const { organizationId } = router.query;

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        !form.isSubmitting &&
          handleLogin({
            orgId: organizationId as string
          });
      }}
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
      <div className="flex sm:flex-row flex-col gap-2 justify-between sm:items-center py-6">
        <Checkbox
          name="rememberMe"
          className="text-gray-700 font-medium text-sm"
          checked={form.values.rememberMe}
          onChange={form.handleChange}
        >
          Remember for 30 days
        </Checkbox>

        <p
          className="font-semibold text-sm text-primary-700 cursor-pointer"
          onClick={() => setActiveTab(LoginTabsEnum.FORGET_PASSWORD)}
        >
          Forgot password?
        </p>
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
      </div>
    </form>
  );
}

export default OrgnisationLoginForm;
