import { initializeApp } from "firebase/app";
import { getReactNativePersistence, initializeAuth } from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyBPQFet22IAQ0OR2udXHhDyW-31GLNY6eI",
    authDomain: "fir-demoapp-d7135.firebaseapp.com",
    databaseURL: "https://fir-demoapp-d7135-default-rtdb.firebaseio.com",
    projectId: "fir-demoapp-d7135",
    storageBucket: "fir-demoapp-d7135.appspot.com",
    messagingSenderId: "106769452015",
    appId: "1:106769452015:web:66f3fdccad6792271b041a",
    measurementId: "G-H62LGL0B5Z"
};

const app = initializeApp(firebaseConfig);
export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});
export const db = getFirestore(app);