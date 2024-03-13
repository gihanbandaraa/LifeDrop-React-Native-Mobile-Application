import * as firebase from 'firebase/compat';

const firebaseConfig = {
    apiKey: "AIzaSyDUfdppaDxa-C32m3PlvuP3LKX7S39KJxc",
    authDomain: "lifedrop-cac87.firebaseapp.com",
    projectId: "lifedrop-cac87",
    storageBucket: "lifedrop-cac87.appspot.com",
    messagingSenderId: "786759662787",
    appId: "1:786759662787:web:dc8cae826716fa7aab7676"
  };

  let firebaseApp;
  if (firebase.apps.length === 0) {
    firebaseApp = firebase.initializeApp(firebaseConfig);
  } else {
    firebaseApp = firebase.app();
  }
  
  const auth = firebase.auth();
  const firestore = firebase.firestore();
  
  export { firestore };
  export { auth };