import React, { useEffect } from 'react';
import { setDoc, doc, updateDoc } from 'firebase/firestore';
import Geolocation from 'react-native-geolocation-service';

const GeolocationUpdater = ({ firestore, user }) => {
  useEffect(() => {
    const updateFirestoreWithLocation = async () => {
      try {
        Geolocation.getCurrentPosition(
          async position => {
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;

            // Update only latitude and longitude fields
            await updateDoc(doc(firestore, 'users', user.uid), {
              latitude: latitude,
              longitude: longitude,
            });

            console.log('User location updated on Firestore successfully!');
          },
          error => {
            console.error('Error getting current position:', error);
          },
          { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
        );
      } catch (error) {
        console.error('Error updating location on Firestore:', error);
      }
    };

    // Call the function to update the location immediately and set up interval to update location every minute
    updateFirestoreWithLocation();

    const intervalId = setInterval(updateFirestoreWithLocation, 60000);

    // Clean up the interval on component unmount
    return () => clearInterval(intervalId);
  }, [firestore, user]);

  return null; // This component doesn't render anything
};

export default GeolocationUpdater;
