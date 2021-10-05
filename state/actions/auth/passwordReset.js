import { getError } from '../../../helper/getError';
import * as authActionType from '../../constants/auth';
import frontChannelService from '../../../service/frontChannelService';
import CryptoHelper from '../../../service/cryptoHelper';
import startAuthorize from '../../../helper/authorizeHelper';

export const startAction = async (email, clientDetails, dispatch) => {
  try {
    dispatch({ type: authActionType.PASSWORD_RESET_START });

    const cryptoHelper = new CryptoHelper();
    const codeVerifier = await cryptoHelper.generateCodeVerifier();
    console.log('signInAction:codeVerifier: ' + codeVerifier);

    const authorizeResponse = await startAuthorize(codeVerifier, clientDetails);

    if (!authorizeResponse || authorizeResponse.data.inError) {
      dispatch({
        type: authActionType.PASSWORD_RESET_FAIL,
        payload: 'An unexpected error has occurred',
      });
      return authorizeResponse.data;
    }

    var frontChannel = frontChannelService();
    const { data } = await frontChannel
      .passwordReset()
      .start(email, ipAddress, userAgent);

    console.log('response' + JSON.stringify(data));

    if (data.inError) {
      dispatch({
        type: authActionType.PASSWORD_RESET_FAIL,
        payload: getError(data),
      });
    } else {
      console.log('password reset success');
      dispatch({
        type: authActionType.PASSWORD_RESET_SUCCESS,
        payload: data.tokenWrapper,
      });
      return data;
    }
  } catch (err) {
    console.log(err.toString());
    dispatch({
      type: authActionType.PASSWORD_RESET_FAIL,
      payload: err.toString(),
    });
  }
};

export const validateAction = async (code, dispatch, tokenValue) => {
  try {
    dispatch({ type: authActionType.PASSWORD_RESET_VALIDATE_START });

    var frontChannel = frontChannelService();
    const { data } = await frontChannel
      .passwordReset()
      .validate(code, tokenValue);

    if (data.inError) {
      dispatch({
        type: authActionType.PASSWORD_RESET_VALIDATE_FAIL,
        payload: getError(data),
      });
    } else {
      console.log('password validate success');
      dispatch({
        type: authActionType.PASSWORD_RESET_VALIDATE_SUCCESS,
        payload: data.tokenWrapper,
      });
    }

    return data;
  } catch (err) {
    console.log(err.toString());
    dispatch({
      type: authActionType.PASSWORD_RESET_VALIDATE_FAIL,
      payload: err.toString(),
    });
  }
};

export const performAction = async (
  newPassword,
  confirmPassword,
  dispatch,
  additionalData,
  tokenValue
) => {
  try {
    dispatch({ type: authActionType.PASSWORD_RESET_PERFORM_START });

    // call login
    console.log('calling password reset perform');

    var frontChannel = frontChannelService();
    const responseData = await frontChannel
      .passwordReset()
      .perform(newPassword, confirmPassword, additionalData, tokenValue);

    const { data } = responseData;

    if (data.inError) {
      dispatch({
        type: authActionType.PASSWORD_RESET_PERFORM_FAIL,
        payload: getError(data),
      });
    } else {
      console.log('password reset success');
      dispatch({
        type: authActionType.PASSWORD_RESET_PERFORM_SUCCESS,
        payload: null,
      });
    }
    return data;
  } catch (err) {
    console.log(err.toString());
    dispatch({
      type: authActionType.PASSWORD_RESET_PERFORM_FAIL,
      payload: 'Unable to perform password reset',
    });
  }
};
