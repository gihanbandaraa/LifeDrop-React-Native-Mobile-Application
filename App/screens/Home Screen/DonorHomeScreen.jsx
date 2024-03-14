import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import {getAuth,signOut  } from 'firebase/auth';
import app from '../../../firebaseConfig';


const auth = getAuth(app);
export default function DonorHomeScreen() {
  const logout = async () => {
    try {
      await signOut(auth);
      // Optionally, you can navigate to the login screen or perform any other actions after logout
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };
  return (
    <View>
      <Text>DonorHomeScreen</Text>
      <Text style={styles.headingText} onPress={logout}>Logout</Text>
    </View>
  )
}

const styles = StyleSheet.create({})