import React, { useEffect } from 'react';
import { StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import FrontPage from './App/screens/Frontpage/Frontpage';
import DonorRegisterScreen from './App/screens/Register & Login/DonorRegisterScreen';
import FinderRegisterScreen from './App/screens/Register & Login/FinderRegisterScreen';
import Login from './App/screens/Register & Login/Login';
import DonorHomeScreen from './App/screens/Home Screen/DonorHomeScreen';
import FinderHomeScreen from './App/screens/Home Screen/FinderHomeScreen';

const Stack = createStackNavigator();

export default function App() {
  

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="FrontPage" component={FrontPage} />
        <Stack.Screen name="DonorRegisterScreen" component={DonorRegisterScreen} />
        <Stack.Screen name="FinderRegisterScreen" component={FinderRegisterScreen} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="DonorHomeScreen" component={DonorHomeScreen} />
        <Stack.Screen name="FinderHomeScreen" component={FinderHomeScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({});
