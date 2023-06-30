import React from 'react';
import { Platform } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

import { THEME } from '../theme';
import { MainScreen } from '../screens/MainScreen';
import { PostScreen } from '../screens/PostScreen';
import { BookedScreen } from '../screens/BookedScreen';
import { AppHeaderIcon } from '../components/AppHeaderIcon';

const PostStack = createNativeStackNavigator();

const PostNavigator = () => (
    <PostStack.Navigator 
        initialRouteName='Main'
        screenOptions={{
            headerStyle: {
                backgroundColor: Platform.OS === 'android' ? THEME.MAIN_COLOR : '#fff',
            },
            headerTintColor: Platform.OS === 'android' ? '#fff' : THEME.MAIN_COLOR,
        }}
    >
        <PostStack.Screen
            name='Main'
            component={MainScreen}
            options={{
                headerTitle: 'My blog',
                headerRight: () => (
                    <HeaderButtons HeaderButtonComponent={AppHeaderIcon}>
                        <Item
                            title='Take photo'
                            iconName='ios-camera'
                            onPress={() => console.log('Take photo')} />
                    </HeaderButtons>
                ),
                headerLeft: () => (
                    <HeaderButtons HeaderButtonComponent={AppHeaderIcon}>
                        <Item
                            title='Toggle drawer'
                            iconName='ios-menu'
                            onPress={() => console.log('Toggle drawer')} />
                    </HeaderButtons>
                ),
              }}
        />
        <PostStack.Screen
            name='Post'
            component={PostScreen}
            options={({ route }) => {
                const { date, booked } = route.params;
                const iconName = booked ? 'ios-star' : 'ios-star-outline';
                return {
                    headerTitle: `Post from ${new Date(date).toLocaleDateString()}`,
                    headerRight: () => (
                        <HeaderButtons HeaderButtonComponent={AppHeaderIcon}>
                            <Item
                                title='Take photo'
                                iconName={iconName}
                                onPress={() => console.log('Take photo')} />
                        </HeaderButtons>
                    ),
                }
            }}
        />
    </PostStack.Navigator>
);

const BookedStack = createNativeStackNavigator();

const BookedNavigator = () => (
    <BookedStack.Navigator
        initialRouteName='Booked'
        screenOptions={{
            headerStyle: {
                backgroundColor: Platform.OS === 'android' ? THEME.MAIN_COLOR : '#fff',
            },
            headerTintColor: Platform.OS === 'android' ? '#fff' : THEME.MAIN_COLOR,
        }}
    >
        <BookedStack.Screen name='Booked' component={BookedScreen} />
        <BookedStack.Screen
            name='Post'
            component={PostScreen}
        />
    </BookedStack.Navigator>
);

const BottomTab = createBottomTabNavigator();

const BottomNavigator = () => (
    <BottomTab.Navigator
      screenOptions={{
        activeTintColor: THEME.MAIN_COLOR,
        tabBarLabelPosition: 'below-icon',
        headerShown: false,
      }}
    >
        <BottomTab.Screen
            name='Post'
            component={PostNavigator}
            options={{
                tabBarIcon: info => (
                  <Ionicons name='ios-albums' size={25} color={info.tintColor} />
                )
            }}
        />
        <BottomTab.Screen
            name='Booked'
            component={BookedNavigator}
            options={{
                tabBarIcon: info => (
                  <Ionicons name='ios-star' size={25} color={info.tintColor} />
                )
            }}
        />
    </BottomTab.Navigator>
)

export const AppNavigation = () => (
    <NavigationContainer>
        <BottomNavigator />
    </NavigationContainer>
);
