import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import FrontPage from './App/screens/Frontpage/Frontpage'
import DonorRegisterScreen from './App/screens/Register & Login/DonorRegisterScreen';
import FinderRegisterScreen from './App/screens/Register & Login/FinderRegisterScreen';
import Login from './App/screens/Register & Login/Login';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';


const Stack = createStackNavigator();

export default function App() {
 
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="FrontPage" component={FrontPage} />
        <Stack.Screen name="DonorRegisterScreen" component={DonorRegisterScreen} />
        <Stack.Screen name="FinderRegisterScreen" component={FinderRegisterScreen} />
        <Stack.Screen name="Login" component={Login} />

      </Stack.Navigator>
    </NavigationContainer>
  )
}

const styles = StyleSheet.create({})