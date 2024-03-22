import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  Image,
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
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';

// Assuming you have initialized Firebase in a file called firebase.js
const firebaseApp = app;
const firestore = getFirestore(firebaseApp);
const auth = getAuth(firebaseApp);

export default function DonorChats() {
  const [chats, setChats] = useState([]);
  const [loading, setLoading] = useState(true); // State variable for loading indicator
  const navigation = useNavigation();

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
          const otherUserId = chatRoomData.users.find(
            id => id !== currentUser.uid,
          );
          console.log('Other User ID:', otherUserId);

          // Retrieve the user document from 'users' collection using the document path
          const otherUserDocSnapshot = await getDoc(
            doc(firestore, `users/${otherUserId}`),
          ); // Using document path
          console.log('Other User Document Snapshot:', otherUserDocSnapshot);

          if (otherUserDocSnapshot.exists()) {
            const otherUserData = otherUserDocSnapshot.data();
            console.log('Other User Data:', otherUserData);
            chatsData.push({
              chatRoomId: chatRoomDoc.id,
              currentUserId: currentUser.uid,
              otherUserId,
              otherUserName: otherUserData.fullname,
              otherUserProfileImage: otherUserData.profileImage, // Assuming the other user's name is stored in the 'fullname' field
            });
          } else {
            console.log(
              'Other user document does not exist for otherUserId:',
              otherUserId,
            );
          }
        }

        console.log('Chats Data:', chatsData);
        setChats(chatsData);
        setLoading(false); // Set loading to false when chats are fetched
      } catch (error) {
        console.error('Error fetching chats:', error);
      }
    };

    fetchChats();
  }, []);

  const handleChatPress = (
    chatRoomId,
    otherUserId,
    otherUserName,
    currentUserId,
  ) => {
    // Navigate to the message room screen and pass necessary data
    navigation.navigate('MessageRoom', {
      chatRoomId,
      otherUserId,
      otherUserName,
      currentUserId,
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
              handleChatPress(
                item.chatRoomId,
                item.otherUserId,
                item.otherUserName,
                item.currentUserId,
              )
            }>
            <View style={styles.chatItem}>
              {item.otherUserProfileImage ? (
                <Image
                  source={{uri: item.otherUserProfileImage}}
                  style={styles.profileImage}
                />
              ) : (
                <Ionicons name="person" size={50} color={'black'} />
              )}
              <Text style={styles.chatItemText}>{item.otherUserName}</Text>
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
