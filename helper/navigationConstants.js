const navigationConstants = new Map();

navigationConstants.set('SIGNUP_EMAIL_VALIDATE', 'ValidateEmail');
navigationConstants.set(
  'SIGNUP_ALTERNATEEMAIL_VALIDATE',
  'AlternateValidateEmail'
);
navigationConstants.set('SIGNUP_MOBILE_VALIDATE', 'ValidateMobile');
navigationConstants.set('SIGNUP_MOBILE', 'SaveMobile');
navigationConstants.set('SIGNUP_ALTERNATEEMAIL', 'SaveAlternateEmail');
navigationConstants.set('SIGNUP_COMPLETE', 'SignupComplete');
navigationConstants.set('SIGNIN', 'SignIn');
navigationConstants.set('SIGNIN_VERIFY_AUTHY', 'SignInVerifyAuthy');
navigationConstants.set(
  'SIGNIN_VERIFY_ALTERNATEEMAIL',
  'SignInVerifyAlternateEmail'
);
navigationConstants.set('SIGNIN_VERIFY_MOBILE', 'SignInVerifyMobile');
navigationConstants.set('SIGNIN_VERIFY_SELECT', 'SignInVerifySelect');
navigationConstants.set('SIGNIN_VERIFY_HELP', 'SignInVerifyHelp');
navigationConstants.set('HOME', 'Home');
navigationConstants.set('WALLET_CONNECT', 'WalletConnect');
// navigationConstants.set('PASSWORD_RESET_START', '/password-reset/start');
// navigationConstants.set('PASSWORD_RESET_COMPLETE', '/password-reset/complete');
// navigationConstants.set('PASSWORD_RESET_VALIDATE', '/password-reset/validate');
// navigationConstants.set('PASSWORD_RESET_CHANGE', '/password-reset/change');

export { navigationConstants };
