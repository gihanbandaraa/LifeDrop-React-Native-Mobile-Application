import React, { useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  Text,
  View,
  StyleSheet,
  ActivityIndicator,
  ToastAndroid,
} from 'react-native';

import { getAuth, signInWithEmailAndPassword} from 'firebase/auth';
import { getFirestore, collection, doc, getDoc } from 'firebase/firestore'; // Updated imports
import app from '../../../firebaseConfig';
import Colours from '../../colours/Colours';
import Input from '../../components/Input';
import Button from '../../components/Button';
import { useNavigation } from '@react-navigation/native';
import LoadingScreen from './LoadingScreen';

const auth = getAuth(app);
const firestore = getFirestore(app);

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

    signInWithEmailAndPassword(auth, inputs.email, inputs.password)
      .then(async userCredential => {
        const user = userCredential.user;
        try {
          const docRef = doc(firestore, 'users', user.uid);
          const docSnap = await getDoc(docRef);

          if (docSnap.exists()) {
            const userData = docSnap.data();
            if (userData.isFinder) {
              
            
              setLoading(false);
              ToastAndroid.show('Login Successful', ToastAndroid.SHORT);
              navigation.navigate('FinderHomeScreen');
            } else if (userData.isDonor) {
             
              setLoading(false);
              ToastAndroid.show('Login Successful', ToastAndroid.SHORT);
              navigation.navigate('DonorHomeScreen');
            } else {
              setError('Invalid user type');
            }
          } else {
            setError('User data not found');
          }
        } catch (error) {
          console.error('Error getting user document:', error);
          setError('An error occurred');
        }
      })
      .catch(error => {
        console.error('Firebase authentication error:', error);
        setError('Incorrect email or password');
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleOnChange = (text, input) => {
    setInputs(prevState => ({ ...prevState, [input]: text }));
    setError(null);
  };
  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <SafeAreaView style={{ backgroundColor: Colours.white, flex: 1 }}>
      <ScrollView contentContainerStyle={{ paddingTop: 50, paddingHorizontal: 20 }}>
        <Text style={{ color: Colours.black, fontSize: 40, fontFamily: 'Outfit', color: Colours.PRIMARY }}>
          Login
        </Text>
        <View style={{ marginVertical: 20 }}>
          <Input
            onChangeText={text => handleOnChange(text, 'email')}
            iconName="email-outline"
            label="Email"
            placeholder="Enter your email address"
          />
          <Input
            onChangeText={text => handleOnChange(text, 'password')}
            iconName="lock-outline"
            label="Password"
            placeholder="Enter your password"
            password
          />
          <Button title="Login" onPress={handleLogin} />
          {loading && (
            <ActivityIndicator
              style={{ marginTop: 20 }}
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