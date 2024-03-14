import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import FrontPage from '../screens/Frontpage/Frontpage';
import DonorRegisterScreen from '../screens/Register & Login/DonorRegisterScreen';
import FinderRegisterScreen from '../screens/Register & Login/FinderRegisterScreen';
import Login from '../screens/Register & Login/Login';

const Stack = createStackNavigator();

export default function AuthStack() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          cardStyle: {
            backgroundColor: '#0e1529',
          },
        }}
      >
        <Stack.Screen name="FrontPage" component={FrontPage} />
        <Stack.Screen name="DonorRegisterScreen" component={DonorRegisterScreen} />
        <Stack.Screen name="FinderRegisterScreen" component={FinderRegisterScreen} />
        <Stack.Screen name="Login" component={Login} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
