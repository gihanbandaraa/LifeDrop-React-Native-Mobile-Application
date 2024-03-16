import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useEffect } from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Options from '../../components/Options';


export default function FinderHomeScreen() {

  return (
    <SafeAreaView style={{backgroundColor: '#F8F8F8',height:"100%"}}>
      <ScrollView style={styles.container}>
        <Text>Finder</Text>
        <View style={styles.headingContainer}>
          <Image
            source={require('../../images/Logo.png')}
            style={styles.logo}
          />
          <TouchableOpacity>
            <Icon name="bell" color="red" size={40} />
          </TouchableOpacity>
        </View>
        <Options />
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
