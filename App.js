'use strict';

import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import * as firebase from 'firebase';

const config = {
    apiKey: "AIzaSyBNskFUv1yEXfzxcawCkDOcWQAcvf-v5ug",
    authDomain: "groceryapp-c937f.firebaseapp.com",
    databaseURL: "https://groceryapp-c937f.firebaseio.com",
    projectId: "groceryapp-c937f",
    storageBucket: "groceryapp-c937f.appspot.com",
    messagingSenderId: "394694840362"
  };

const firebaseApp = firebase.initializeApp(config);

export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>Open up App.js to start working on your app!</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
