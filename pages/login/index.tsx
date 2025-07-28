import onlyGuest from '@components/Hoc/onlyGuest';
import Login from '@components/Login/Login';
import React from 'react';

function LoginPage() {
  return <Login />;
}

export default onlyGuest(LoginPage);
