import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useEffect } from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Options from '../../components/Options';
import { useAuth } from '../../hooks/useAuth';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function FinderHomeScreen() {
  const { user } = useAuth();
    // console.log("user is",user)

    // const storeUser = async (userData) => {
    //   try {
    //     await AsyncStorage.setItem('user', JSON.stringify(userData));
    //     console.log('User stored successfully.');
    //   } catch (error) {
    //     console.error('Error storing user:', error);
    //   }
    // };
  
    // Call the function to store user when component mounts
    // useEffect(() => {
    //   if (user) {
    //     storeUser(user);
    //   }
    // }, [user]);
  return (
    <SafeAreaView style={{backgroundColor: '#F8F8F8',height:"100%"}}>
      <ScrollView style={styles.container}>
        <View style={styles.headingContainer}>
          <Image
            source={require('../../images/Logo.png')}
            style={styles.logo}
          />
          <TouchableOpacity>
            <Icon name="bell" color="red" size={40} />
          </TouchableOpacity>
        </View>
        <Options />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: 20,
  },
  logo: {
    height: 50,
    width: 240,
  },
  headingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 15,
  },
});
