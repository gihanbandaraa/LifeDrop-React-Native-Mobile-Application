import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import FrontPage from '../screens/Frontpage/Frontpage';
import DonorRegisterScreen from '../screens/Register & Login/DonorRegisterScreen';
import FinderRegisterScreen from '../screens/Register & Login/FinderRegisterScreen';
import Login from '../screens/Register & Login/Login';
import FinderHomeScreen from '../screens/Home Screen/FinderHomeScreen';
import DonorHomeScreen from '../screens/Home Screen/DonorHomeScreen';

const Stack = createStackNavigator();

export default function AuthStack() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="FrontPage" component={FrontPage} />
        <Stack.Screen name="DonorRegisterScreen" component={DonorRegisterScreen} />
        <Stack.Screen name="FinderRegisterScreen" component={FinderRegisterScreen} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="FinderHomeScreen" component={FinderHomeScreen} />
        <Stack.Screen name="DonorHomeScreen" component={DonorHomeScreen} />
        
      </Stack.Navigator>
    </NavigationContainer>
  );
}