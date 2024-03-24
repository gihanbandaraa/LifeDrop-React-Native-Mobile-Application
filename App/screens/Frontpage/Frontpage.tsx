import React, { useEffect, useState } from 'react';
import { Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Colours from '../../colours/Colours';

interface FrontPageProps {}

const FrontPage: React.FC<FrontPageProps> = () => {
  const navigation = useNavigation(); // Get navigation object
  const [isLoading, setIsLoading] = useState(true);

  const continueAsDonour = () => {
    navigation.navigate('DonorRegisterScreen'); // Navigate to DonourLogin screen
  };

  const continueAsFinder = () => {
    navigation.navigate('FinderRegisterScreen'); // Navigate to FinderLogin screen
  };

  return (
    <SafeAreaView>
      <View style={styles.logocontainer}>
        <Image source={require('../../images/Logo.png')} style={styles.logoImage} />
        <Image source={require('../../images/login-bg.png')} style={styles.loginBackground} />
      </View>

      <View style={{ padding: 20 }}>
        <Text style={styles.heading}>
          Join Our Community, Donate Blood, and Be a Hero in Someone's Story
        </Text>
        <Text style={styles.desc}>
          Where Every Drop Counts. Join our community-driven platform to easily find nearby blood
          donors, request blood when in need, and make a life-saving impact today
        </Text>
        <TouchableOpacity style={styles.button} onPress={continueAsDonour}>
          <Text style={styles.buttonText}>Continue As Donor</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={continueAsFinder}>
          <Text style={styles.buttonText}>Continue As Finder</Text>
        </TouchableOpacity>
        <Text
          onPress={() => navigation.navigate('Login')}
          style={{
            color: Colours.black,
            textAlign: 'center',
            fontFamily: 'Outfit',
            fontSize: 16,
            marginTop: 10,
          }}
        >
          Already have an account? Login
        </Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  logocontainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  logoImage: {
    width: 300,
    height: 60,
    marginHorizontal: 60,
    resizeMode: 'contain',
  },
  loginBackground: {
    width: '100%',
    height: 200,
    marginTop: 20,
    resizeMode: 'contain',
  },
  heading: {
    fontSize: 25,
    fontFamily: 'Outfit',
    marginTop: 20,
    textAlign: 'center',
    color: Colours.BLACK,
  },
  desc: {
    fontFamily: 'Outfit SemiBold',
    fontSize: 17,
    textAlign: 'center',
    marginTop: 20,
    color: Colours.GRAY,
  },
  button: {
    backgroundColor: Colours.PRIMARY,
    padding: 16,
    borderRadius: 99,
    marginTop: 40,
  },
  buttonText: {
    fontFamily: 'Outfit',
    textAlign: 'center',
    fontSize: 20,
    color: Colours.WHITE,
  },
});

export default FrontPage;
