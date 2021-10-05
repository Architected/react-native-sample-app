import 'react-native-gesture-handler';
import React from 'react';
import * as SplashScreen from 'expo-splash-screen';
import StartScreen from './components/landing/start';
import { StoreProvider } from './state/storeProvider';

SplashScreen.preventAutoHideAsync();
setTimeout(SplashScreen.hideAsync, 1000);

export default function App() {
  return (
    <StoreProvider>
      <StartScreen />
    </StoreProvider>
  );
}
