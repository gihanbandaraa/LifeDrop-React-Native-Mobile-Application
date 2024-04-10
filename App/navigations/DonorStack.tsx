import React, { useState } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { NavigationContainer } from '@react-navigation/native';
import DonorHomeScreen from '../screens/Home Screen/DonorHomeScreen';
import DonorUserAccount from '../screens/Other Screens/DonorsScreens/DonorUserAccount';
import AboutUs from '../screens/Other Screens/AboutUs';
import DonorBloodRequest from '../screens/Other Screens/DonorsScreens/DonorBloodRequest';
import DonorNewsFeed from '../screens/Other Screens/DonorsScreens/DonorNewsFeed';
import { createStackNavigator } from '@react-navigation/stack';
import DonorChat from '../screens/Other Screens/DonorsScreens/DonorChat';
import MessageRoom from '../screens/Other Screens/MessageRoom';


const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function Home() {
  return (
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
        name='DonorHomeScreen'
        component={DonorHomeScreen}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color }) => (
            <Ionicons name="home" color={color} size={26} />
          ),
        }}
      />

      <Tab.Screen
        name='DonorBloodRequest'
        component={DonorBloodRequest}
        options={{
          tabBarLabel: 'DonorBloodRequest',
          tabBarIcon: ({ color }) => (
            <Ionicons name="add-circle" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name='DonorChat'
        component={DonorChat}
        options={{
          tabBarLabel: 'DonorChat',
          tabBarIcon: ({ color }) => (
            <Ionicons name="chatbubbles" color={color} size={26} />
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

    </Tab.Navigator>
  );
}
export default function DonorStack() {


  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen
          name="Home"
          component={Home}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="About Us"
          component={AboutUs}

        />
        <Stack.Screen
          name="DonorNewsFeed"
          component={DonorNewsFeed}

        />
        <Stack.Screen
          name="MessageRoom"
          component={MessageRoom}

        />
        <Stack.Screen
          name="DonorHomeScreen"
          component={DonorHomeScreen}

        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
