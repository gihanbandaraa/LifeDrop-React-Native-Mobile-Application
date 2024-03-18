import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
  Linking,
  TextInput,
} from 'react-native';
import {
  getFirestore,
  collection,
  query,
  where,
  getDocs,
  onSnapshot,
} from 'firebase/firestore';
import app from '../../../../firebaseConfig';
import { StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import AppMapView from '../../../components/AppMapView';

const firebaseApp = app;
const firestore = getFirestore(firebaseApp);

export default function FindDonor() {
  const [donors, setDonors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchActive, setIsSearchActive] = useState(false);

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
          });
        }
      });
      setDonors(donorList);
      setLoading(false);
    });
  
    // Unsubscribe from the listener when the component unmounts
    return () => unsubscribe();
  }, []);

  const handleCall = phoneNumber => {
    Linking.openURL(`tel:${phoneNumber}`);
  };

  const handleEmail = email => {
    Linking.openURL(`mailto:${email}`);
  };

  const filteredDonors = donors.filter(
    donor =>
      donor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      donor.bloodType.toLowerCase().includes(searchQuery.toLowerCase()) ||
      donor.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
      donor.district.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="red" />
      </View>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      {!isSearchActive && (
        <Text
          style={{
            fontFamily: 'Outfit',
            alignSelf: 'center',
            fontSize: 35,
            marginVertical: 20,
            color: 'black',
          }}>
          Find Donors
        </Text>
      )}
      <View style={styles.searchContainer}>
        <Icon name="search" size={20} color="black" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search by name, blood type, city, or district..."
          value={searchQuery}
          onChangeText={setSearchQuery}
          onFocus={() => setIsSearchActive(true)}
          onBlur={() => setIsSearchActive(false)}
        />
      </View>
      {!isSearchActive && <AppMapView />}
      {!isSearchActive && (
        <Text style={{ fontFamily: "Outfit", marginHorizontal: 15, fontSize: 18, color: 'blue' }}>Available Donors</Text>
      )}
      <FlatList
        data={filteredDonors}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.userLabel}>
            <View
              style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <View style={{ maxWidth: 180 }}>
                <Text style={styles.text}>{item.name}</Text>
                <Text style={styles.text}>
                  {item.city}, {item.district}
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
                  <TouchableOpacity onPress={() => handleCall(item.phone)}>
                    <Icon
                      name="phone"
                      size={24}
                      color="green"
                      style={styles.icon}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => handleEmail(item.email)}>
                    <Icon
                      name="envelope"
                      size={24}
                      color="blue"
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
    fontFamily: 'Outfit Regular',
    fontWeight: 'bold',
  
  },
  text: {
    fontFamily: 'Outfit SemiBold',
    color: 'black',
  },
  icon: {
    marginHorizontal: 10,
  },
});
