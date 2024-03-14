import { initializeApp } from "firebase/app";
import 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyDUfdppaDxa-C32m3PlvuP3LKX7S39KJxc",
    authDomain: "lifedrop-cac87.firebaseapp.com",
    projectId: "lifedrop-cac87",
    storageBucket: "lifedrop-cac87.appspot.com",
    messagingSenderId: "786759662787",
    appId: "1:786759662787:web:dc8cae826716fa7aab7676"
  };

  const app = initializeApp(firebaseConfig);

  export default app;