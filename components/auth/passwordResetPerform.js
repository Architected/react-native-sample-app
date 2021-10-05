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
import { performAction } from '../../state/actions/auth/passwordReset';

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
  const { bearerToken, additionalData, callInProgress, errorMessage } =
    state['auth'];

  const onSubmit = async (data) => {
    const { newPassword, confirmPassword } = data;
    Keyboard.dismiss();
    const response = await performAction(
      newPassword,
      confirmPassword,
      dispatch,
      additionalData,
      bearerToken.tokenValue
    );

    if (response) {
      console.log('screen:response:' + JSON.stringify(response));
      if (!response.inError) {
        navigation.navigate('PasswordResetComplete');
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
        <View style={formStyles.inputContainer}>
          <Controller
            control={control}
            render={({ field: { onChange, value } }) => (
              <Input
                placeholder="New Password"
                style={formStyles.input}
                onChangeText={(value) => onChange(value)}
                value={value}
              />
            )}
            name="newPassword"
            rules={{
              required: 'Please enter your new password',
            }}
          />
          {errors.newPassword && (
            <Text style={formStyles.errorText}>
              {errors.newPassword.message}
            </Text>
          )}
          <Controller
            control={control}
            render={({ field: { onChange, value } }) => (
              <Input
                placeholder="Confirm Password"
                style={formStyles.input}
                onChangeText={(value) => onChange(value)}
                value={value}
              />
            )}
            name="confirmPassword"
            rules={{
              required: 'Please confirm your new password',
            }}
          />
          {errors.confirmPassword && (
            <Text style={formStyles.errorText}>
              {errors.confirmPassword.message}
            </Text>
          )}
        </View>
        <View style={formStyles.inputContainer}>
          <Button
            containerStyle={formStyles.button}
            onPress={handleSubmit(onSubmit)}
            title="Change Password"
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
