/**
* Sample React Native App
* https://github.com/facebook/react-native
* @flow
*/

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  MapView,
  Image,
  ImagePickerIOS,
  View,
  TouchableHighlight,
  Button
} from 'react-native';

var Platform = require('react-native').Platform;
var ImagePicker = require('react-native-image-picker');

var options = {
  title: 'Select an option',
  takePhotoButtonTitle:'Take Photo..',
  chooseFromLibraryButtonTitle: 'Choose from Library..',
  mediaType: 'photo',
  allowsEditing: 'true',
  storageOptions: {
    skipBackup: true,
    path: 'images'
  }
};

var CameraRoll = React.createClass({
  getInitialState(){
    return({
      image : null,
      avatarSource : null
    });
  },

  photoUpdater(){
    ImagePicker.showImagePicker(options, (response)  => {
      // Same code as in above section!
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled image picker');
      }
      else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      }
      else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      }
      else {
        // You can display the image using either data...
        const source = {uri: 'data:image/jpeg;base64,' + response.data, isStatic: true};

        // // or a reference to the platform specific asset location
        // if (Platform.OS === 'ios') {
        //   const source = {uri: response.uri.replace('file://', ''), isStatic: true};
        // } else {
        //   const source = {uri: response.uri, isStatic: true};
        // }

        this.setState({
          avatarSource: source.uri
        });
      }
    });
  },
  render(){
    return (
      <View style = {styles.container}>
        <Button
        onPress={this.photoUpdater}
        title="Update your profile picture"
        color="#841584"
        accessibilityLabel="Update your profile picture"
        />

        {this.state.avatarSource?
          <Image style={{ flex: 1 }} source={{ uri: this.state.avatarSource }} /> :
          null
        }
      </View>

    );
  }
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'stretch',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  maps:{
    flex: 2,
    marginTop : 30
  },
  textWrapper:{
    flex:1,
    alignItems:'center'
  },
  text : {
    fontSize : 30
  },
  button: {
    textAlign: 'center',
    color: '#ffffff',
    marginBottom: 7,
    borderRadius: 2,
    borderWidth : 2
  }
});
AppRegistry.registerComponent('MapsReact', () => CameraRoll);
