import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
  Linking,
  TextInput,
  Alert,
} from 'react-native';
import {
  getFirestore,
  collection,
  getDocs,
  onSnapshot,
  addDoc,
  serverTimestamp,
  getDoc,
  doc,
  query,
  where,
} from 'firebase/firestore';
import app from '../../../../firebaseConfig';
import {StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import AppMapView from '../../../components/AppMapView';
import Geolocation from 'react-native-geolocation-service';
import {getAuth} from 'firebase/auth';
import {useNavigation} from '@react-navigation/native';

const firebaseApp = app;
const firestore = getFirestore(firebaseApp);
const auth = getAuth(firebaseApp);

export default function FindDonor() {
  const [donors, setDonors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchActive, setIsSearchActive] = useState(false);
  const [initialRegion, setInitialRegion] = useState(null);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchDonors = async () => {
      try {
        const querySnapshot = await getDocs(collection(firestore, 'users'));
        const donorList = [];
        querySnapshot.forEach(doc => {
          const data = doc.data();
          if (data.isDonor && data.activeAccount) {
            donorList.push({
              name: data.fullname,
              email: data.email,
              phone: data.phone,
              bloodType: data.bloodType,
              city: data.city,
              district: data.district,
              latitude: data.latitude,
              longitude: data.longitude,
            });
          }
        });
        setDonors(donorList);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching donors:', error);
      }
    };

    fetchDonors();

    Geolocation.getCurrentPosition(
      position => {
        setInitialRegion({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        });
      },
      error => console.error(error),
      {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000},
    );

    const unsubscribe = onSnapshot(collection(firestore, 'users'), snapshot => {
      const donorList = [];
      snapshot.forEach(doc => {
        const data = doc.data();
        if (data.isDonor && data.activeAccount) {
          donorList.push({
            name: data.fullname,
            email: data.email,
            phone: data.phone,
            bloodType: data.bloodType,
            city: data.city,
            district: data.district,
            latitude: data.latitude,
            longitude: data.longitude,
          });
        }
      });
      setDonors(donorList);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleCall = phoneNumber => {
    Linking.openURL(`tel:${phoneNumber}`);
  };

  const handleEmail = email => {
    Linking.openURL(`mailto:${email}`);
  };

  const handleChat = async donorEmail => {
    try {
      const currentUser = auth.currentUser;

      // Find the donorId based on donorEmail
      const donorId = await getDonorIdByEmail(donorEmail);

      if (!donorId) {
        console.log('Donor with email', donorEmail, 'not found');
        return;
      }

      // Check if there's an existing chat room
      const existingChatRoomId = await findExistingChatRoom(
        currentUser.uid,
        donorId,
      );

      if (existingChatRoomId) {
        console.log('Existing chat room found:', existingChatRoomId);
      } else {
        // Create a new chat room if no existing one found
        const newChatRoomId = await createNewChatRoom(currentUser.uid, donorId);
        console.log('New chat room created:', newChatRoomId);
      }

      // Navigate to the Chats screen
      navigation.navigate('Chats');
    } catch (error) {
      console.error('Error handling chat:', error);
    }
  };

  // Function to find the donorId based on the donorEmail
  const getDonorIdByEmail = async donorEmail => {
    const querySnapshot = await getDocs(collection(firestore, 'users'));
    for (const doc of querySnapshot.docs) {
      const data = doc.data();
      if (data.email === donorEmail) {
        return doc.id;
      }
    }
    return null; // Donor not found
  };

  // Function to find an existing chat room between currentUser and donorId
  const findExistingChatRoom = async (currentUserUid, donorId) => {
    const chatRoomsRef = collection(firestore, 'chatRooms');
    const querySnapshot = await getDocs(chatRoomsRef);
    for (const doc of querySnapshot.docs) {
      const chatRoomData = doc.data();
      const users = chatRoomData.users;
      if (users.includes(currentUserUid) && users.includes(donorId)) {
        return doc.id;
      }
    }
    return null; // No existing chat room found
  };

  // Function to create a new chat room between currentUser and donorId
  const createNewChatRoom = async (currentUserUid, donorId) => {
    const chatRoomsRef = collection(firestore, 'chatRooms');
    const newChatRoomRef = await addDoc(chatRoomsRef, {
      users: [currentUserUid, donorId],
      createdAt: serverTimestamp(),
    });
    return newChatRoomRef.id;
  };

  const filteredDonors = donors.filter(
    donor =>
      donor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      donor.bloodType.toLowerCase().includes(searchQuery.toLowerCase()) ||
      donor.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
      donor.district.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const randomMessages = [
    'I need blood urgently',
    'Please donate blood to save a life',
    'Urgent blood donation needed',
    'Seeking blood donation for medical emergency',
    'Blood donation request for critical situation',
  ];

  const randomMessage =
    randomMessages[Math.floor(Math.random() * randomMessages.length)];

  const handleBloodRequest = async donorEmail => {
    try {
      const currentUser = auth.currentUser;

      // Retrieve donor's ID
      const querySnapshot = await getDocs(collection(firestore, 'users'));
      let donorId;
      querySnapshot.forEach(doc => {
        const data = doc.data();
        if (data.email === donorEmail) {
          donorId = doc.id;
          return;
        }
      });

      if (!donorId) {
        console.error('Donor ID not found for the given email:', donorEmail);
        return;
      }

      // Check if there's an existing request from the current user to this donor
      const bloodRequestsRef = collection(
        firestore,
        'users',
        donorId,
        'bloodRequests',
      );
      const existingRequestQuerySnapshot = await getDocs(
        query(bloodRequestsRef, where('requesterId', '==', currentUser.uid)),
      );

      if (!existingRequestQuerySnapshot.empty) {
        Alert.alert(
          'Duplicate Request',
          'You have already made a request to this donor.',
          [{text: 'OK', onPress: () => console.log('OK Pressed')}],
          {cancelable: false},
        );
        return;
      }

      const currentUserDoc = await getDoc(
        doc(firestore, 'users', currentUser.uid),
      );
      const currentUserData = currentUserDoc.data();
      const currentUserPhoneNumber = currentUserData.phone;

      await addDoc(bloodRequestsRef, {
        message: randomMessage,
        requesterId: currentUser.uid,
        requesterPhoneNumber: currentUserPhoneNumber,
        timestamp: serverTimestamp(),
      });

      Alert.alert(
        'Success',
        'Your blood request has been initiated successfully.',
        [{text: 'OK', onPress: () => console.log('OK Pressed')}],
        {cancelable: false},
      );

      console.log('Blood request initiated and saved');
    } catch (error) {
      console.error('Error handling blood request:', error);
    }
  };

  if (loading) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator size="large" color="red" />
      </View>
    );
  }

  return (
    <>
    <View style={{flex: 1}}>
      {!isSearchActive && <Text style={styles.heading}>Find Donors</Text>}
      <View style={styles.searchContainer}>
        <Icon name="search" size={20} color="black" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search by name, blood type, city, or district..."
          placeholderTextColor={'black'}
          value={searchQuery}
          onChangeText={setSearchQuery}
          onFocus={() => setIsSearchActive(true)}
          onBlur={() => setIsSearchActive(false)}
        />
      </View>
      {!isSearchActive && (
        <AppMapView donors={donors} initialRegion={initialRegion} />
      )}
      {!isSearchActive && (
        <Text style={styles.subHeading}>Available Donors</Text>
      )}
      <FlatList
        data={filteredDonors}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({item}) => (
          <View style={styles.userLabel}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
              <View style={{maxWidth: 180}}>
                <Text style={styles.text}>{item.name}</Text>
                <Text style={styles.text}>
                  {item.city},{'\n'}
                  {item.district}.
                </Text>
              </View>
              <View>
                <View
                  style={{
                    flexDirection: 'row',
                    backgroundColor: 'white',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    paddingVertical: 8,
                    paddingHorizontal: 8,
                    borderRadius: 15,
                  }}>
                  <View
                    style={{
                      padding: 5,
                      backgroundColor: 'red',
                      borderRadius: 15,
                      width: 30,
                      height: 30,
                    }}>
                    <Text
                      style={{
                        color: 'white',
                        fontFamily: 'Outfit',
                        alignSelf: 'center',
                      }}>
                      {item.bloodType}
                    </Text>
                  </View>
                  <TouchableOpacity onPress={() => handleChat(item.email)}>
                    <Icon
                      name="comments"
                      size={25}
                      color="gold"
                      style={styles.icon}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => handleCall(item.phone)}>
                    <Icon
                      name="phone"
                      size={25}
                      color="green"
                      style={styles.icon}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => handleEmail(item.email)}>
                    <Icon
                      name="envelope"
                      size={25}
                      color="blue"
                      style={styles.icon}
                    />
                  </TouchableOpacity>

                  <TouchableOpacity
                    onPress={() => handleBloodRequest(item.email)}>
                    <Icon
                      name="plus"
                      size={25}
                      color="red"
                      style={styles.icon}
                    />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        )}
      />
    </View>
    <View style={{height:120}}></View>
    </>
  );
}

const styles = StyleSheet.create({
  userLabel: {
    flexDirection: 'column',
    padding: 20,
    backgroundColor: '#F8F8F8',
    marginVertical: 8,
    marginHorizontal: 10,
    elevation: 3,
    borderRadius: 20,
    alignContent: 'center',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 20,
    marginHorizontal: 20,
    marginVertical: 10,
    paddingHorizontal: 10,

  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    height: 40,
    fontFamily: 'Outfit',
    color:'black',
  },
  text: {
    fontFamily: 'Outfit SemiBold',
    color: 'black',
  },
  icon: {
    marginHorizontal: 10,
  },
  heading: {
    fontFamily: 'Outfit',
    alignSelf: 'center',
    fontSize: 35,
    marginVertical: 20,
    color: 'black',
  },
  subHeading: {
    fontFamily: 'Outfit',
    marginHorizontal: 15,
    fontSize: 18,
    color: 'blue',
  },
});
