import React from 'react';
import { View, ActivityIndicator, StyleSheet, Image, Text } from 'react-native';

const LoadingIndicator = () => {
  return (
    <View style={styles.container}>
      {/* Your Logo */}
      <Image
        source={require('../images/blood-bag.png')}
        style={styles.logo}
      />
      {/* Loading Text */}
      <Text style={styles.text}>Loading...</Text>
      {/* Loading Bar */}
      <View style={styles.loadingBar}>
        <ActivityIndicator size="large" color="#0000ff" />
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
    fontWeight: 'bold',
    marginBottom: 20,
  },
  loadingBar: {
    marginTop: 20,
  },
});

export default LoadingIndicator;
