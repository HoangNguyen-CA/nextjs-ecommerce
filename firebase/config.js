import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
  apiKey: 'AIzaSyAn-rFOKmUa-njkTKgGN6vOfTVhaMZ0Se0',
  authDomain: 'nextjs-ecommerce-3da46.firebaseapp.com',
  databaseURL: 'https://nextjs-ecommerce-3da46.firebaseio.com',
  projectId: 'nextjs-ecommerce-3da46',
  storageBucket: 'nextjs-ecommerce-3da46.appspot.com',
  messagingSenderId: '1325881074',
  appId: '1:1325881074:web:5a5b0bbefb7629fa19626b',
  measurementId: 'G-J19FBZ3EFH',
};

class Firebase {
  constructor() {
    if (firebase.apps.length === 0) {
      firebase.initializeApp(config);
    }
    this.auth = firebase.auth();
    this.db = firebase.firestore();
  }
}

export default Firebase;
