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
  View,
  TouchableOpacity,
  Navigator
} from 'react-native';

import Index from './src/container/Index.js';

export default class test extends Component {
  render() {
    // const { region } = this.props;
    //console.log(region);

    let defaultName = 'Index';
    let defaultComponent = Index;
    return (
    <Navigator
      initialRoute={{ name: defaultName, component: defaultComponent }}
      configureScene={(route) => {
        return (Navigator.SceneConfigs.PushFromRight);
      }}
      renderScene={(route, navigator) => {
        let Component = route.component;
        return <Component {...route.params} navigator={navigator} />
      }} />
    );
  }
}

AppRegistry.registerComponent('test', () => test);
