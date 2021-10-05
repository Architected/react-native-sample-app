import * as React from 'react';
import { Text, View } from 'react-native';
import { formStyles } from '../styles';

export default ({ navigation }) => {
  const gotoLogin = async () => {
    navigation.navigate('SignIn');
  };
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={formStyles.labelText}>Password changed!</Text>
      <Text style={formStyles.linkText} onPress={gotoLogin}>
        Sign Up
      </Text>
    </View>
  );
};
