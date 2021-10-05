import React from 'react';
import { Text, View } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
const Stack = createNativeStackNavigator();

const EmptyScreenView = () => {
  return (
    <>
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Empty Screen</Text>
      </View>
    </>
  );
};

const EmptyScreenStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Empty"
        component={EmptyScreenView}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default EmptyScreenStack;
