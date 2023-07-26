import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

import { PostScreen } from '../screens/PostScreen';
import { BookedScreen } from '../screens/BookedScreen';
import { toggleBooked } from '../store-redux/thunks/post';
import { AppHeaderIcon } from '../components/AppHeaderIcon';
import { navigatorOptions } from './navigation-utils';

const Booked = createNativeStackNavigator();

const BookedNavigator = () => {
    const dispatch = useDispatch();
    const bookedPosts = useSelector((state) => state.post.bookedPosts);

    return (
    <Booked.Navigator screenOptions={navigatorOptions}>
        <Booked.Screen
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
        <Booked.Screen
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
    </Booked.Navigator>
)};

export default BookedNavigator;
