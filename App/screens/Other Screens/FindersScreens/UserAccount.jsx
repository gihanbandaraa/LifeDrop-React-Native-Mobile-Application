import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Image,
  ImageBackground,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Modal,
  TextInput,
} from 'react-native';
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';
import { getFirestore, doc, getDoc, updateDoc, onSnapshot } from 'firebase/firestore';
import app from '../../../../firebaseConfig';
import DetailsComponent from '../../../components/DetailsComponent';
import Icon from 'react-native-vector-icons/FontAwesome'; // Import FontAwesome icon

const auth = getAuth(app);
const firestore = getFirestore(app);

export default function UserAccount() {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeAccount, setActiveAccount] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [updatedFullName, setUpdatedFullName] = useState('');

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, user => {
      if (user) {
        const docRef = doc(firestore, 'users', user.uid);
        const unsubscribeSnapshot = onSnapshot(docRef, snapshot => {
          if (snapshot.exists()) {
            const userData = snapshot.data();
            setUserData(userData);
            setActiveAccount(userData.activeAccount || false);
          } else {
            console.log('No such document!');
          }
          setLoading(false);
        });
        return () => unsubscribeSnapshot();
      } else {
        console.log('User is not signed in.');
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  const toggleActiveAccount = async () => {
    try {
      const user = auth.currentUser;
      const docRef = doc(firestore, 'users', user.uid);
      await updateDoc(docRef, { activeAccount: !activeAccount });
      setActiveAccount(!activeAccount);
    } catch (error) {
      console.error('Error toggling active account:', error);
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const handleEditClick = () => {
    setIsModalVisible(true);
    setUpdatedFullName(userData.fullname || '');
  };

  const handleSaveFullName = async () => {
    try {
      const user = auth.currentUser;
      const userId = user.uid;
      const userDocRef = doc(firestore, 'users', userId);
      await updateDoc(userDocRef, { fullname: updatedFullName });
      setIsModalVisible(false);
      console.log('Full name updated successfully!');
    } catch (error) {
      console.error('Error updating full name:', error);
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
              <TouchableOpacity onPress={logout}>
                <Text style={styles.headingText}>Logout</Text>
              </TouchableOpacity>
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
              <TouchableOpacity onPress={handleEditClick}>
                <Text style={{ fontFamily: 'Outfit', fontSize: 26, color: 'black', alignSelf: 'center',marginHorizontal:5 }}>
                  {userData.fullname}
                  <Icon name="pencil" size={20} color="black" style={styles.pencilIcon} />
                </Text>
              </TouchableOpacity>
            )}
          </View>

          <TouchableOpacity onPress={toggleActiveAccount}>
            <View
              style={[
                styles.toggleButton,
                activeAccount ? styles.toggleButtonActive : null,
              ]}>
              <Text style={styles.toggleButtonText}>
                {activeAccount ? 'Active' : 'Inactive'}
              </Text>
            </View>
          </TouchableOpacity>

          <DetailsComponent label={'Email'} userData={userData.email} />
          <DetailsComponent label={'Phone'} userData={userData.phone} />
          <DetailsComponent label={'Address'} userData={userData.address} />
          <DetailsComponent label={'City'} userData={userData.city} />
          <DetailsComponent label={'District'} userData={userData.district} />
          <DetailsComponent label={'NIC'} userData={userData.nic} />
          <DetailsComponent label={'Gender'} userData={userData.gender} />
          {userData.bloodType && (
            <DetailsComponent
              label={'Blood Group'}
              userData={userData.bloodType}
            />
          )}

          <Modal visible={isModalVisible} animationType="slide">
            <View style={styles.modalContainer}>
              <Text style={styles.modalTitle}>Edit Full Name</Text>
              <TextInput
                style={styles.modalInput}
                value={updatedFullName}
                onChangeText={setUpdatedFullName}
              />
              <TouchableOpacity onPress={handleSaveFullName}>
                <Text style={styles.saveButton}>Save</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setIsModalVisible(false)}>
                <Text style={styles.cancelButton}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </Modal>
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
  }, toggleButton: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'lightgray',
    borderRadius: 20,
    paddingVertical: 10,
    margin: 10,
  },
  toggleButtonActive: {
    backgroundColor: 'red',
  },
  toggleButtonText: {
    fontSize: 18,
    fontFamily: 'Outfit',
    color: '#F8F8F8',
    fontWeight: 'bold',
  },
  pencilIcon: {
    marginLeft: 5,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 24,
    fontFamily: 'Outfit',
    marginBottom: 20,
  },
  modalInput: {
    width: '80%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  saveButton: {
    backgroundColor: 'green',
    color: 'white',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  cancelButton: {
    backgroundColor: 'red',
    color: 'white',
    padding: 10,
    borderRadius: 5,
  },
});