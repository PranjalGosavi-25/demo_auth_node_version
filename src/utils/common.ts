import { CompanyAccountTypeEnum } from '@enums/common';

export class CommonUtils {
  static onboardingRedirectStepUrl(payload: {
    step: number;
    token: string;
    tokenData: any;
  }) {
    const { step, token, tokenData } = payload;
    switch (tokenData?.company?.accountType) {
      case CompanyAccountTypeEnum.VCP:
        // return `/supply-chain-onboarding/${step}?token=${token}`;
        return '/';

      case CompanyAccountTypeEnum.Organization:
        // return `/organization-onboarding/${step}?token=${token}`;
        return '/';
    }
  }

  static isValidOnboarding(payload: {
    currentStep: number;
    totalSteps: number;
    token: any;
  }) {
    const { currentStep, totalSteps, token } = payload;
    if (currentStep > totalSteps) {
      return false;
    }

    if (currentStep != 1) {
      const hasUserCompletedPreviousStep = localStorage.getItem(
        `${currentStep - 1}`
      )
        ? JSON.parse(localStorage.getItem(`${currentStep - 1}`) as string)
        : false;

      if (!hasUserCompletedPreviousStep) {
        return false;
      }
    }

    if (!token) {
      return false;
    }

    return true;
  }

  static getPasswordRequirements(payload: { password: string }) {
    const { password } = payload;

    const passwordRequirements = [
      {
        label: 'At least 8 characters long',
        isValid: password.length >= 8
      },
      // {
      //   label: 'Contains at least one uppercase letter',
      //   isValid: /[A-Z]/.test(password)
      // },
      {
        label: 'Contains at least one lowercase letter',
        isValid: /[a-z]/.test(password)
      },
      {
        label: 'Contains at least one digit',
        isValid: /\d/.test(password)
      },
      {
        label: 'Contains at least one special character',
        isValid: /[!@#$%^&*()\-_=+{};:,<.>]/.test(password)
      }
    ];

    return { passwordRequirements };
  }

  static getConfirmPasswordRequirements(payload: {
    password: string;
    confirmPassword: string;
  }) {
    const { password, confirmPassword } = payload;

    const passwordRequirements = [
      {
        label: 'Passwords match',
        isValid: password === confirmPassword && password?.length > 0
      }
    ];

    return { passwordRequirements };
  }
}
