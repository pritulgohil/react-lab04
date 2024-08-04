import firebase from '@react-native-firebase/app';
import '@react-native-firebase/database';

const firebaseConfig = {
  apiKey: 'AIzaSyDsois0sZwENwtGvdadV4QO6cr3nn0tWoM',
  authDomain: 'cab-booking-9b6f0.firebaseapp.com',
  databaseURL: 'https://cab-booking-9b6f0-default-rtdb.firebaseio.com',
  projectId: 'cab-booking-9b6f0',
  storageBucket: 'cab-booking-9b6f0.appspot.com',
  messagingSenderId: '1066948634690',
  appId: '1:1066948634690:web:f6894b359ce8cc1a2aa5db',
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export {firebase};
