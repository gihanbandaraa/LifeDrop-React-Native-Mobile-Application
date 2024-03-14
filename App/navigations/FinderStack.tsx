import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from 'react-native-vector-icons';
import { NavigationContainer } from '@react-navigation/native';
import FinderHomeScreen from '../screens/Home Screen/FinderHomeScreen';
import FindDonor from '../screens/Other Screens/FindDonor';
import Chats from '../screens/Other Screens/Chats';
import UserAccount from '../screens/Other Screens/UserAccount';

const Tab = createBottomTabNavigator();

export default function FinderStack() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName="FinderHomeScreen"
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
      
    </NavigationContainer>
  );
}