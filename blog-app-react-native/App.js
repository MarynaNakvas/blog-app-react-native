import React, { useState } from 'react';
import { Provider } from 'react-redux';
import AppLoading from 'expo-app-loading';

import { AppNavigation } from './src/navigation/AppNavigation';
import { bootstrap } from './src/bootstrap';
import store from './src/store';

export default function App() {
  const [isReady, setIsReady] = useState(false);

  if (!isReady) {
    <AppLoading
      startAsync={bootstrap()}
      onFinish={() => setIsReady(true)}
      onError={(error) => console.log(error)}
    />
  }

  return (
    <Provider store={store}>
      <AppNavigation />
    </Provider>
  );
}
