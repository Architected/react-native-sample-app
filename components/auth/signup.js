import * as React from 'react';
import { KeyboardAvoidingView, Text, View } from 'react-native';
import { Input, Button } from 'react-native-elements';
import { useForm, Controller } from 'react-hook-form';
import { StatusBar } from 'expo-status-bar';
import { Store } from '../../state/storeProvider';
import { iamClient } from '../../service/defaultServices.js';
import { formStyles } from '../styles';
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
  const { authState, errorMessage, callInProgress } = state['auth'];

  const onSubmit = async (data) => {
    try {
      const { email, password } = data;
      const clientDetails = await getClientDetails();

      const requestData = { email, password };
      const responseData = await iamClient.signUp(
        requestData,
        clientDetails,
        dispatch
      );

      console.log('screen:response:' + JSON.stringify(response));

      if (response && !response.inError) {
        navigation.navigate('ValidateEmail', { isResend: false });
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
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
      </View>
      <Button
        containerStyle={formStyles.button}
        onPress={handleSubmit(onSubmit)}
        title="Sign Up"
        loading={callInProgress}
      />
      {errorMessage && <Text style={formStyles.errorText}>{errorMessage}</Text>}
    </KeyboardAvoidingView>
  );
};

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//     padding: 10,
//   },
//   logo: {
//     width: 200,
//     height: 200,
//     marginBottom: 20,
//   },
//   inputContainer: {
//     width: 300,
//     alignItems: 'center',
//   },
//   button: {
//     width: 200,
//     marginTop: 10,
//   },
//   buttonText: {
//     fontSize: 20,
//     color: '#fff',
//   },
//   errorText: {
//     color: 'red',
//     margin: 20,
//     marginLeft: 0,
//   },
// });
