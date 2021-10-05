import React from 'react';
import { Text } from 'react-native';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';
import AuthenticatedTabNavigator from './authenticatedTabNavigator';
import ProfileStack from '../profile/profileStack';
import { signOutAction } from '../../state/actions/auth/signInEmail';
import { Store } from '../../state/storeProvider';

const Drawer = createDrawerNavigator();

// todo: move styles into object

const CustomDrawerContent = (props) => {
  const { state, dispatch } = React.useContext(Store);

  return (
    <DrawerContentScrollView {...props}>
      <DrawerItemList {...props} />
      <DrawerItem
        label={() => <Text style={{ color: 'white' }}>Logout</Text>}
        style={{ backgroundColor: '#2C6BED' }}
        onPress={() => {
          console.log('Calling signOutAction');
          signOutAction(dispatch);
        }}
      />
    </DrawerContentScrollView>
  );
};

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawerContent {...props} />}
    >
      <Drawer.Screen
        name="Home"
        component={AuthenticatedTabNavigator}
        options={{ headerShown: false }}
      />
      <Drawer.Screen
        name="Profile"
        component={ProfileStack}
        options={{ headerShown: false }}
      />
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;
