import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TextInput,
  Button,
  TouchableOpacity,
} from 'react-native';
import {
  collection,
  query,
  where,
  orderBy,
  onSnapshot,
  addDoc,
  serverTimestamp,
} from 'firebase/firestore';
import {getFirestore} from 'firebase/firestore';
import app from '../../../firebaseConfig';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';

const firestore = getFirestore(app);

export default function MessageRoom({route}) {
  const {chatRoomId, otherUserId, otherUserName, currentUserId} = route.params;
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const navigation = useNavigation();

  useEffect(() => {
    const unsubscribe = onSnapshot(
      query(
        collection(firestore, 'messages'),
        where('chatRoomId', '==', chatRoomId),
        orderBy('createdAt'),
      ),
      snapshot => {
        const messageData = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));
        setMessages(messageData);
      },
      error => {
        console.error('Error fetching messages:', error);
      },
    );

    return () => unsubscribe();
  }, [chatRoomId]);

  const sendMessage = async () => {
    // Check if the new message is empty
    if (newMessage.trim() === '') {
      // Display an alert or handle the empty message case accordingly
      console.warn('Cannot send empty message');
      return;
    }

    try {
      await addDoc(collection(firestore, 'messages'), {
        chatRoomId,
        senderId: currentUserId,
        receiverId: otherUserId,
        text: newMessage,
        createdAt: serverTimestamp(),
      });
      setNewMessage('');
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  const renderMessageItem = ({item}) => {
    const isSent = item.senderId === currentUserId;
    return (
      <View
        style={[
          styles.messageContainer,
          isSent ? styles.sentMessage : styles.receivedMessage,
        ]}>
        <Text>{item.text}</Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View
        style={{
          flexDirection: 'row',
          backgroundColor: '#F8F8F8',
          padding: 15,
          alignItems: 'center',
        }}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="caret-back-outline" color={'red'} size={30} />
        </TouchableOpacity>
        <Text style={styles.userName}>{otherUserName}</Text>
      </View>

      <FlatList
        data={messages}
        renderItem={({item}) => (
          <View
            style={[
              styles.messageContainer,
              item.senderId === currentUserId
                ? styles.sentMessage
                : styles.receivedMessage,
            ]}>
            <Text style={styles.messageText}>{item.text}</Text>
          </View>
        )}
        keyExtractor={item => item.id}
        inverted={false}
      />

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={newMessage}
          onChangeText={text => setNewMessage(text)}
          placeholder="Type a message..."
        />
        <Button title="Send" onPress={sendMessage} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0', // Background color for the whole screen
  },
  userName: {
    fontSize: 20,
    fontFamily: 'Outfit',
  },
  header: {
    padding: 20,
    backgroundColor: '#007bff', // Example color for the header
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff', // Text color for the header
  },
  messageContainer: {
    maxWidth: '80%',
    marginVertical: 5,
    padding: 10,
    borderRadius: 10,
  },
  sentMessage: {
    alignSelf: 'flex-end',
    backgroundColor: '#DCF8C6',
    marginHorizontal: 15,
  },
  receivedMessage: {
    alignSelf: 'flex-start',
    backgroundColor: '#FFFFFF',
    marginHorizontal: 15, // Example color for received messages
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingBottom: 10, // Add some padding to the bottom of the input container
    borderTopWidth: 1,
    borderTopColor: '#ccc', // Border color for the input container
    backgroundColor: '#fff',
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginVertical: 5,
    paddingHorizontal: 10,
    marginRight: 10,
    backgroundColor: '#f9f9f9',
    fontFamily: 'Outfit', // Background color for the input field
  },
  sendButton: {
    backgroundColor: 'red', // Example color for the send button
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  sendButtonText: {
    color: '#fff', // Text color for the send button
    fontWeight: 'bold',
  },
  messageText: {
    fontFamily: 'Outfit',
  },
});
