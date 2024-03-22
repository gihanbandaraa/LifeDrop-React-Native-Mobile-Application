import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import {
  collection,
  getDocs,
  query,
  where,
  getDoc,
  doc,
} from 'firebase/firestore';
import {getAuth} from 'firebase/auth';
import {getFirestore} from 'firebase/firestore';
import app from '../../../../firebaseConfig';
import {useNavigation} from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Image } from 'react-native';

// Assuming you have initialized Firebase in a file called firebase.js
const firebaseApp = app;
const firestore = getFirestore(firebaseApp);
const auth = getAuth(firebaseApp);

export default function Chats() {
  const [chats, setChats] = useState([]);
  const navigation = useNavigation();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchChats = async () => {
      try {
        const currentUser = auth.currentUser;
        console.log('Current User:', currentUser);

        const chatRoomsRef = collection(firestore, 'chatRooms');
        const q = query(
          chatRoomsRef,
          where('users', 'array-contains', currentUser.uid),
        );
        console.log('Query:', q);

        const querySnapshot = await getDocs(q);
        console.log('Query Snapshot:', querySnapshot);

        const chatsData = [];
        for (const chatRoomDoc of querySnapshot.docs) {
          console.log('Processing document:', chatRoomDoc.id);
          const chatRoomData = chatRoomDoc.data();
          console.log('Chat Room Data:', chatRoomData);
          const donorId = chatRoomData.users.find(id => id !== currentUser.uid);
          console.log('Donor ID:', donorId);

          // Retrieve the user document from 'users' collection using the document path
          const donorDocSnapshot = await getDoc(
            doc(firestore, `users/${donorId}`),
          ); // Using document path
          console.log('Donor Document Snapshot:', donorDocSnapshot);

          if (donorDocSnapshot.exists()) {
            const donorData = donorDocSnapshot.data();
            console.log('Donor Data:', donorData);
            chatsData.push({
              chatRoomId: chatRoomDoc.id,
              currentUserId: currentUser.uid,
              donorId,
              donorName: donorData.fullname, 
              donorProfileImage: donorData.profileImage,
              // Assuming the donor's name is stored in the 'fullname' field
            });
          } else {
            console.log('Donor document does not exist for donorId:', donorId);
          }
        }

        console.log('Chats Data:', chatsData);
        setChats(chatsData);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching chats:', error);
      }
    };

    fetchChats();
  }, []);

  const handleChatPress = (chatRoomId, donorId, donorName) => {
    navigation.navigate('MessageRoom', {
      chatRoomId,
      otherUserId: donorId,
      otherUserName: donorName,
      currentUserId: auth.currentUser.uid,
      
    });
  };
  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="red" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={[styles.chatItemText, styles.heading]}>Chats</Text>
      <FlatList
        data={chats}
        renderItem={({item}) => (
          <TouchableOpacity
            onPress={() =>
              handleChatPress(item.chatRoomId, item.donorId, item.donorName)
            }>
            <View style={styles.chatItem}>
              {item.donorProfileImage ? (
                <Image
                  source={{uri: item.donorProfileImage}}
                  style={styles.profileImage}
                />
              ) : (
                <Ionicons name="person" size={50} color={'black'} />
              )}
              <Text style={styles.chatItemText}>{item.donorName}</Text>
            </View>
          </TouchableOpacity>
        )}
        keyExtractor={item => item.chatRoomId}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'left',
  },
  heading: {
    alignSelf: 'center',
    marginVertical: 20,
    fontSize: 30,
    color: 'black',
  },
  chatItem: {
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  chatItemText: {
    fontFamily: 'Outfit',
    fontSize: 18,
    marginLeft: 8,
    color: 'black',
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
});
