import React, { useEffect } from 'react';
import { StatusBar, StyleSheet } from 'react-native';
import RootNavigation from './App/navigations';
import './firebaseConfig';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getAuth } from 'firebase/auth';
export default function App() {


  // useEffect(() => {
  //   const retrieveAsyncStorageValues = async () => {
  //     try {
  //       const userType = await AsyncStorage.getItem('userType');
  //       const loginStatus = await AsyncStorage.getItem('loginStatus');
  //       const token = await AsyncStorage.getItem('authToken');
  //       console.log('User Type:', userType);
  //       console.log('Login Status:', loginStatus);
  //       console.log('authToken:', token);
  //     } catch (error) {
  //       console.error('Error retrieving AsyncStorage values:', error);
  //     }
  //   };

  //   retrieveAsyncStorageValues();
  // }, []);
  const auth = getAuth();
  auth.onAuthStateChanged(user => {
    console.log(user);
  });
  return (

  <>
    <StatusBar backgroundColor={"red"} />
    <RootNavigation />
  </>
  );
}

const styles = StyleSheet.create({});
