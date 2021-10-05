import { urlConstants } from './navigationConstants';

const SignUpFlag_EMAIL = 1;
const SignUpFlag_MOBILE = 2;
const SignUpFlag_ALTERNATEEMAIL = 4;

const getNextUrlForSignUp = async (authState) => {
  var signupRequirement = authState.signupRequirement;
  var signupState = authState.signupState;

  let nextUrl = '';
  console.log('signupRequirement is: ' + signupRequirement);
  console.log('signupState is: ' + signupState);
  if (signupState == 0) {
    //    await SignUpService.emailVerify({ isResend: true }, bearerToken.tokenValue);
    nextUrl = urlConstants.get('SIGNUP_EMAIL_VALIDATE');
    console.log('signupState == 0 url is: ' + nextUrl);
  } else if (signupState == 1) {
    if ((signupRequirement & SignUpFlag_MOBILE) == SignUpFlag_MOBILE) {
      //await ClientAPI.SignUpMobileVerify(new VerifyRequestM());
      nextUrl = urlConstants.get('SIGNUP_MOBILE');
    } else if (
      (signupRequirement & SignUpFlag_ALTERNATEEMAIL) ==
      SignUpFlag_ALTERNATEEMAIL
    ) {
      //await ClientAPI.SignUpAlternateEmailVerify(new VerifyRequestM());
      nextUrl = urlConstants.get('SIGNUP_ALTERNATEEMAIL');
    }
  } else if (signupState == 3) {
    if (
      (signupRequirement & SignUpFlag_ALTERNATEEMAIL) ==
      SignUpFlag_ALTERNATEEMAIL
    ) {
      //await ClientAPI.SignUpAlternateEmailVerify(new VerifyRequestM());
      nextUrl = urlConstants.get('SIGNUP_ALTERNATEEMAIL');
    }
  }

  return nextUrl;
};

const getNextAuthScreen = async (tokenWrapper) => {
  const { authState, bearerToken } = tokenWrapper;
  let nextUrl = '';
  console.log(
    'getNextAuthScreen:authState.signinScope:' + authState.signinScope
  );

  //Add additional logic from signinbase later
  if (authState.signinScope === 'COMPLETE') {
    nextUrl = urlConstants.get('HOME');
  } else if (authState.signinScope == 'SIGNUPINCOMPLETE') {
    nextUrl = await getNextUrlForSignUp(authState);
  } else if (authState.signinScope == 'CONNECTEMAIL') {
    nextUrl = urlConstants.get('WALLETCONNECT');
  }
  return nextUrl;
};

export { getNextAuthScreen };
