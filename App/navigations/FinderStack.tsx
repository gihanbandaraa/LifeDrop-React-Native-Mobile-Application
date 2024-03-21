import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { NavigationContainer } from '@react-navigation/native';
import FinderHomeScreen from '../screens/Home Screen/FinderHomeScreen';
import FindDonor from '../screens/Other Screens/FindersScreens/FindDonor';
import NewsFeed from '../screens/Other Screens/FindersScreens/NewsFeed';
import UserAccount from '../screens/Other Screens/FindersScreens/UserAccount';
import Chats from '../screens/Other Screens/FindersScreens/Chats';
import { createStackNavigator } from '@react-navigation/stack';
import MessageRoom from '../screens/Other Screens/MessageRoom';
const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

export default function FinderStack() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Finder" component={FinderTabNavigator} />
        <Stack.Screen name="NewsFeed" component={NewsFeed} />
        <Stack.Screen
          name="MessageRoom"
          component={MessageRoom}

        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

function FinderTabNavigator() {
  return (
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
        name='FinderHomeScreen'
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
            <Ionicons name="chatbubbles" color={color} size={26} />
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
  );
}
