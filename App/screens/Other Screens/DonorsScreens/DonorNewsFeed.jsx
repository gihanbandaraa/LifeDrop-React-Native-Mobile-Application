import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  ActivityIndicator,
  Linking,
  TouchableOpacity,
} from 'react-native';
import {getFirestore, collection, onSnapshot, query} from 'firebase/firestore';
import {getAuth} from 'firebase/auth';
import app from '../../../../firebaseConfig';
import {ScrollView} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialIcons'; // Import MaterialIcons from react-native-vector-icons

export default function DonorNewsFeed() {
  const firebaseApp = app;
  const firestore = getFirestore(firebaseApp);
  const auth = getAuth(firebaseApp);

  const [searchQuery, setSearchQuery] = useState('');
  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onSnapshot(
      query(collection(firestore, 'adminposts')),
      snapshot => {
        const campaignsData = [];
        snapshot.forEach(doc => {
          const id = doc.id || Math.random().toString(36).substring(7);
          campaignsData.push({id, ...doc.data()});
        });
        setCampaigns(campaignsData);
        setLoading(false);
      },
    );

    return () => unsubscribe();
  }, [firestore]);

  const filteredCampaigns = campaigns.filter(campaign => {
    const title = campaign.title || '';
    const venue = campaign.venue || '';
    const city = campaign.city || '';
    const date = campaign.date || '';
    const time = campaign.time || '';
    const description = campaign.description || '';

    return (
      title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      venue.toLowerCase().includes(searchQuery.toLowerCase()) ||
      city.toLowerCase().includes(searchQuery.toLowerCase()) ||
      date.toLowerCase().includes(searchQuery.toLowerCase()) ||
      time.toLowerCase().includes(searchQuery.toLowerCase()) ||
      description.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  const getDirections = campaign => {
    if (campaign && campaign.venue) {
      const venue = encodeURIComponent(campaign.venue + ', ' + campaign.city);
      console.log(venue);
      const url = `https://www.google.com/maps/dir/?api=1&destination=${venue}`;
      Linking.openURL(url);
    }
  };

  const setReminder = () => {
    // Here you can implement a feature to set a reminder
    // You can use a library like react-native-push-notification to schedule reminders
    // Example: set a reminder for the event
    alert('Reminder set successfully!');
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search campaigns..."
          onChangeText={text => setSearchQuery(text)}
          value={searchQuery}
        />
        {loading ? (
          <ActivityIndicator size="large" color="red" />
        ) : (
          filteredCampaigns.map(campaign => (
            <View key={campaign.id} style={styles.campaignContainer}>
              <Image
                source={{uri: campaign.imageUrl}}
                style={styles.bannerImage}
              />
              <Text style={styles.title}>{campaign.name}</Text>
              {campaign.type !== 'Post' && ( // Check if type is not 'post'
                <View>
                  <Text style={styles.details}>
                    {campaign.venue}, {campaign.city}
                  </Text>
                  <Text style={[styles.details, styles.timeAndDate]}>
                    {campaign.date}, {campaign.time}
                  </Text>
                </View>
              )}
              <Text style={styles.description}>{campaign.description}</Text>
              {campaign.type !== 'Post' && ( // Check if type is not 'post'
                <View style={styles.buttons}>
                  <TouchableOpacity onPress={() => getDirections(campaign)}>
                    <View style={styles.button}>
                      <Icon name="directions" size={20} color="white" />
                      <Text style={styles.buttonText}>Get Directions</Text>
                    </View>
                  </TouchableOpacity>
                </View>
              )}
            </View>
          ))
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    padding: 20,
  },
  searchInput: {
    width: '100%',
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 10,
    color:'black',
    marginBottom: 20,
    paddingLeft: 10,
    fontFamily:'Outfit'
  },
  campaignContainer: {
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    padding: 10,
    width: '100%',
  },
  bannerImage: {
    width: '100%',
    height: 400,
    borderRadius: 10,
    marginBottom: 10,
  },
  title: {
    fontSize: 24,
    marginBottom: 5,
    fontFamily: 'Outfit',
    color: 'black',
  },
  details: {
    fontSize: 18,
    marginBottom: 5,
    fontFamily: 'Outfit Regular',
  },
  description: {
    fontSize: 14,
    fontFamily: 'Outfit Regular',
  },
  timeAndDate: {
    color: '#00b894',
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 10,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#00b894',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontFamily: 'Outfit Regular',
    marginLeft: 5,
  },
});
