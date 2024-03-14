import { initializeApp } from "firebase/app";
import { initializeAuth, getAuth, getAuthForApp, ReactNativeFirebaseConfig, getReactNativePersistence } from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';


const firebaseConfig :ReactNativeFirebaseConfig = {
    apiKey: "AIzaSyDUfdppaDxa-C32m3PlvuP3LKX7S39KJxc",
    authDomain: "lifedrop-cac87.firebaseapp.com",
    projectId: "lifedrop-cac87",
    storageBucket: "lifedrop-cac87.appspot.com",
    messagingSenderId: "786759662787",
    appId: "1:786759662787:web:dc8cae826716fa7aab7676"
  };
  const app = initializeApp(firebaseConfig);

  // Initialize Auth with React Native AsyncStorage persistence
  const auth = initializeAuth(app, {
    persistence: getReactNativePersistence(ReactNativeAsyncStorage)
  });
  
  export { app, auth };