import { useState } from 'react';

export enum ForgotPassowordState {
  default = 'default',
  success = 'success'
}

export function useForgotPassword() {
  const [state, setState] = useState(ForgotPassowordState.default);
  const [email, setEmail] = useState('');

  function markSuccess() {
    setState(ForgotPassowordState.success);
  }

  function updateEmail(email: string) {
    setEmail(email);
  }

  return { state, markSuccess, email, updateEmail };
}
