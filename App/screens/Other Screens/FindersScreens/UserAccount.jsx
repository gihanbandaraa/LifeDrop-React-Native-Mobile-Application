import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Image,
  ImageBackground,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';
import { getFirestore, collection, doc, getDoc } from 'firebase/firestore';

import app from '../../../../firebaseConfig';
import DetailsComponent from '../../../components/DetailsComponent';

const auth = getAuth(app);
const firestore = getFirestore(app);

export default function UserAccount() {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, user => {
      if (user) {
        const docRef = doc(firestore, 'users', user.uid);
        getDoc(docRef)
          .then(doc => {
            if (doc.exists()) {
              const userData = doc.data();
              setUserData(userData);
            } else {
              console.log('No such document!');
            }
          })
          .catch(error => {
            console.log('Error getting document:', error);
          })
          .finally(() => {
            setLoading(false); 
          });
      } else {
        console.log('User is not signed in.');
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  const logout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  if (loading) {
    return (
      <View style={[styles.loadingContainer, styles.horizontal]}>
        <ActivityIndicator size="large" color="red" />
      </View>
    );
  }

  return (
    <SafeAreaView>
      <ScrollView>
        <ImageBackground
          source={require('../../../images/background.png')}
          style={{ height: '100%' }}>
          <View>
            <View style={styles.headingContainer}>
              <Text style={styles.headingText}>Settings</Text>
              <Text style={[styles.headingText, { fontSize: 30 }]}>Profile</Text>
              <Text style={styles.headingText} onPress={logout}>
                Logout
              </Text>
            </View>
          </View>

          <View style={styles.profileIcon}>
            <Image
              source={require('../../../images/account.png')}
              style={{ width: 100, height: 100 }}
            />
          </View>
          <View style={{ alignItems: 'center', marginVertical: 10 }}>
            {userData && userData.gender && (
              <Text
                style={{
                  fontSize: 26,
                  fontFamily: 'Outfit',
                  color: 'black',
                  alignSelf: 'center',
                }}>
                {userData.fullname}
              </Text>
            )}
          </View>

          <DetailsComponent label={'Email'} userData={userData.email} />
          <DetailsComponent label={'Phone'} userData={userData.phone} />
          <DetailsComponent label={'Address'} userData={userData.address} />
          <DetailsComponent label={'City'} userData={userData.city} />
          <DetailsComponent label={'District'} userData={userData.district} />
          <DetailsComponent label={'NIC'} userData={userData.nic} />
          <DetailsComponent label={'Gender'} userData={userData.gender} />
          <DetailsComponent label={'Blood Group'} userData={userData.bloodType} />
  
        </ImageBackground>
      </ScrollView>
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
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  horizontal: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
  },
});
