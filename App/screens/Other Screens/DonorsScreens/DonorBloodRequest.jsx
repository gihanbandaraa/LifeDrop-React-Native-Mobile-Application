import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Linking, ActivityIndicator } from 'react-native';
import { collection, query, getDocs, getFirestore, where, onSnapshot, doc, getDoc } from 'firebase/firestore';
import app from '../../../../firebaseConfig'; // Import your Firebase configuration
import { getAuth } from 'firebase/auth';
import Icon from 'react-native-vector-icons/FontAwesome';

const firebaseApp = app;
const auth = getAuth(app);
const firestore = getFirestore(firebaseApp);

export default function DonorBloodRequest() {
  const [bloodRequests, setBloodRequests] = useState([]);
  const [requesterDetails, setRequesterDetails] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBloodRequests = async () => {
      try {
        const currentUserID = auth.currentUser.uid;
        const bloodRequestsRef = collection(firestore, 'users', currentUserID, 'bloodRequests');
        const q = query(bloodRequestsRef);

        const unsubscribe = onSnapshot(q, async snapshot => {
          const bloodRequestsData = [];
          snapshot.forEach(doc => {
            const data = doc.data();
            const { message, requesterId, requesterPhoneNumber } = data;
            bloodRequestsData.push({ message, requesterId, requesterPhoneNumber });
          });
          setBloodRequests(bloodRequestsData);
          setLoading(false); // Set loading to false once data is fetched
        });

        return unsubscribe;
      } catch (error) {
        console.error('Error fetching blood donation requests:', error);
        setLoading(false); // Set loading to false in case of error
      }
    };

    fetchBloodRequests();

    return () => {};
  }, []);

  useEffect(() => {
    const fetchRequesterDetails = async requesterId => {
      try {
        const userRef = doc(firestore, 'users', requesterId);
        const userDoc = await getDoc(userRef);
        if (userDoc.exists()) {
          const userDetails = userDoc.data();
          setRequesterDetails(prevState => ({
            ...prevState,
            [requesterId]: userDetails,
          }));
        } else {
          console.log('User not found');
        }
      } catch (error) {
        console.error('Error fetching requester details:', error);
      }
    };

    bloodRequests.forEach(request => {
      fetchRequesterDetails(request.requesterId);
    });

    return () => {};
  }, [bloodRequests]);

  const handleCall = phoneNumber => {
    Linking.openURL(`tel:${phoneNumber}`);
  };

  const handleEmail = email => {
    Linking.openURL(`mailto:${email}`);
  };

  return (
    <View style={styles.container}>
      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="red" />
        </View>
      ) : (
        <View>
          <Text style={styles.heading}>Blood Donation Requests</Text>
          {bloodRequests.length === 0 ? (
            <Text style={styles.noRequests}>No blood donation requests found.</Text>
          ) : (
            bloodRequests.map((request, index) => (
              <View key={index} style={styles.requestContainer}>
                <Text style={styles.message}>{request.message}</Text>
                <View style={styles.detailsContainer}>
                  {requesterDetails[request.requesterId] && (
                    <View style={styles.requesterDetails}>
                      <Text
                        style={[
                          styles.detailText,
                          {fontSize: 16, fontWeight: 'bold', marginVertical: 1},
                        ]}>
                        Requester Details:
                      </Text>
                      <Text style={styles.detailText}>
                        {requesterDetails[request.requesterId]?.fullname}
                      </Text>
                      <Text style={styles.detailText}>
                        {requesterDetails[request.requesterId]?.address}
                      </Text>
                    </View>
                  )}
                  <View style={styles.buttonContainer}>
                    <TouchableOpacity
                      onPress={() => handleCall(request.requesterPhoneNumber)}>
                      <Icon
                        name="phone"
                        size={30}
                        color="#2ecc71"
                        style={styles.icon}
                      />
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() =>
                        handleEmail(requesterDetails[request.requesterId]?.email)
                      }>
                      <Icon
                        name="envelope"
                        size={30}
                        color="#2ecc71"
                        style={styles.icon}
                      />
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            ))
          )}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    padding: 20,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  heading: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center',
    fontFamily:'Outfit'
  },
  noRequests: {
    fontSize: 18,
    textAlign: 'center',
  },
  requestContainer: {
    marginBottom: 20,
    padding: 10,
    backgroundColor: '#f9f9f9',
    borderRadius: 5,
    elevation:3
  },
  message: {
    fontSize: 16,
    marginBottom: 10,
    fontFamily: 'Outfit',
    color:'black'
  },
  detailsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
  },
  icon: {
    marginHorizontal: 10,
  },
  requesterDetails: {
    marginLeft: 10,
  },
  detailText: {
    marginBottom: 5,
    fontFamily: 'Outfit Regular',
  },
  phoneNumber: {
    fontSize: 16,
    color: '#2ecc71',
  },
});
