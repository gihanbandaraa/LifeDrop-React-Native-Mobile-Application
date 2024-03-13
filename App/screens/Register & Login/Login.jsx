import React, { useState } from 'react';
import { SafeAreaView, ScrollView, Text, View, StyleSheet, ActivityIndicator, ToastAndroid } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { auth, firestore } from '../../../firebaseConfig';
import Colours from '../../colours/Colours';
import Input from '../../components/Input';
import Button from '../../components/Button';
import { useNavigation } from '@react-navigation/native';

const Login = () => {
  const navigation = useNavigation(); // Get navigation object
  const [inputs, setInputs] = useState({
    email: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleLogin = () => {
    setLoading(true);
    auth
      .signInWithEmailAndPassword(inputs.email, inputs.password)
      .then(userCredential => {
        const user = userCredential.user;
        return firestore.collection('users').doc(user.uid).get();
      })
      .then(doc => {
        if (doc.exists) {
          const userData = doc.data();
          if (userData.isFinder) {
            AsyncStorage.setItem('userType', 'finder');
            AsyncStorage.setItem('loginStatus', 'true');
            navigation.navigate('FinderHomeScreen');
          } else if (userData.isDonor) {
            AsyncStorage.setItem('userType', 'donor');
            AsyncStorage.setItem('loginStatus', 'true');
            navigation.navigate('DonorHomeScreen');
          } else {
            setError('Invalid user type');
          }
        } else {
          setError('User data not found');
        }
      })
      .catch(error => {
        setError('An error occurred');
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleOnchange = (text, input) => {
    setInputs(prevState => ({...prevState, [input]: text}));
    setError(null);
  };

  return (
    <SafeAreaView style={{backgroundColor: Colours.white, flex: 1}}>
      <ScrollView contentContainerStyle={{paddingTop: 50, paddingHorizontal: 20}}>
        <Text
          style={{
            color: Colours.black,
            fontSize: 40,
            fontFamily: 'Outfit',
            color: Colours.PRIMARY,
          }}>
          Login
        </Text>
        <View style={{marginVertical: 20}}>
          <Input
            onChangeText={text => handleOnchange(text, 'email')}
            iconName="email-outline"
            label="Email"
            placeholder="Enter your email address"
          />
          <Input
            onChangeText={text => handleOnchange(text, 'password')}
            iconName="lock-outline"
            label="Password"
            placeholder="Enter your password"
            password
          />
          <Button title="Login" onPress={handleLogin} />
          {loading && (
            <ActivityIndicator
              style={{marginTop: 20}}
              size="large"
              color={Colours.PRIMARY}
            />
          )}
          {error && (
            <Text
              style={{
                color: 'red',
                fontWeight: 'bold',
                textAlign: 'center',
                fontFamily: 'Outfit',
                fontSize: 16,
                marginTop: 20,
              }}>
              {error}
            </Text>
          )}
          <Text
            onPress={() => navigation.navigate('FrontPage')}
            style={{
              color: Colours.black,
              fontWeight: 'bold',
              textAlign: 'center',
              fontFamily: 'Outfit',
              fontSize: 16,
              marginTop: 20,
            }}>
            Don't have an account? Register
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({});
export default Login;
