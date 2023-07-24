import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

import { navigatorOptions } from './navigation-utils';
import { LoadingScreen } from '../screens/LoadingScreen';
import { LoginScreen } from '../screens/LoginScreen';
import { SignUpScreen } from '../screens/SignUpScreen';

const AutStack = createNativeStackNavigator(); 

const AutNavigator = () => (
    <AutStack.Navigator screenOptions={navigatorOptions}>
        <AutStack.Screen
            name='Loading'
            component={LoadingScreen}
        />
        <AutStack.Screen
            name='Login'
            component={LoginScreen}
        />
        <AutStack.Screen
            name='SignUp'
            component={SignUpScreen}
        />
    </AutStack.Navigator>
);

export default AutNavigator;
