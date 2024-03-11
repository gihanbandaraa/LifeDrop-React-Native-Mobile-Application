import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export default function AccountSection() {
  return (
    <View style={styles.accountSectionContainer}>
      <View style={styles.accountSection}>
        <TouchableOpacity>
          <Icon
            name="account"
            color="#000000"
            size={40}
            style={styles.account}
          />
        </TouchableOpacity>
        <Text style={styles.userName}>UserName</Text>
      </View>
      <View style={styles.locationContainer}>
        <Icon
          name="map-marker"
          color="#de3c2b"
          size={40}
          style={[styles.account, {marginRight: 8}]}
        />
        <View>
          <Text style={styles.text}>City,</Text>
          <Text style={styles.text}>Town</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
    accountSectionContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
      },
      accountSection: {
        flexDirection: 'row',
        alignItems: 'center',
      },
      account: {
        marginVertical: 20,
      },
      userName: {
        fontFamily: 'Outfit',
        fontSize: 16,
      },
      locationContainer: {
        flexDirection: 'row',
        alignItems: 'center',
      },
      text: {
        fontFamily: 'Outfit',
        fontSize: 16,
      },
});
