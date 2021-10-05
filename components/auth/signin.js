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
import { signInAction } from '../../state/actions/auth/signInEmail';
import { formStyles } from '../styles';
import { saveToStore } from '../../helper/storeHelper';
import { getNextAuthScreen } from '../../helper/authScopeHelper';
import { getClientDetails } from '../../helper/clientHelper';

export default ({ navigation }) => {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
  });
  const { state, dispatch } = React.useContext(Store);
  const { errorMessage, callInProgress } = state['auth'];

  const onSubmit = async (data) => {
    try {
      const { email, password } = data;
      const clientDetails = await getClientDetails();
      Keyboard.dismiss();
      const response = await signInAction(
        email,
        password,
        clientDetails,
        dispatch
      );

      if (response) {
        console.log('screen:response:' + JSON.stringify(response));
        if (!response.inError && response.tokenWrapper) {
          var nextScreen = await getNextAuthScreen(response.tokenWrapper);
          console.log('onSubmit:nextScreen: ' + nextScreen);

          if (response.tokenWrapper.authState.signinScope == 'COMPLETE') {
            await saveToStore('__tokenWrapper', response.tokenWrapper);
          }

          if (response && !response.inError) {
            if (nextScreen == 'ValidateEmail') {
              navigation.navigate('ValidateEmail', { isResend: 'true' });
            } else {
              //navigation.navigate(nextScreen);
            }
          }
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <TouchableWithoutFeedback
      onPress={Platform.OS != 'web' ? Keyboard.dismiss : null}
      accessible={false}
    >
      <KeyboardAvoidingView behavior="height" style={formStyles.container}>
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
          <Controller
            control={control}
            render={({ field: { onChange, value } }) => (
              <Input
                placeholder="Password"
                secureTextEntry
                style={formStyles.input}
                onChangeText={(value) => onChange(value)}
                value={value}
              />
            )}
            name="password"
            rules={{ required: 'password is required' }}
          />
          {errors.password && (
            <Text style={formStyles.errorText}>{errors.password.message}</Text>
          )}
          <Text
            style={formStyles.linkText}
            onPress={() => navigation.navigate('PasswordResetStart')}
          >
            Forgotten Password
          </Text>
        </View>
        <View style={formStyles.inputContainer}>
          <Button
            containerStyle={formStyles.button}
            onPress={handleSubmit(onSubmit)}
            title="Sign In"
            loading={callInProgress}
          />

          <Text style={formStyles.labelText}>Don't have an account?</Text>
          <Text
            style={formStyles.linkText}
            onPress={() => navigation.navigate('SignUp')}
          >
            Sign Up
          </Text>
          {/* <Button
            containerStyle={formStyles.button}
            onPress={() => navigation.navigate('SignUp')}
            type="outline"
            title="Sign Up"
          /> */}

          {errorMessage && (
            <Text style={formStyles.errorText}>{errorMessage}</Text>
          )}
        </View>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};
