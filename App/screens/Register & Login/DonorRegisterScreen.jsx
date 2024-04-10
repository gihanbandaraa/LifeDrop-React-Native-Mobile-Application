import React, {useState} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  Keyboard,
  ScrollView,
  Alert,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
  useColorScheme
} from 'react-native';

//import Firebase
import {getAuth} from 'firebase/auth';
import {getFirestore, collection, doc, setDoc} from 'firebase/firestore';
import app from '../../../firebaseConfig';
import Geolocation from 'react-native-geolocation-service';
import {CheckBox} from 'react-native-elements';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import PrivacyPermissionModal from '../../modals/PrivacyPermissionModal';
import TermsConditionsModal from '../../modals/TermsPermissonModal';

const firebaseApp = app;

// Initialize auth and firestore
const auth = getAuth(firebaseApp);
const firestore = getFirestore(firebaseApp);

//import the components
import Colours from '../../colours/Colours';
import Input from '../../components/Input';
import Button from '../../components/Button';
import RadioButtonGroup from '../../components/RadioButtonGroup';

import {Picker} from '@react-native-picker/picker';
import {createUserWithEmailAndPassword} from 'firebase/auth';

const DonorRegisterScreen = ({navigation}) => {
  const bloodTypeOptions = ['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'];
  const genderOptions = ['Male', 'Female', 'Other'];
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
  const [selectedBloodType, setSelectedBloodType] = useState('');
  const [selectedGender, setSelectedGender] = useState('');
  const [selectedDistrict, setSelectedDistrict] = useState('');

  const [privacyPermission, setPrivacyPermission] = useState(false);
  const [termsAndConditions, setTermsAndConditions] = useState(false);
  const [privacyModalVisible, setPrivacyModalVisible] = useState(false);
  const [termsModalVisible, settermsModalVisible] = useState(false);
  const colorScheme = useColorScheme();

  const handlePrivacyIconPress = () => {
    setPrivacyModalVisible(true);
  };
  const handleTermsIconPress = () => {
    settermsModalVisible(true);
  };

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
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const validate = () => {
    Keyboard.dismiss();
    let isValid = true;

    if (!inputs.email || !inputs.email.match(/\S+@\S+\.\S+/)) {
      handleError('Please input a valid email', 'email');
      isValid = false;
    }

    if (!inputs.fullname) {
      handleError('Please input fullname', 'fullname');
      isValid = false;
    }

    if (!selectedBloodType) {
      handleError('Please select blood type', 'bloodType');
      isValid = false;
    }

    if (!selectedGender) {
      handleError('Please select gender', 'gender');
      isValid = false;
    }

    if (!inputs.phone) {
      handleError('Please input phone number', 'phone');
      isValid = false;
    }

    if (!inputs.password || inputs.password.length < 5) {
      handleError('Min password length of 5', 'password');
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

    if (!selectedDistrict) {
      handleError('Please select district', 'district');
      isValid = false;
    }

    if (!inputs.address) {
      handleError('Please input address', 'address');
      isValid = false;
    }

    if (isValid) {
      register();
    }
  };

  const register = async () => {
    setLoading(true);
    try {
      const userCredentials = await createUserWithEmailAndPassword(
        auth,
        inputs.email,
        inputs.password,
      );
      const user = userCredentials.user;
      console.log(user.email);
  
      // Get current location
      Geolocation.getCurrentPosition(
        async position => {
          console.log(position);
          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;
  
          try {
            await setDoc(doc(firestore, 'users', user.uid), {
              email: user.email,
              activeAccount: true,
              fullname: inputs.fullname,
              phone: inputs.phone,
              isDonor: true,
              bloodType: selectedBloodType,
              gender: selectedGender,
              nic: inputs.nic,
              city: inputs.city,
              district: selectedDistrict,
              address: inputs.address,
              latitude: latitude,
              longitude: longitude,
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
            setLoading(false); // Moved inside the try block
          } catch (error) {
            console.error('Error adding user data to Firestore: ', error);
            setLoading(false);
          }
        },
        error => {
          console.log(error.code, error.message);
          setLoading(false);
        },
        {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
      );
    } catch (error) {
      console.error('Error registering user: ', error);
      setLoading(false);
      Alert.alert('Error', error.message);
    }
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
            fontSize: 40,
            fontFamily: 'Outfit',
            color: Colours.PRIMARY,
          }}>
          Donor Register
        </Text>
        <Text
          style={{
            color: colorScheme === 'dark' ? Colours.black : Colours.GRAY,
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
                color: Colours.black,
                marginBottom: 5,
                fontFamily: 'Outfit',
              }}>
              District
            </Text>
            <Picker
              selectedValue={selectedDistrict}
              onValueChange={(itemValue, itemIndex) =>
                setSelectedDistrict(itemValue)
              }>
              <Picker.Item label="Select district" value=""   color={colorScheme === 'dark' ? Colours.black : Colours.black}/>
              {sriLankanDistricts.map((district, index) => (
                <Picker.Item key={index} label={district} value={district} color={colorScheme === 'dark' ? Colours.black : Colours.GRAY}/>
              ))}
            </Picker>
            {errors.district && (
              <Text style={{color: 'red'}}>{errors.district}</Text>
            )}
          </View>

          <RadioButtonGroup
            label="Select Blood Type"
            options={bloodTypeOptions}
            selectedOption={selectedBloodType}
            onSelect={setSelectedBloodType}
            error={errors.bloodType}
            
          />
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

          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginVertical: 10,
              justifyContent: 'space-around',
            }}>
            <CheckBox
              checked={privacyPermission}
              onPress={() => setPrivacyPermission(!privacyPermission)}
            />

            <Text style={{marginLeft: 10, fontFamily: 'Outfit',color:'black'}}>
              Allow Privacy Permissions
            </Text>
            <TouchableOpacity
              onPress={handlePrivacyIconPress}
              style={styles.iconContainer}>
              <Icon name="alert-circle-outline" size={28} color="gold" />
            </TouchableOpacity>
          </View>

          {/* Terms & Conditions */}
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginVertical: 10,
              justifyContent: 'space-around',
            }}>
            <CheckBox
              checked={termsAndConditions}
              onPress={() => setTermsAndConditions(!termsAndConditions)}
            />
            <Text style={{marginLeft: 10, fontFamily: 'Outfit',color:'black'}}>
              Agree to Terms & Conditions
            </Text>
            <TouchableOpacity
              onPress={handleTermsIconPress}
              style={styles.iconContainer}>
              <Icon name="alert-circle-outline" size={28} color="gold" />
            </TouchableOpacity>
          </View>
          <View>
            <Text
              style={{
                color: 'red',
                marginBottom: 10,
                fontFamily: 'Outfit Regular',
              }}>
              {(!privacyPermission || !termsAndConditions) &&
                'Please accept both Terms & Conditions and Privacy Permissions before registering.'}
            </Text>
          </View>

          <Button
            title="Register"
            onPress={validate}
            disabled={!privacyPermission || !termsAndConditions}
          />
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
              textAlign: 'center',
              fontFamily: 'Outfit',
              fontSize: 16,
            }}>
            Already have an account? Login
          </Text>
        </View>
        <PrivacyPermissionModal
          visible={privacyModalVisible}
          onClose={() => setPrivacyModalVisible(false)}
        />
        <TermsConditionsModal
          visible={termsModalVisible}
          onClose={() => settermsModalVisible(false)}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  iconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
    justifyContent: 'space-around',
  },
});
export default DonorRegisterScreen;
