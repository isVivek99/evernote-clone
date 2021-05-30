import firebase from 'firebase/app';
import 'firebase/firestore';



const firebaseConfig = {
    apiKey: "AIzaSyD2p_fpCspiPsN03YRXJjqWyO2ApGXdWwU",
    authDomain: "notes-app-752ee.firebaseapp.com",
    projectId: "notes-app-752ee",
    storageBucket: "notes-app-752ee.appspot.com",
    messagingSenderId: "587085113532",
    appId: "1:587085113532:web:742843552f0259bd8388b9"
  };

  const firebaseApp = firebase.initializeApp(firebaseConfig);
  
  const db = firebase.firestore();
  const timestamp = firebase.firestore.FieldValue.serverTimestamp();
  
  export { timestamp };
  export default db;

