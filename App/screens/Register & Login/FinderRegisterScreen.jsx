import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Alert,
  ActivityIndicator
} from 'react-native';
import React, {useState} from 'react';

//import Firebase
import {auth, firestore} from '../../../firebaseConfig';

//import the components
import Colours from '../../colours/Colours';
import Input from '../../components/Input';
import Button from '../../components/Button';
import RadioButtonGroup from '../../components/RadioButtonGroup';

import {Picker} from '@react-native-picker/picker';

const FinderRegisterScreen = ({navigation}) => {
  const sriLankanDistricts = [
    'Ampara',
    'Anuradhapura',
    'Badulla',
    'Batticaloa',
    'Colombo',
    'Galle',
    'Gampaha',
    'Hambantota',
    'Jaffna',
    'Kalutara',
    'Kandy',
    'Kegalle',
    'Kilinochchi',
    'Kurunegala',
    'Mannar',
    'Matale',
    'Matara',
    'Monaragala',
    'Mullaitivu',
    'Nuwara Eliya',
    'Polonnaruwa',
    'Puttalam',
    'Ratnapura',
    'Trincomalee',
    'Vavuniya',
  ];

  const genderOptions = ['Male', 'Female', 'Other'];

  const [inputs, setInputs] = useState({
    email: '',
    fullname: '',
    phone: '',
    password: '',
    nic: '',
    city: '',
    district: '',
    address: '',
  });
  const [selectedGender, setSelectedGender] = useState('');
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const validate = () => {
    let isValid = true;

    // Reset errors
    setErrors({});

    if (!inputs.email || !inputs.email.match(/\S+@\S+\.\S+/)) {
      handleError('Please input a valid email', 'email');
      isValid = false;
    }

    if (!inputs.fullname) {
      handleError('Please input fullname', 'fullname');
      isValid = false;
    }

    if (!inputs.phone) {
      handleError('Please input phone number', 'phone');
      isValid = false;
    }

    if (!inputs.nic) {
      handleError('Please input NIC number', 'nic');
      isValid = false;
    }

    if (!inputs.city) {
      handleError('Please input city', 'city');
      isValid = false;
    }

    if (!inputs.district) {
      handleError('Please select district', 'district');
      isValid = false;
    }

    if (!selectedGender) {
      handleError('Please select gender', 'gender');
      isValid = false;
    }

    if (!inputs.address) {
      handleError('Please input address', 'address');
      isValid = false;
    }

    if (!inputs.password || inputs.password.length < 5) {
      handleError('Min password length of 5', 'password');
      isValid = false;
    }

    if (isValid) {
      register();
    }
  };

  const register = () => {
    setLoading(true);
    auth
      .createUserWithEmailAndPassword(inputs.email, inputs.password)
      .then(async userCredentials => {
        setLoading(false);
        const user = userCredentials.user;
        console.log(user.email);

        try {
          await firestore.collection('users').doc(user.uid).set({
            email: user.email,
            fullname: inputs.fullname,
            phone: inputs.phone,
            isFinder: true,
            nic: inputs.nic,
            city: inputs.city,
            district: inputs.district,
            address: inputs.address,
            gender: selectedGender,
          });
          console.log('User data added to Firestore successfully!');
          Alert.alert(
            'Registration Successful',
            'Your account has been registered successfully!',
            [
              {
                text: 'OK',
                onPress: () => navigation.navigate('Login'),
              },
            ],
          );
        } catch (error) {
          console.error('Error adding user data to Firestore: ', error);
        }
      })
      .catch(error => {
        setLoading(false);
        Alert.alert('Error', error.message);
      });
  };

  const handleOnchange = (text, input) => {
    setInputs(prevState => ({...prevState, [input]: text}));
    setErrors(prevState => ({...prevState, [input]: null}));
  };

  const handleError = (error, input) => {
    setErrors(prevState => ({...prevState, [input]: error}));
  };
  return (
    <SafeAreaView style={{backgroundColor: Colours.white, flex: 1}}>
      <ScrollView
        contentContainerStyle={{paddingTop: 50, paddingHorizontal: 20}}>
        <Text
          style={{
            color: Colours.black,
            fontSize: 40,
            fontFamily: 'Outfit',
            color: Colours.PRIMARY,
          }}>
          Finder Register
        </Text>
        <Text
          style={{
            color: Colours.GRAY,
            fontSize: 18,
            marginVertical: 10,
            fontFamily: 'Outfit Medium',
          }}>
          Enter Your Details to Register
        </Text>

        <View style={{marginVertical: 20}}>
          <Input
            onChangeText={text => handleOnchange(text, 'fullname')}
            iconName="account-outline"
            label="Full Name"
            placeholder="Enter your full name"
            error={errors.fullname}
          />
          <Input
            keyboardType="numeric"
            onChangeText={text => handleOnchange(text, 'phone')}
            iconName="phone-outline"
            label="Phone Number"
            placeholder="Enter your phone no"
            error={errors.phone}
          />
          <Input
            onChangeText={text => handleOnchange(text, 'nic')}
            iconName="badge-account"
            label="NIC Number"
            placeholder="Enter your NIC number"
            error={errors.nic}
          />
          <Input
            onChangeText={text => handleOnchange(text, 'address')}
            iconName="map-outline"
            label="Address"
            placeholder="Enter your address"
            error={errors.address}
          />
          <Input
            onChangeText={text => handleOnchange(text, 'city')}
            iconName="city"
            label="City"
            placeholder="Enter your city"
            error={errors.city}
          />
          <View style={{marginBottom: 20}}>
            <Text
              style={{
                color: Colours.GRAY,
                marginBottom: 5,
                fontFamily: 'Outfit',
              }}>
              District
            </Text>
            <Picker
              selectedValue={inputs.district}
              style={{height: 50, width: '100%', fontFamily: 'Outfit'}}
              onValueChange={(itemValue, itemIndex) =>
                handleOnchange(itemValue, 'district')
              }>
              <Picker.Item label="Select district" value="" />
              {sriLankanDistricts.map((district, index) => (
                <Picker.Item key={index} label={district} value={district} />
              ))}
            </Picker>
            {errors.district && (
              <Text style={{color: 'red'}}>{errors.district}</Text>
            )}
          </View>

          <RadioButtonGroup
            label="Select Gender"
            options={genderOptions}
            selectedOption={selectedGender}
            onSelect={setSelectedGender}
            error={errors.gender}
          />
          <Input
            onChangeText={text => handleOnchange(text, 'email')}
            iconName="email-outline"
            label="Email"
            placeholder="Enter your email address"
            error={errors.email}
          />
          <Input
            onChangeText={text => handleOnchange(text, 'password')}
            iconName="lock-outline"
            label="Password"
            placeholder="Enter your password"
            error={errors.password}
            password
          />
          <Button title="Register" onPress={validate} />
          {loading && (
            <ActivityIndicator
              style={{marginTop: 20}}
              size="large"
              color={Colours.PRIMARY}
            />
          )}
          <Text
            onPress={() => navigation.navigate('Login')}
            style={{
              color: Colours.black,
              fontWeight: 'bold',
              textAlign: 'center',
              fontFamily: 'Outfit',
              fontSize: 16,
            }}>
            Already have an account? Login
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({});
export default FinderRegisterScreen;
