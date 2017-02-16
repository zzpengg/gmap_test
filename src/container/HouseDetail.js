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
  Button
} from 'react-native';


export default class HouseDetail extends Component {
  constructor(props)
  {
    super(props)

  }
  navigate = () => {
  Alert.alert('選擇出發地點','進德校區,寶山校區', [
    { text: '進德校區', onPress: () => {
      //const url = `http://maps.google.com/maps/?q=@${this.state.myLat},${this.state.myLon}`;
      const url = `http://maps.google.com/maps/?saddr=國立彰化師範大學進德校區&daddr=國立彰化師範大學寶山校區`;
      Linking.canOpenURL(url).then(supported => {
        if (supported) {
          Linking.openURL(url);
        }
      });
    } },
    {
      text: '寶山校區',onPress:()=>{
        const url = `http://maps.google.com/maps/?saddr=國立彰化師範大學寶山校區`;
        Linking.canOpenURL(url).then(supported => {
          if (supported) {
            Linking.openURL(url);
          }
        });
      }},
    { text: '取消', onPress: () => {} },
  ]);
}


  render() {
    // const { region } = this.props;
    //console.log(region);

   return (
     <View style={{flexDirection:'column',flex:1,backgroundColor:'lightgreen'}}>
        <Text style={{fontSize: 30,alignItems: 'center',textAlign:'center'}}>
        詳細資訊
        </Text>
        <Button onPress={this.navigate}
        title='查看地圖'
        color="#841584"
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
