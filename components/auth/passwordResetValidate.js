import * as React from 'react';
import {
  Keyboard,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  Text,
  View,
  Platform,
} from 'react-native';
import { Input, Button } from 'react-native-elements';
import { useForm, Controller } from 'react-hook-form';
import { StatusBar } from 'expo-status-bar';
import { Store } from '../../state/storeProvider';
import { formStyles } from '../styles';
import { iamClient } from '../../service/defaultServices.js';

export default ({ navigation }) => {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: '',
    },
  });
  const { state, dispatch } = React.useContext(Store);
  const { bearerToken, callInProgress, errorMessage } = state['auth'];

  const onSubmit = async (data) => {
    const { code } = data;
    Keyboard.dismiss();
    const response = await iamClient.passwordResetValidate(
      code,
      dispatch,
      bearerToken.tokenValue
    );

    if (response) {
      console.log('screen:response:' + JSON.stringify(response));
      if (!response.inError && response.tokenWrapper) {
        navigation.navigate('PasswordResetPerform');
      }
    }
  };

  return (
    <TouchableWithoutFeedback
      onPress={Platform.OS != 'web' ? Keyboard.dismiss : null}
      accessible={false}
    >
      <KeyboardAvoidingView behavior="padding" style={formStyles.container}>
        <StatusBar style="light" />
        {/* <Image source={logo} style={formStyles.logo} /> */}
        <View style={formStyles.inputContainer}>
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
            }}
          />
          {errors.code && (
            <Text style={formStyles.errorText}>{errors.code.message}</Text>
          )}
        </View>
        <View style={formStyles.inputContainer}>
          <Button
            containerStyle={formStyles.button}
            onPress={handleSubmit(onSubmit)}
            title="Submit"
            loading={callInProgress}
          />
          {errorMessage && (
            <Text style={formStyles.errorText}>{errorMessage}</Text>
          )}
        </View>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};
