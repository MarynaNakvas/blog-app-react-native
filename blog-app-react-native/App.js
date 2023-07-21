import React, { useEffect, useState } from 'react';
import { Provider } from 'react-redux';
import AppLoading from 'expo-app-loading';
import { NavigationContainer } from '@react-navigation/native';
import { Provider as PaperProvider, DefaultTheme } from 'react-native-paper';

import bootstrap from './src/bootstrap';
import { store } from './src/store-redux/index';
import MainNavigator from './src/navigation/MainNavigator';

const navigationTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      secondaryContainer: 'transparent',
    },
  };

export default function App() {
  const isReady = bootstrap();

  if (!isReady) {
      <AppLoading />
  }

  return (
      <Provider store={store}>
          <PaperProvider theme={navigationTheme}>
              <NavigationContainer>
                  <MainNavigator />
              </NavigationContainer>
          </PaperProvider>
      </Provider>
  );
}
