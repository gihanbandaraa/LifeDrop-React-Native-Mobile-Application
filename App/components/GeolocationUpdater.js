import React, { useEffect } from 'react';
import { setDoc, doc, updateDoc } from 'firebase/firestore';
import Geolocation from 'react-native-geolocation-service';

const GeolocationUpdater = ({ firestore, user }) => {
  useEffect(() => {
    if (!user) {
      // If there's no authenticated user, do nothing
      return;
    }

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

            // console.log('User location updated on Firestore successfully!');
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

    // Call the function only if there's an authenticated user
    updateFirestoreWithLocation();

    // Set interval only if there's an authenticated user
    const intervalId = setInterval(updateFirestoreWithLocation, 50000);
    return () => clearInterval(intervalId);
  }, [firestore, user]);

  return null; // This component doesn't render anything
};

export default GeolocationUpdater;
