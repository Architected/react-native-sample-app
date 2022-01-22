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
import { getClientDetails } from '../../helper/clientHelper';

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
  const { callInProgress, errorMessage } = state['auth'];

  const onSubmit = async (data) => {
    const { email } = data;
    const clientDetails = await getClientDetails();
    Keyboard.dismiss();
    const response = await iamClient.passwordResetStart(
      email,
      clientDetails,
      dispatch
    );

    if (response) {
      console.log('screen:response:' + JSON.stringify(response));
      if (!response.inError && response.tokenWrapper) {
        navigation.navigate('PasswordResetValidate');
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
                placeholder="Email"
                style={formStyles.input}
                onChangeText={(value) => onChange(value)}
                value={value}
              />
            )}
            name="email"
            rules={{
              required: 'Please enter your email',
              pattern: {
                value:
                  /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
                message: 'Invalid email address',
              },
            }}
          />
          {errors.email && (
            <Text style={formStyles.errorText}>{errors.email.message}</Text>
          )}
        </View>
        <View style={formStyles.inputContainer}>
          <Button
            containerStyle={formStyles.button}
            onPress={handleSubmit(onSubmit)}
            title="Reset Password"
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
