import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

import { CreateScreen } from '../screens/CreateScreen';
import { AppHeaderIcon } from '../components/AppHeaderIcon';
import { navigatorOptions } from '../utils/navigation-utils';

const CreateStack = createNativeStackNavigator();

const CreateNavigator = () => (
  <CreateStack.Navigator screenOptions={navigatorOptions}>
    <CreateStack.Screen
      name="Create"
      component={CreateScreen}
      options={({ navigation }) => ({
        headerTitle: 'Create Post',
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
  </CreateStack.Navigator>
);

export default CreateNavigator;
