import React from 'react';
import { Platform } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Ionicons } from '@expo/vector-icons';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { Provider as PaperProvider, DefaultTheme } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';

import { THEME } from '../theme';
import { MainScreen } from '../screens/MainScreen';
import { PostScreen } from '../screens/PostScreen';
import { BookedScreen } from '../screens/BookedScreen';
import { AboutScreen } from '../screens/AboutScreen';
import { CreateScreen } from '../screens/CreateScreen';
import { AppHeaderIcon } from '../components/AppHeaderIcon';
import { toggleBooked } from '../store-redux/thunks/post';

const navigationTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      secondaryContainer: 'transparent',
    },
  };

const navigatorOptions = {
    headerStyle: {
        backgroundColor: Platform.OS === 'android' ? THEME.MAIN_COLOR : '#fff',
    },
    headerTintColor: Platform.OS === 'android' ? '#fff' : THEME.MAIN_COLOR,
};

const PostStack = createNativeStackNavigator();

const PostNavigator = () => {
    const dispatch = useDispatch();
    const bookedPosts = useSelector((state) => state.post.bookedPosts);
    return (
        <PostStack.Navigator screenOptions={navigatorOptions}>
            <PostStack.Screen
                name='Main'
                component={MainScreen}
                options={({ navigation }) => ({
                    headerTitle: 'My blog',
                    headerRight: () => (
                        <HeaderButtons HeaderButtonComponent={AppHeaderIcon}>
                            <Item
                                title='Take photo'
                                iconName='ios-camera'
                                onPress={() => navigation.navigate('Create')} />
                        </HeaderButtons>
                    ),
                    headerLeft: () => (
                        <HeaderButtons HeaderButtonComponent={AppHeaderIcon}>
                            <Item
                                title='Toggle drawer'
                                iconName='ios-menu'
                                onPress={() => navigation.toggleDrawer()} />
                        </HeaderButtons>
                    ),
                })}
            />
            <PostStack.Screen
                name='Post'
                component={PostScreen}
                options={({ route }) => {
                    const { id, date } = route.params;
                    const booked = bookedPosts.some((post) => post.id === id);
                    const iconName = booked ? 'ios-star' : 'ios-star-outline';
                    return {
                        headerTitle: `Post from ${new Date(date).toLocaleDateString()}`,
                        headerRight: () => (
                            <HeaderButtons HeaderButtonComponent={AppHeaderIcon}>
                                <Item
                                    title='Booked'
                                    iconName={iconName}
                                    onPress={() => dispatch(toggleBooked(route.params))} />
                            </HeaderButtons>
                        ),
                    }
                }}
            />
        </PostStack.Navigator>
    )
};

const BookedStack = createNativeStackNavigator();

const BookedNavigator = () => {
    const dispatch = useDispatch();
    const bookedPosts = useSelector((state) => state.post.bookedPosts);
    return (
        <BookedStack.Navigator screenOptions={navigatorOptions}>
            <BookedStack.Screen
                name='Booked'
                component={BookedScreen}
                options={({ navigation }) => ({
                    headerTitle: 'Favourites',
                    headerLeft: () => (
                        <HeaderButtons HeaderButtonComponent={AppHeaderIcon}>
                            <Item
                                title='Toggle drawer'
                                iconName='ios-menu'
                                onPress={() => navigation.toggleDrawer()} />
                        </HeaderButtons>
                    ),
                })}
            />
            <BookedStack.Screen
                name='Post'
                component={PostScreen}
                options={({ route }) => {
                    const { id, date } = route.params;
                    const booked = bookedPosts.some((post) => post.id === id);
                    const iconName = booked ? 'ios-star' : 'ios-star-outline';
                    return {
                        headerTitle: `Post from ${new Date(date).toLocaleDateString()}`,
                        headerRight: () => (
                            <HeaderButtons HeaderButtonComponent={AppHeaderIcon}>
                                <Item
                                    title='Booked'
                                    iconName={iconName}
                                    onPress={() => dispatch(toggleBooked(route.params))} />
                            </HeaderButtons>
                        ),
                    }
                }}
            />
        </BookedStack.Navigator>
    )
};

const BottomTab = Platform.OS === 'android' ? createMaterialBottomTabNavigator() : createBottomTabNavigator();

const BottomNavigator = () => (
    <BottomTab.Navigator
        activeColor='#fff'
        barStyle={{ backgroundColor: THEME.MAIN_COLOR }}
        shifting={true}
        screenOptions={{
            tabBarLabelPosition: 'below-icon',
            tabBarActiveTintColor: THEME.MAIN_COLOR,
            headerShown: false,
        }}
    >
        <BottomTab.Screen
            name='Post'
            component={PostNavigator}
            options={{
                tabBarLabel: 'All',
                tabBarIcon: ({ color }) => (
                    <Ionicons name='ios-albums' size={25} color={color} />
                )
            }}
        />
        <BottomTab.Screen
            name='Booked'
            component={BookedNavigator}
            options={{
                tabBarLabel: 'Favourites',
                tabBarIcon: ({ color }) => (
                  <Ionicons name='ios-star' size={25} color={color} />
                )
            }}
        />
    </BottomTab.Navigator>
)

const AboutStack = createNativeStackNavigator(); 

const AboutNavigator = () => (
    <AboutStack.Navigator screenOptions={navigatorOptions}>
        <AboutStack.Screen
            name='About'
            component={AboutScreen}
            options={({ navigation }) => ({
                headerTitle: 'About App',
                headerLeft: () => (
                    <HeaderButtons HeaderButtonComponent={AppHeaderIcon}>
                        <Item
                            title='Toggle drawer'
                            iconName='ios-menu'
                            onPress={() => navigation.toggleDrawer()} />
                    </HeaderButtons>
                ),
            })}
        />
    </AboutStack.Navigator>
);

const CreateStack = createNativeStackNavigator(); 

const CreateNavigator = () => (
    <CreateStack.Navigator screenOptions={navigatorOptions}>
        <CreateStack.Screen
            name='Create'
            component={CreateScreen}
            options={({ navigation }) => ({
                headerTitle: 'Create Post',
                headerLeft: () => (
                    <HeaderButtons HeaderButtonComponent={AppHeaderIcon}>
                        <Item
                            title='Toggle drawer'
                            iconName='ios-menu'
                            onPress={() => navigation.toggleDrawer()} />
                    </HeaderButtons>
                ),
            })}
        />
    </CreateStack.Navigator>
);

const MainDrawer = createDrawerNavigator();

const MainNavigator = () => (
    <MainDrawer.Navigator
        screenOptions={{
            headerShown: false,
            drawerActiveTintColor: THEME.MAIN_COLOR,
            drawerLabelStyle: {
                fontFamily: 'open-bold',
            }
        }}
    >
        <MainDrawer.Screen
            name="PostTabs"
            component={BottomNavigator}
            options={{ drawerLabel: 'Main' }}
        />
        <MainDrawer.Screen
            name="About"
            component={AboutNavigator}
            options={{ drawerLabel: 'About App' }}
        />
        <MainDrawer.Screen
            name="Create"
            component={CreateNavigator}
            options={{ drawerLabel: 'New Post' }}
        />
    </MainDrawer.Navigator>
)

export const AppNavigation = () => (
    <PaperProvider theme={navigationTheme}>
        <NavigationContainer>
            <MainNavigator />
        </NavigationContainer>
    </PaperProvider>
);
