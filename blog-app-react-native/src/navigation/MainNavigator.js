import React from 'react';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';
import { signOut } from 'firebase/auth';

import { auth } from '../../firebaseConfig';
import { THEME } from '../theme';
import TabsNavigator from './TabsNavigator';
import AboutNavigator from './AboutNavigator';
import CreateNavigator from './CreateNavigator';

const handleLogOut = () => {
  signOut(auth)
    .then(() => {})
    .catch((error) => console.log(error));
};

function CustomDrawerContent(props) {
  return (
    <DrawerContentScrollView {...props}>
      <DrawerItemList {...props} />
      <DrawerItem label="Log Out" onPress={() => handleLogOut()} />
    </DrawerContentScrollView>
  );
}

const Main = createDrawerNavigator();

const MainNavigator = () => (
  <Main.Navigator
    screenOptions={{
      headerShown: false,
      drawerActiveTintColor: THEME.MAIN_COLOR,
      drawerLabelStyle: {
        fontFamily: 'open-bold',
      },
    }}
    drawerContent={(props) => <CustomDrawerContent {...props} />}
  >
    <Main.Screen
      name="PostTabs"
      component={TabsNavigator}
      options={{ drawerLabel: 'Main' }}
    />
    <Main.Screen
      name="AboutApp"
      component={AboutNavigator}
      options={{ drawerLabel: 'About App' }}
    />
    <Main.Screen
      name="CreatePost"
      component={CreateNavigator}
      options={{ drawerLabel: 'New Post' }}
    />
  </Main.Navigator>
);

export default MainNavigator;
