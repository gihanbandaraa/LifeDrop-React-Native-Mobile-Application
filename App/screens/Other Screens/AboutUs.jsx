import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Linking,
} from 'react-native';

export default function AboutUs() {
  const handleEmailPress = () => {
    Linking.openURL('mailto:Lifedropadmin@gmail.com');
  };
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.backContainer}>
        <Text style={styles.heading}>About LifeDrop</Text>
        <Text style={styles.description}>
          Welcome to LifeDrop, your ultimate blood donation companion! Our app
          is dedicated to connecting blood donors with recipients in need,
          making the process of blood donation simpler, faster, and more
          efficient.
        </Text>
      </View>

      <View style={styles.backContainer}>
        <Text style={styles.heading}>Mission Statement</Text>
        <Text style={styles.description}>
          Our mission is to save lives by facilitating blood donation and
          ensuring a steady supply of blood for those in need. With LifeDrop,
          you can be a hero by donating blood and helping those who require
          lifesaving transfusions.
        </Text>
      </View>

      <View style={styles.backContainer}>
        <Text style={styles.heading}>Key Features</Text>
        <Text style={styles.feature}>
          - Discover nearby blood donation opportunities.
        </Text>
        <Text style={styles.feature}>
          - Connect with donors who match your blood type.
        </Text>
        <Text style={styles.feature}>
          - Receive notifications about urgent donation requests and blood
          donation campaigns.
        </Text>
        <Text style={styles.feature}>
          - Schedule appointments for blood donation at your convenience.
        </Text>
        <Text style={styles.feature}>
          - Stay updated on your donation history and impact.
        </Text>
      </View>

      <View style={styles.backContainer}>
        <Text style={styles.heading}>How It Works</Text>
        <Text style={styles.description}>
          Simply register as a donor or recipient to get started. Recipients can
          post blood donation requests, while donors can browse requests and
          schedule appointments to donate blood. Our app ensures secure and
          private communication between donors and recipients, making the
          process seamless and efficient.
        </Text>
      </View>

      <View style={styles.backContainer}>
        <Text style={styles.heading}>Community Impact</Text>
        <Text style={styles.description}>
          By using LifeDrop, you're not just using a mobile application – you're
          making a difference in your community. Every blood donation made
          through our app has the potential to save lives and make a positive
          impact on those in need.
        </Text>
      </View>

      <View style={styles.backContainer}>
        <Text style={styles.heading}>Get Involved</Text>
        <Text style={styles.description}>
          Join our growing community of blood donors and recipients today!
          Download LifeDrop from the App Store or Google Play Store and start
          making a difference. Together, we can ensure that no one faces a
          shortage of blood when they need it most.
        </Text>
      </View>

      <View style={styles.backContainer}>
        <Text style={styles.heading}>Contact Information</Text>

        <Text style={styles.contact}>
          Have questions or feedback? We'd love to hear from you! Reach out to
          our support team at{' '}
          <Text style={styles.emailHighlight} onPress={handleEmailPress}>Lifedropadmin@gmail.com</Text>.
        </Text>
      </View>

      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <Text style={styles.version}>App Version: 2.0.0</Text>
        <Text style={styles.version}>Developed by Team ZUKO</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
  heading: {
    fontSize: 20,
    marginTop: 20,
    marginBottom: 10,
    color: 'black',
    fontFamily: 'Outfit',
    alignSelf: 'center',
  },
  description: {
    fontSize: 16,
    marginBottom: 15,
    color: 'black',
    fontFamily: 'Outfit Regular',
    alignSelf: 'center',
  },
  feature: {
    fontSize: 16,
    marginBottom: 5,
    marginLeft: 10,
    color: 'black',
    fontFamily: 'Outfit Regular',
  },
  contact: {
    fontSize: 16,
    marginBottom: 20,
    color: 'black',
    fontFamily: 'Outfit Regular',
    alignSelf: 'center',
  },
  version: {
    fontSize: 14,
    marginTop: 20,
    color: 'grey',
    fontFamily: 'Outfit',
  },
  backContainer: {
    backgroundColor: '#dcdde1',
    padding: 10,
    borderRadius: 10,
    marginBottom: 20,
  },
  emailHighlight:{
    color: 'blue', // or any other color you prefer for the link
    textDecorationLine: 'underline', // to underline the link
  }
});
