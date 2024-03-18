import React, { useEffect } from 'react';
import { Dimensions, StyleSheet, Text, View } from 'react-native';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import { requestLocationPermission } from './PermissionUtils';

export default function AppMapView({ donors, initialRegion }) {
  useEffect(() => {
    requestLocationPermission();
  }, []);

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        provider={PROVIDER_GOOGLE}
        initialRegion={initialRegion}
        showsUserLocation={true}
      >
        {donors.map((donor, index) => (
          <Marker
            key={index}
            coordinate={{
              latitude: donor.latitude,
              longitude: donor.longitude
            }}
            title={donor.name}
            description={`${donor.city}, ${donor.district}`}
          />
        ))}
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 20,
    overflow: 'hidden',
  },
  map: {
    width: Dimensions.get('screen').width * 0.89,
    height: Dimensions.get('screen').height * 0.23,
    marginHorizontal: 20,
    marginVertical: 10,
  },
});
