import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const firestore = getFirestore();
const auth = getAuth();

const generateQRCode = () => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const user = auth.currentUser;
        if (user) {
          const userDoc = await getDoc(doc(firestore, 'users', user.uid));
          if (userDoc.exists()) {
            const userData = userDoc.data();
            // Extract only the required fields from userData
            const { email, fullname, phone, nic, city, district, address, bloodType } = userData;
            setUserData({ email, fullname, phone, nic, city, district, address, bloodType });
          } else {
            console.log('User document does not exist.');
          }
        } else {
          console.log('No user is currently signed in.');
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, []);

  if (!userData) {
    return null; // Optionally, you can render a loading indicator here
  }

  return (
    <View style={styles.container}>
      <QRCode
        value={JSON.stringify(userData)}
        size={200}
        color="black"
        backgroundColor="white"
      />
      <View style={styles.textContainer}>
        <Text style={styles.text}>Name: {userData.fullname}</Text>
        <Text style={styles.text}>Email: {userData.email}</Text>
        <Text style={styles.text}>Phone: {userData.phone}</Text>
        <Text style={styles.text}>NIC: {userData.nic}</Text>
        <Text style={styles.text}>City: {userData.city}</Text>
        <Text style={styles.text}>District: {userData.district}</Text>
        <Text style={styles.text}>Address: {userData.address}</Text>
        <Text style={styles.text}>Blood Type: {userData.bloodType}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 20,
  },
  textContainer: {
    marginTop: 20,
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'black',
  },
  text: {
    fontSize: 16,
    marginVertical: 5,
    fontFamily:"Outfit Regular"
  },
});

export default generateQRCode;
