import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

import { MainScreen } from '../screens/MainScreen';
import { PostScreen } from '../screens/PostScreen';
import { toggleBooked } from '../store-redux/thunks/post';
import { AppHeaderIcon } from '../components/AppHeaderIcon';
import { navigatorOptions } from './navigation-utils';

const Post = createNativeStackNavigator();

const PostNavigator = () => {
  const dispatch = useDispatch();
  const bookedPosts = useSelector((state) => state.post.bookedPosts);

  return (
    <Post.Navigator screenOptions={navigatorOptions}>
      <Post.Screen
        name="Main"
        component={MainScreen}
        options={({ navigation }) => ({
          headerTitle: 'My blog',
          headerRight: () => (
            <HeaderButtons HeaderButtonComponent={AppHeaderIcon}>
              <Item
                title="Take photo"
                iconName="ios-camera"
                onPress={() => navigation.navigate('CreatePost')}
              />
            </HeaderButtons>
          ),
          headerLeft: () => (
            <HeaderButtons HeaderButtonComponent={AppHeaderIcon}>
              <Item
                title="Toggle drawer"
                iconName="ios-menu"
                onPress={() => navigation.toggleDrawer()}
              />
            </HeaderButtons>
          ),
        })}
      />
      <Post.Screen
        name="Post"
        component={PostScreen}
        options={({ route }) => {
          const { id, date } = route.params;
          const booked = bookedPosts.some((post) => post.id === id);
          const iconName = booked ? 'ios-star' : 'ios-star-outline';
          return {
            headerTitle: `Post from ${new Date(
              date,
            ).toLocaleDateString()}`,
            headerRight: () => (
              <HeaderButtons HeaderButtonComponent={AppHeaderIcon}>
                <Item
                  title="Booked"
                  iconName={iconName}
                  onPress={() => dispatch(toggleBooked(route.params))}
                />
              </HeaderButtons>
            ),
          };
        }}
      />
    </Post.Navigator>
  );
};

export default PostNavigator;
