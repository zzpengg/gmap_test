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

import {
  Item,
  Header,
  Button,
  Icon,
  Title,
  List,
  ListItem,
  InputGroup,
  Input,
} from 'native-base';

import HouseDatas from './HouseDatas';

export default class StudentSignin extends Component {
  render() {
    // const { region } = this.props;
    //console.log(region);

   return (
      <Button onPress={ () => {
        const { navigator } = this.props;
        if(navigator){
          navigator.push({
            name: 'HouseDatas',
            component: HouseDatas
          })
        }
      }} >123</Button>
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
