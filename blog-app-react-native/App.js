import React, { useEffect, useState } from 'react';
import { Provider } from 'react-redux';
import AppLoading from 'expo-app-loading';
import { NavigationContainer } from '@react-navigation/native';
import { Provider as PaperProvider, DefaultTheme } from 'react-native-paper';

import bootstrap from './src/bootstrap';
import { store } from './src/store-redux/index';
import MainNavigator from './src/navigation/MainNavigator';
import AutNavigator from './src/navigation/AutNavigator';

const navigationTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      secondaryContainer: 'transparent',
    },
  };

const getIsSignedIn = () => {
  // custom logic
  return false;
};

export default function App() {
  const isSignedIn = getIsSignedIn();
  console.log('isSignedIn', isSignedIn);
  const isReady = bootstrap();

  if (!isReady) {
      <AppLoading />
  }

  return (
      <Provider store={store}>
          <PaperProvider theme={navigationTheme}>
              <NavigationContainer>
                {isSignedIn ? <MainNavigator /> : <AutNavigator />}  
              </NavigationContainer>
          </PaperProvider>
      </Provider>
  );
}
