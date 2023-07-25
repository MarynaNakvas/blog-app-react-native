import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { LoadingScreen } from '../screens/LoadingScreen';
import { LoginScreen } from '../screens/LoginScreen';
import { SignUpScreen } from '../screens/SignUpScreen';

import { navigatorOptions } from './navigation-utils';

const AutStack = createNativeStackNavigator(); 

const AutNavigator = () => (
    <AutStack.Navigator screenOptions={navigatorOptions}>
        <AutStack.Screen
            name='Login'
            component={LoadingScreen}
        />
        <AutStack.Screen
            name='LogIn'
            component={LoginScreen}
        />
        <AutStack.Screen
            name='SignUp'
            component={SignUpScreen}
        />
    </AutStack.Navigator>
);

export default AutNavigator;
