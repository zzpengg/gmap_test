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
  View,
  TouchableOpacity,
  Alert,
  Linking,
} from 'react-native';


export default class HouseDetail extends Component {
  constructor(props)
  {
    super(props)
    this.state={
        myLat: 24.0822996,
        myLon: 120.558216,
        lat: 0.00922,
        lon: 0.00421,
    }
  }
  navigate = () => {
  Alert.alert('前往地圖','立即前往', [
    { text: '確認', onPress: () => {
      //const url = `http://maps.google.com/maps/?q=@${this.state.myLat},${this.state.myLon}`;
      const url = `http://maps.google.com/maps/?daddr=國立彰化師範大學進德校區`;
      Linking.canOpenURL(url).then(supported => {
        if (supported) {
          Linking.openURL(url);
        }
      });
    } },
    { text: '取消', onPress: () => {} },
  ]);
}


  render() {
    // const { region } = this.props;
    //console.log(region);

   return (
     <View>
        <Text style={{fontSize: 30,alignItems: 'center',flexDirection:'row',backgroundColor:'lightgreen'}}>詳細資訊</Text>
        <TouchableOpacity
        onPress={this.navigate}>
        <Text style={{fontSize: 30,color:'white',backgroundColor:'skyblue'}}>
        查看地圖
        </Text>
        </TouchableOpacity>

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
