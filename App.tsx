import React from 'react';
import { StatusBar, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Ionicons from 'react-native-vector-icons/Ionicons';

import FrontPage from './App/screens/Frontpage/Frontpage';
import DonorRegisterScreen from './App/screens/Register & Login/DonorRegisterScreen';
import FinderRegisterScreen from './App/screens/Register & Login/FinderRegisterScreen';
import Login from './App/screens/Register & Login/Login';
import DonorHomeScreen from './App/screens/Home Screen/DonorHomeScreen';
import FinderHomeScreen from './App/screens/Home Screen/FinderHomeScreen';
import FindDonor from './App/screens/Other Screens/FindDonor';
import Chats from "./App/screens/Other Screens/Chats";
import UserAccount from "./App/screens/Other Screens/UserAccount";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function TabNavigator() {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          position: 'absolute',
          bottom: 25,
          left: 20,
          right: 20,
          elevation: 2,
          backgroundColor: '#ffffff',
          borderRadius: 15,
          height: 90,
        },
        tabBarActiveTintColor: 'red',
      }}

    >
      <Tab.Screen
        name='Home'
        component={FinderHomeScreen}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color }) => (
            <Ionicons name="home" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name='Search'
        component={FindDonor}
        options={{
          tabBarLabel: 'Search',
          tabBarIcon: ({ color }) => (
            <Ionicons name="search" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name='Chats'
        component={Chats}
        options={{
          tabBarLabel: 'Chats',
          tabBarIcon: ({ color }) => (
            <Ionicons name="chatbox-ellipses" color={color} size={26} />
          ),
        }}
      />


      <Tab.Screen
        name='Account'
        component={UserAccount}
        options={{
          tabBarLabel: 'Account',
          tabBarIcon: ({ color }) => (
            <Ionicons name="person" color={color} size={26} />
          ),
        }}
      />
    </Tab.Navigator>
  )
}

export default function App() {

  return (
    <>
      <StatusBar backgroundColor={"red"} />
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="FrontPage" component={FrontPage} />
          <Stack.Screen name="DonorRegisterScreen" component={DonorRegisterScreen} />
          <Stack.Screen name="FinderRegisterScreen" component={FinderRegisterScreen} />
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="DonorHomeScreen" component={DonorHomeScreen} />
          <Stack.Screen name="FinderHomeScreen" component={TabNavigator} />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}

const styles = StyleSheet.create({});
