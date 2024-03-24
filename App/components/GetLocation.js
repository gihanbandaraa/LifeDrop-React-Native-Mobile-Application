import {PermissionsAndroid, StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import {TouchableOpacity} from 'react-native';
import Geolocation from 'react-native-geolocation-service';

export default function GetLocation() {
  useEffect(() => {
    requestCameraPermission();
  }, []);
  const requestCameraPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Cool LifeDrop Need Location Permission',
          message:
            'LifeDrop  App needs access to your location ' +
            'so you can take find campaigns.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('You can use the Location');
      } else {
        console.log('Location permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  };

  const getLocation = ()=>{
    Geolocation.getCurrentPosition(
        (position) => {
            console.log("Wait");
          console.log(position);
        },
        (error) => {
          // See error code charts below.
          console.log(error.code, error.message);
        },
        { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
    );
  }
  return (
    <View>
      <TouchableOpacity style={{alignSelf:"center",padding:10,backgroundColor:'red'}} onPress={() =>{getLocation()}}>
        <Text style={{color:'white'}}>GetLocation</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({});
