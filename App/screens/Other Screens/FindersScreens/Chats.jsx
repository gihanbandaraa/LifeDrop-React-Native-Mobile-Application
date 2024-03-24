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
  deleteDoc,
} from 'firebase/firestore';
import {getAuth} from 'firebase/auth';
import {getFirestore} from 'firebase/firestore';
import app from '../../../../firebaseConfig';
import {useNavigation} from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Image} from 'react-native';
import {Alert} from 'react-native';

// Assuming you have initialized Firebase in a file called firebase.js
const firebaseApp = app;
const firestore = getFirestore(firebaseApp);
const auth = getAuth(firebaseApp);


export default function Chats() {
  const [chats, setChats] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();


  useEffect(() => {
    const fetchChats = async () => {
      try {
        const currentUser = auth.currentUser;
        const chatRoomsRef = collection(firestore, 'chatRooms');
        const q = query(
          chatRoomsRef,
          where('users', 'array-contains', currentUser.uid),
        );

        const querySnapshot = await getDocs(q);

        const chatsData = [];
        for (const chatRoomDoc of querySnapshot.docs) {
          const chatRoomData = chatRoomDoc.data();
          const donorId = chatRoomData.users.find(id => id !== currentUser.uid);

          const donorDocSnapshot = await getDoc(
            doc(firestore, `users/${donorId}`),
          );

          if (donorDocSnapshot.exists()) {
            const donorData = donorDocSnapshot.data();
            chatsData.push({
              chatRoomId: chatRoomDoc.id,
              currentUserId: currentUser.uid,
              donorId,
              donorName: donorData.fullname,
              donorProfileImage: donorData.profileImage,
            });
          } else {
            console.log('Donor document does not exist for donorId:', donorId);
          }
        }

        setChats(chatsData);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching chats:', error);
      }
    };

    fetchChats();
    const interval = setInterval(() => {
      fetchChats();
    }, 1000);

    // Clear interval on component unmount
    return () => clearInterval(interval);
  }, []);

  const handleChatPress = (chatRoomId, donorId, donorName) => {
    navigation.navigate('MessageRoom', {
      chatRoomId,
      otherUserId: donorId,
      otherUserName: donorName,
      currentUserId: auth.currentUser.uid,
    });
  };

  const handleDeleteChat = chatRoomId => {
    Alert.alert(
      'Confirmation',
      'Are you sure you want to delete this chat?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          onPress: async () => {
            try {
              await deleteDoc(doc(firestore, 'chatRooms', chatRoomId));
              // Remove the deleted chat from the state
              setChats(prevChats =>
                prevChats.filter(chat => chat.chatRoomId !== chatRoomId),
              );
              console.log('Chat room deleted successfully');
            } catch (error) {
              console.error('Error deleting chat room:', error);
            }
          },
        },
      ],
      {cancelable: false},
    );
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="red" />
      </View>
    );
  }

  if (chats.length === 0) {
    return (
      <View style={styles.container}>
        <Text style={styles.noChatsText}>No chats available</Text>
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
              <TouchableOpacity
                style={styles.deleteButton}
                onPress={() => handleDeleteChat(item.chatRoomId)}>
                <Ionicons name="trash" size={20} color={'red'} />
              </TouchableOpacity>
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
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
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
  noChatsText: {
    fontSize: 18,
    textAlign: 'center',
    color: 'black',
  },
  deleteButton: {
    marginLeft: 'auto',
  },
});
