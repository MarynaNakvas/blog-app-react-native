import React from 'react';
import { Platform } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import { THEME } from '../theme';
import { MainScreen } from '../screens/MainScreen';
import { PostScreen } from '../screens/PostScreen';

const PostNavigator = createStackNavigator({
    Main: MainScreen,
    Post: {
        screen: PostScreen,
    },
}, {
    initialRouteName: 'Main',
    defaultNavigationOptions: {
        headerStyle: {
            backgroundColor: Platform.OS === 'android' ? THEME.MAIN_COLOR : '#fff',
        },
        headerTintColor: Platform.OS === 'android' ? '#fff' : THEME.MAIN_COLOR,
    }
})

export const AppNavigation = createAppContainer(PostNavigator);
