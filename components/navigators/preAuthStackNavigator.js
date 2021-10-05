import React from 'react';
import SignUpScreen from '../auth/signup';
import SignInScreen from '../auth/signin';
import EmailValidateScreen from '../auth/emailValidate';
import PasswordResetStartScreen from '../auth/passwordResetStart';
import PasswordResetValidateScreen from '../auth/passwordResetValidate';
import PasswordResetPerformScreen from '../auth/passwordResetPerform';
import PasswordResetCompleteScreen from '../auth/passwordResetComplete';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

const globalScreenOptions = {
  headerStyle: { backgroundColor: '#2C6BED' },
  headerTitleStyle: { color: 'white' },
  headerTintColor: 'white',
};

// todo:styling the header stack
const PreAuthStackNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={globalScreenOptions}
      initialRouteName="SignIn"
    >
      <Stack.Screen
        options={{ title: 'Sign In', headerTitleAlign: 'center' }}
        name="SignIn"
        component={SignInScreen}
      />
      <Stack.Screen
        options={{ title: 'Sign Up', headerTitleAlign: 'center' }}
        name="SignUp"
        component={SignUpScreen}
      />
      <Stack.Screen
        options={{ title: 'Verify Email', headerTitleAlign: 'center' }}
        name="ValidateEmail"
        component={EmailValidateScreen}
      />
      <Stack.Screen
        options={{ title: 'Reset Password', headerTitleAlign: 'center' }}
        name="PasswordResetStart"
        component={PasswordResetStartScreen}
      />
      <Stack.Screen
        options={{ title: 'Verify Reset', headerTitleAlign: 'center' }}
        name="PasswordResetValidate"
        component={PasswordResetValidateScreen}
      />
      <Stack.Screen
        options={{ title: 'Create Password', headerTitleAlign: 'center' }}
        name="PasswordResetPerform"
        component={PasswordResetPerformScreen}
      />
      <Stack.Screen
        options={{ title: 'Complete', headerTitleAlign: 'center' }}
        name="PasswordResetComplete"
        component={PasswordResetCompleteScreen}
      />
    </Stack.Navigator>
  );
};

export default PreAuthStackNavigator;
