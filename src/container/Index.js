/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import MapView from 'react-native-maps';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Navigator
} from 'react-native';

import Filter from './Filter.js';
import StudentRegister from './StudentRegister.js';
import LandlordRegistion from './LandlordRegistion.js';
import Comments from './Comments.js';
import Detail from './Detail.js';
import StudentSignin from './StudentSignin.js';
import LandlordSignin from './LandlordSignin.js';

export default class Index extends Component {

  constructor(props) {
    super(props);
    this.state = {
    }
  }

  _pressButton() {
    const { navigator } = this.props;
    //为什么这里可以取得 props.navigator?请看上文:
    //<Component {...route.params} navigator={navigator} />
    //这里传递了navigator作为props
    if(navigator) {
        navigator.push({
            name: 'Filter',
            component: Filter,
        })
    }
  }

  _pressButton2() {
    const { navigator } = this.props;
    //为什么这里可以取得 props.navigator?请看上文:
    //<Component {...route.params} navigator={navigator} />
    //这里传递了navigator作为props
    if(navigator) {
        navigator.push({
            name: 'LandlordSignin',
            component: LandlordSignin,
        })
    }
  }

  render() {
    // const { region } = this.props;
    //console.log(region);

   return (
     <View style={{ flex: 1 }}>
        <View style={[styles.center, { backgroundColor: 'cadetblue'}]}>
          <TouchableOpacity onPress={this._pressButton.bind(this)}>
            <Text style={{ color: '#fff', fontSize: 30  }}> 學生 </Text>
          </TouchableOpacity>
        </View>
        <View style={[styles.center, { backgroundColor: 'darksalmon' }]}>
          <TouchableOpacity onPress={this._pressButton2.bind(this)}>
            <Text style={{ color: '#fff', fontSize: 30 }}> 房東 </Text>
          </TouchableOpacity>
        </View>
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
