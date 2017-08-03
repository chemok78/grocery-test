'use strict';

import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import * as firebase from 'firebase';
const StatusBar = require('./components/StatusBar');
const ActionButton = require('./components/ActionButton');
const ListItem = require('./components/ListItem');
const styles = require('./styles.js');

const {
  AppRegistry,
  ListView,
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  AlertIOS,
} = ReactNative;

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

  constructor(props){
    super(props);
    //ListView.DataSource, which is a class that provides efficient data processing to a ListView component.
    this.state = {
      dataSource: new ListView.DataSource({
        rowHasChange: (row1, row2) => row1 !== row2,
      })
    };
    //get firebase reference in initialState
    this.itemsRef = this.getRef().child('items');
  }

  getRef(){
    return firebaseApp.database().ref();
  }

  _renderItem(item){

   const onPress = () => {
      AlertIOS.alert(
        'Complete',
        null,
        [
          {text: 'Complete', onPress: (text) => this.itemsRef.child(item._key).remove()},
          {text: 'Cancel', onPress: (text) => console.log('Cancel')}
        ],
        'default'
      );
    };

    return(
      <ListItem item={item} onPress={onPress}/>
    )
  }

  listenForItems(itemsRef){
  //create a firebase listener
  //fired first time + value changes
    itemsRef.on('value', (snap)=>{

        //get children as an array
        var items = [];
        snap.forEach((child)=>{
          items.push({
            title: child.val().title,
            _key: child.key()
          })
        })

        this.setState({
        //set datasource in state
        //The cloneWithRows() function is just a convenience method for creating a new ListView.DataSource based on the same DataSource previously defined.
          dataSource: this.state.dataSource.cloneWithRows(items)
        })

    })
  }

    _addItem() {
    AlertIOS.alert(
      'Add New Item',
      null,
      [
        {
          text: 'Add',
          onPress: (text) => {
            this.itemsRef.push({ title: text })
          }
        },
      ],
      'plain-text'
    );
  }

  componentDidMount(){
    this.listenForItems(this.itemsRef);
  }

  render() {
    return (
      <View style={styles.container}>
          <StatusBar title="Grocery List"/>
          <ListView
            dataSource={this.state.dataSource}
            renderRow={this._renderItem.bind(this)}
            enableEmptySections={true}
            style={styles.listview}
          />
          <ActionButton title="Add" onPress={this._addItem.bind(this)}/>
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
