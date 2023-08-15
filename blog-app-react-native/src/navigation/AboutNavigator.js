import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

import { AboutScreen } from '../screens/AboutScreen';
import { AppHeaderIcon } from '../components/AppHeaderIcon';
import { navigatorOptions } from '../utils/navigation-utils';

const AboutStack = createNativeStackNavigator();

const AboutNavigator = () => (
  <AboutStack.Navigator screenOptions={navigatorOptions}>
    <AboutStack.Screen
      name="About"
      component={AboutScreen}
      options={({ navigation }) => ({
        headerTitle: 'About App',
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
  </AboutStack.Navigator>
);

export default AboutNavigator;
