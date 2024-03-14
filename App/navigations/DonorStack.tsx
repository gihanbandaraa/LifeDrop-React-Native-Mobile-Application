import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { NavigationContainer } from '@react-navigation/native';
import DonorHomeScreen from '../screens/Home Screen/DonorHomeScreen';
import DonorChat from '../screens/Other Screens/DonorChat';
import DonorUserAccount from '../screens/Other Screens/DonorUserAccount';
import AboutUs from '../screens/Other Screens/AboutUs';

const Tab = createBottomTabNavigator();

export default function DonorStack() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName="DonorHomeScreen"
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
          component={DonorHomeScreen}
          options={{
            tabBarLabel: 'Home',
            tabBarIcon: ({ color }) => (
              <Ionicons name="home" color={color} size={26} />
            ),
          }}
        />
        <Tab.Screen
          name='Chats'
          component={DonorChat}
          options={{
            tabBarLabel: 'Chats',
            tabBarIcon: ({ color }) => (
              <Ionicons name="chatbox-ellipses" color={color} size={26} />
            ),
          }}
        />
        <Tab.Screen
          name='Account'
          component={DonorUserAccount}
          options={{
            tabBarLabel: 'Account',
            tabBarIcon: ({ color }) => (
              <Ionicons name="person" color={color} size={26} />
            ),
          }}
        />
        <Tab.Screen
          name='About Us'
          component={AboutUs}
          options={{
            tabBarLabel: 'About Us',
            tabBarIcon: ({ color }) => (
              <Ionicons name="information-circle" color={color} size={26} />
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
