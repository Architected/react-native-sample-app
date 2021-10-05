const urlConstants = new Map();

urlConstants.set('SIGNUP_EMAIL_VALIDATE', 'ValidateEmail');
urlConstants.set('SIGNUP_ALTERNATEEMAIL_VALIDATE', 'AlternateValidateEmail');
urlConstants.set('SIGNUP_MOBILE_VALIDATE', 'ValidateMobile');
urlConstants.set('SIGNUP_MOBILE', 'SaveMobile');
urlConstants.set('SIGNUP_ALTERNATEEMAIL', 'SaveAlternateEmail');
urlConstants.set('SIGNUP_COMPLETE', 'SignupComplete');
urlConstants.set('SIGNIN', 'SignIn');
urlConstants.set('SIGNIN_VERIFY_AUTHY', 'SignInVerifyAuthy');
urlConstants.set('SIGNIN_VERIFY_ALTERNATEEMAIL', 'SignInVerifyAlternateEmail');
urlConstants.set('SIGNIN_VERIFY_MOBILE', 'SignInVerifyMobile');
urlConstants.set('SIGNIN_VERIFY_SELECT', 'SignInVerifySelect');
urlConstants.set('SIGNIN_VERIFY_HELP', 'SignInVerifyHelp');
urlConstants.set('HOME', 'Home');
urlConstants.set('WALLET_CONNECT', 'WalletConnect');
// urlConstants.set('PASSWORD_RESET_START', '/password-reset/start');
// urlConstants.set('PASSWORD_RESET_COMPLETE', '/password-reset/complete');
// urlConstants.set('PASSWORD_RESET_VALIDATE', '/password-reset/validate');
// urlConstants.set('PASSWORD_RESET_CHANGE', '/password-reset/change');

export { urlConstants };
