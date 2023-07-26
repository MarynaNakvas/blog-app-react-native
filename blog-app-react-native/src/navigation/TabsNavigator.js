import React from 'react';
import { Platform } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

import { THEME } from '../theme';
import PostNavigator from './PostNavigator';
import BookedNavigator from './BookedNavigator';

const Tabs = Platform.OS === 'android' ? createMaterialBottomTabNavigator() : createBottomTabNavigator();

const TabsNavigator = () => (
    <Tabs.Navigator
        activeColor='#fff'
        barStyle={{ backgroundColor: THEME.MAIN_COLOR }}
        shifting={true}
        screenOptions={{
            tabBarLabelPosition: 'below-icon',
            tabBarActiveTintColor: THEME.MAIN_COLOR,
            headerShown: false,
        }}
    >
        <Tabs.Screen
            name='AllPost'
            component={PostNavigator}
            options={{
                tabBarLabel: 'All',
                tabBarIcon: ({ color }) => (
                    <Ionicons name='ios-albums' size={25} color={color} />
                )
            }}
        />
        <Tabs.Screen
            name='BookedPost'
            component={BookedNavigator}
            options={{
                tabBarLabel: 'Favourites',
                tabBarIcon: ({ color }) => (
                <Ionicons name='ios-star' size={25} color={color} />
                )
            }}
        />
    </Tabs.Navigator>
)

export default TabsNavigator;
