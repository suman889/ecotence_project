import * as dotenv from 'react-native-dotenv';

dotenv.config(); // Load environment variables

// import firebase from '@react-native-firebase/app';
// import database from '@react-native-firebase/database';

// if (!firebase.apps.length) {
//     firebase.initializeApp({
//         apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
//         authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
//         projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
//         storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
//         messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
//         appId: process.env.REACT_APP_FIREBASE_APP_ID,
//     });
// }


import { initializeApp } from '@react-native-firebase/app';
import { getDatabase } from '@react-native-firebase/database';

const firebaseConfig = {
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: process.env.FIREBASE_AUTH_DOMAIN,
    projectId: process.env.FIREBASE_PROJECT_ID,
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);

//initialize db

export const db = getDatabase(app);

