import React, { useState, useEffect } from 'react';
import { Image, ImageBackground, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { auth, firestore } from '../../../firebaseConfig';

export default function UserAccount() {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      if (user) {
        firestore.collection('users').doc(user.uid).get()
          .then(doc => {
            if (doc.exists) {
              const userData = doc.data();
              setUserData(userData);
            } else {
              console.log('No such document!');
            }
          })
          .catch(error => {
            console.log('Error getting document:', error);
          });
      } else {
        console.log('User is not signed in.');
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <SafeAreaView>
      <ImageBackground
        source={require('../../images/background.png')}
        style={{ height: '100%' }}
      >
        <View>
          <View style={styles.headingContainer}>
            <Text style={styles.headingText}>Settings</Text>
            <Text style={[styles.headingText, { fontSize: 30 }]}>Profile</Text>
            <Text style={styles.headingText}>Logout</Text>
          </View>
        </View>

        <View style={styles.profileIcon}>
          <Image
            source={require('../../images/account.png')}
            style={{ width: 100, height: 100 }}
          />
        </View>
        <View style={{ alignItems: 'center', marginVertical: 10 }}>
          {userData && userData.gender && (
            <Text style={{ fontSize: 26, fontFamily: 'Outfit', color: 'black', alignSelf: 'center' }}>
              {userData.fullname}
            </Text>
          )}
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  headingContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: 20,
    marginVertical: 28,
  },
  headingText: {
    fontFamily: 'Outfit SemiBold',
    fontSize: 18,
    color: '#F8f8f8',
  },
  profileIcon: {
    alignSelf: 'center',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: 180,
    height: 180,
    backgroundColor: '#f8f8f8',
    borderRadius: 180 / 2,
    elevation: 3,
  },
});
