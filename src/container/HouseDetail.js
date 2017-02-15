/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import MapView from 'react-native-maps';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';


export default class Filter extends Component {
  constructor(props)
  {
    super(props)
    this.state={
      region: {
        latitude: 24.0822996,
        longitude: 120.558216,
        latitudeDelta: 0.00922,
        longitudeDelta: 0.00421,
      }
    }
  }


  render() {
    // const { region } = this.props;
    //console.log(region);

   return (
     <View>
        <Text style={{fontSize: 30,alignItems: 'center'}}>詳細資訊</Text>
        <MapView
        style={{height: 200, margin: 40}}
        showsUserLocation={true}
        region={this.state.region}
        />
     </View>
   );
  }
}

const styles = StyleSheet.create({
  container: {
   ...StyleSheet.absoluteFillObject,
   height: 400,
   width: 400,
   justifyContent: 'flex-end',
   alignItems: 'center',
 },
 map: {
   ...StyleSheet.absoluteFillObject,
 },
 center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
