import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {getAuth, signOut} from 'firebase/auth';
import app from '../../../firebaseConfig';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import DonorOption from '../../components/DonorOption';
import GeolocationUpdater from '../../components/GeolocationUpdater';
import {getFirestore} from 'firebase/firestore';
import UploadProfilePic from '../../components/UploadProfilePic';

const auth = getAuth(app);
const firestore = getFirestore(app);
export default function DonorHomeScreen() {
  const user = auth.currentUser;

  return (
      <SafeAreaView style={{backgroundColor: '#F8F8F8',height:"100%"}}>
      <ScrollView style={styles.container}>
        <View style={styles.headingContainer}>
          <Image
            source={require('../../images/Logo.png')}
            style={styles.logo}
          />
          <TouchableOpacity>
            <Icon name="bell" color="red" size={40} />
          </TouchableOpacity>
        </View>
        <GeolocationUpdater firestore={firestore} user={user} />
        <DonorOption />
      </ScrollView>
    </SafeAreaView>
   
  );
}

const styles = StyleSheet.create({
  container: {
    margin: 20,
  },
  logo: {
    height: 50,
    width: 240,
  },
  headingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 15,
  },
});
