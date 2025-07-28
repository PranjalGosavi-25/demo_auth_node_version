import onlyGuest from '@components/Hoc/onlyGuest';
import OrganizationLogin from '@components/Login/OrganizationLogin';
import React from 'react';

function Page() {
  return <OrganizationLogin />;
}

export default onlyGuest(Page);
