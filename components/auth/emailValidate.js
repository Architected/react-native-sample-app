import * as React from 'react';
import {
  KeyboardAvoidingView,
  Text,
  ActivityIndicator,
  View,
} from 'react-native';
import { Input, Button, Image } from 'react-native-elements';
import { useForm, Controller } from 'react-hook-form';
import { StatusBar } from 'expo-status-bar';
import { Store } from '../../state/storeProvider';
import { iamClient } from '../../service/defaultServices.js';
import { formStyles } from '../styles';
import { getNextAuthScreen } from '../../helper/authScopeHelper';

export default ({ route, navigation }) => {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      code: '',
    },
  });
  const [isReady, setIsReady] = React.useState(false);
  const { state, dispatch } = React.useContext(Store);
  const { callInProgress, bearerToken, errorMessage } = state['auth'];
  const { isResend } = route.params;

  React.useEffect(() => {
    const sendVerification = async () => {
      await iamClient.signUpVerifyEmail(bearerToken.tokenValue, dispatch);
    };

    if (isResend) {
      sendVerification();
    }
    setIsReady(true);
    return () => {};
  }, []);

  const onSubmit = async (data) => {
    try {
      const { code } = data;

      const response = await iamClient.signUpValidateEmail(
        code,
        bearerToken.tokenValue,
        dispatch
      );

      let nextScreen = 'SignIn';
      if (response) {
        console.log('screen:response:' + JSON.stringify(response));
        if (!response.inError) {
          if (response.tokenWrapper) {
            nextScreen = await getNextAuthScreen(response.tokenWrapper);
          }

          console.log('nextScreen: ' + nextScreen);
          navigation.navigate(nextScreen);
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <KeyboardAvoidingView behavior="padding" style={formStyles.container}>
      <StatusBar style="light" />
      {/* <Image source={logo} style={formStyles.logo} /> */}
      {isReady ? (
        <>
          <View style={formStyles.inputContainer}>
            <Text>
              Please enter the verification code sent to your inbox below.
            </Text>
            <Controller
              control={control}
              render={({ field: { onChange, value } }) => (
                <Input
                  placeholder="Verification Code"
                  style={formStyles.input}
                  onChangeText={(value) => onChange(value)}
                  value={value}
                />
              )}
              name="code"
              rules={{
                required: 'Please enter your verification code',
                pattern: {
                  message: 'Invalid verification code',
                },
              }}
            />
            {errors.code && (
              <Text style={formStyles.errorText}>{errors.code.message}</Text>
            )}
          </View>
          <Button
            containerStyle={formStyles.button}
            onPress={handleSubmit(onSubmit)}
            title="Verify"
            loading={callInProgress}
          />
        </>
      ) : (
        <>
          <View style={[formStyles.container, formStyles.horizontal]}>
            <ActivityIndicator size="large" color="#0000ff" />
          </View>
        </>
      )}

      {errorMessage && <Text style={formStyles.errorText}>{errorMessage}</Text>}
    </KeyboardAvoidingView>
  );
};
