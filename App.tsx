import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import RootNavigator from "./navigation/RootNavigator";
import firebase from "firebase/compat";
import initializeApp = firebase.initializeApp;
import 'react-native-gesture-handler'
import { initializeAuth, getAuth, getReactNativePersistence } from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';


const firebaseConfig = {
    apiKey: "AIzaSyBjKHcGdqMwAoKqnHGWG_X4UkBQkljiSXA",
    authDomain: "eventman-29ead.firebaseapp.com",
    databaseURL: "https://eventman-29ead-default-rtdb.firebaseio.com",
    projectId: "eventman-29ead",
    storageBucket: "eventman-29ead.appspot.com",
    messagingSenderId: "461098477274",
    appId: "1:461098477274:web:161d9e12641591a31267e3",
};

const app =  initializeApp(firebaseConfig);

const  auth = initializeAuth(app, {
    persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});

const App: React.FC = () => {
  return (
      <NavigationContainer>
        <RootNavigator/>
      </NavigationContainer>
  );
};

export default App;
