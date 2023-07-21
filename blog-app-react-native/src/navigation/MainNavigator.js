import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';

import { THEME } from '../theme';
import TabsNavigator from './TabsNavigator';
import AboutNavigator from './AboutNavigator';
import CreateNavigator from './CreateNavigator';

const Main = createDrawerNavigator();

const MainNavigator = () => (
    <Main.Navigator
        screenOptions={{
            headerShown: false,
            drawerActiveTintColor: THEME.MAIN_COLOR,
            drawerLabelStyle: {
                fontFamily: 'open-bold',
            }
        }}
    >
        <Main.Screen
            name='PostTabs'
            component={TabsNavigator}
            options={{ drawerLabel: 'Main' }}
        />
        <Main.Screen
            name='AboutApp'
            component={AboutNavigator}
            options={{ drawerLabel: 'About App' }}
        />
        <Main.Screen
            name='CreatePost'
            component={CreateNavigator}
            options={{ drawerLabel: 'New Post' }}
        />
    </Main.Navigator>
);

export default MainNavigator;
