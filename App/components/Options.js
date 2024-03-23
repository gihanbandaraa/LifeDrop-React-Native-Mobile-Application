import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';

export default function Options() {
  const navigation = useNavigation();

  const AboutUs = () => {
    navigation.navigate('About Us');
  };
  const NewsFeed = () => {
    navigation.navigate('NewsFeed');
  };
  const Search = () => {
    navigation.navigate('Search');
  };
  const Chats = () => {
    navigation.navigate('Chats');
  };

  return (
    <>
      <View style={{marginTop: 40}}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            margin: 15,
          }}>
          <View style={[styles.optionContainer, styles.elevatedCard]}>
            <View style={styles.option}>
              <TouchableOpacity onPress={Search}>
                <Text style={styles.optionText}>Find Donor</Text>
                <Image
                  source={require('../images/blood-bag.png')}
                  style={styles.image}
                />
              </TouchableOpacity>
            </View>
          </View>

          <View style={[styles.optionContainer, styles.elevatedCard]}>
            <View style={styles.option}>
              <TouchableOpacity onPress={NewsFeed}>
                <Text style={styles.optionText}>News Feed</Text>
                <Image
                  source={require('../images/post.png')}
                  style={styles.image}
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            margin: 15,
          }}>
          <View style={[styles.optionContainer, styles.elevatedCard]}>
            <View style={styles.option}>
              <TouchableOpacity onPress={Chats}>
                <Text style={styles.optionText}>Chats</Text>
                <Image
                  source={require('../images/chat.png')}
                  style={styles.image}
                />
              </TouchableOpacity>
            </View>
          </View>

          <View style={[styles.optionContainer, styles.elevatedCard]}>
            <View style={styles.option}>
              <TouchableOpacity>
                <Text style={styles.optionText}>About LifeDrop</Text>
                <Image
                  source={require('../images/file.png')}
                  style={styles.image}
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  optionContainer: {
    backgroundColor: 'white',
    height: 220,
    padding: 30,
    marginTop: 10,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
  },
  option: {
    height: 120,
    width: 100,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  optionText: {
    fontFamily: 'Outfit',
    alignSelf: 'center',
    fontSize: 18,
  },
  elevatedCard: {
    elevation: 3,
  },
  image: {
    width: 90,
    height: 90,
  },
});
