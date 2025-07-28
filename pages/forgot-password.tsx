import { ForgotPassword } from '@components/ForgotPassword/ForgotPassword';
import onlyGuest from '@components/Hoc/onlyGuest';

function ForgotPasswordPage() {
  return <ForgotPassword />;
}

export default onlyGuest(ForgotPasswordPage);
