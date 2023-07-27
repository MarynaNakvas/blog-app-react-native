import React, { useEffect, useState } from 'react';
import { Provider } from 'react-redux';
import AppLoading from 'expo-app-loading';
import { NavigationContainer } from '@react-navigation/native';
import { Provider as PaperProvider, DefaultTheme } from 'react-native-paper';
import { onAuthStateChanged } from 'firebase/auth';

import useBootstrap from './src/bootstrap';
import { store } from './src/store-redux/index';
import MainNavigator from './src/navigation/MainNavigator';
import AutNavigator from './src/navigation/AutNavigator';
import { auth } from './firebaseConfig';

const navigationTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      secondaryContainer: 'transparent',
    },
  };

export default function App() {
  const [isSignedIn, setIsSignedIn] = useState(undefined);

  const isReady = useBootstrap();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsSignedIn(true);
      } else {
        setIsSignedIn(false);
      }
    });
  }, []);

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
