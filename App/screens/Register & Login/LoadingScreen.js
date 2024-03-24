import React from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import Colours from '../../colours/Colours';

const LoadingScreen = () => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color={Colours.PRIMARY} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colours.white,
  },
});

export default LoadingScreen;
