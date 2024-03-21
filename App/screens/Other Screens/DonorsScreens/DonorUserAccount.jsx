import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import UserAccount from '../FindersScreens/UserAccount';
import DetailsComponent from '../../../components/DetailsComponent';
import {getAuth, onAuthStateChanged, signOut} from 'firebase/auth';
import {getFirestore, collection, doc, getDoc} from 'firebase/firestore';
import app from '../../../../firebaseConfig';

const auth = getAuth(app);
const firestore = getFirestore(app);

export default function DonorUserAccount() {
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

  if (loading) {
    return (
      <View style={[styles.loadingContainer, styles.horizontal]}>
        <ActivityIndicator size="large" color="red" />
      </View>
    );
  }
  return (
    <>
      <ScrollView>
        <UserAccount />
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
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
