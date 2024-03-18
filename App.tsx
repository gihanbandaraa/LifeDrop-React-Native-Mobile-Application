import React, { useEffect } from 'react';
import { StatusBar, StyleSheet, PermissionsAndroid, Alert } from 'react-native';
import RootNavigation from './App/navigations';
import './firebaseConfig';
import { getAuth } from 'firebase/auth';

export default function App() {
  useEffect(() => {
    requestLocationPermission();
  }, []);

  const auth = getAuth();
  auth.onAuthStateChanged(user => {
    console.log(user);
  });

  const requestLocationPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Location Permission',
          message: 'This app requires access to your location.',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('Location permission granted');
      } else {
        console.log('Location permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  };

  return (
    <>
      <StatusBar backgroundColor={'red'} />
      <RootNavigation />
    </>
  );
}

const styles = StyleSheet.create({});
