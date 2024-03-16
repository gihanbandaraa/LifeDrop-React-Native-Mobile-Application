import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const DetailsComponent = ({ label, userData }) => {
  return (
    <View
      style={{
        padding: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderBottomColor: 'black',
        borderBottomWidth: StyleSheet.hairlineWidth,
      }}>
      <View style={{ flexDirection: 'row' }}>
        <View
          style={{
            backgroundColor: 'red',
            width: 20,
            height: 20,
            borderRadius: 20 / 2,
          }}></View>
        <Text style={{ fontFamily: 'Outfit', fontSize: 18, marginLeft: 9 }}>
          {label}
        </Text>
      </View>
      <Text style={{ fontFamily: 'Outfit', fontSize: 16,marginLeft:5 }}>
        {userData}
      </Text>
    </View>
  );
};

export default DetailsComponent;
