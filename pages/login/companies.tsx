import onlyGuest from '@components/Hoc/onlyGuest';
import Login from '@components/Login/Login';
import SelectCompanyScreen from '@components/Login/SelectCompanyScreen';
import React from 'react';

function Page() {
  return <SelectCompanyScreen />;
}

export default onlyGuest(Page);
