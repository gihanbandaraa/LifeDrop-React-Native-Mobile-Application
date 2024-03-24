import React from 'react';
import { View, ActivityIndicator, StyleSheet, Image, Text, useColorScheme } from 'react-native';

const LoadingIndicator = () => {
  const colorScheme = useColorScheme();
  const backgroundColor = colorScheme === 'dark' ? 'white' : 'white';

  return (
    <View style={[styles.container, { backgroundColor }]}>
      <Image
        source={require('../images/blood-bag.png')}
        style={styles.logo}
      />
      <Text style={styles.text}>Loading...</Text>
      <View style={styles.loadingBar}>
        <ActivityIndicator size="large" color="red" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 200,
    height: 200,
    marginBottom: 20,
  },
  text: {
    fontSize: 18,
    fontFamily: 'Outfit',
    marginBottom: 20,
    color: 'black'
  },
  loadingBar: {
    marginTop: 20,
  },
});

export default LoadingIndicator;
