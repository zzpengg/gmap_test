/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Navigator,
  BackAndroid,
  AppState,
  ToastAndroid,
  NetInfo,
  Alert,
  Linking,
  NativeModules
} from 'react-native';

import HouseDataStudent from './HouseDataStudent.js';
import LandlordSignin from './LandlordSignin.js';

export default class Index extends Component {

  constructor(props) {
    super(props);
    this.state = {}
  }

  async componentDidMount(){
    await BackAndroid.addEventListener('hardwareBackPress', this.onBackAndroid);
    console.disableYellowBox = true;
    console.warn('YellowBox is disabled.');
    NetInfo.addEventListener(
        'change',
        this.handleConnectionInfoChange
    );
  }
  async componentWillUnmount() {
    await BackAndroid.removeEventListener('hardwareBackPress', this.onBackAndroid);
     NetInfo.removeEventListener(
        'change',
        this.handleConnectionInfoChange
    );
  }

  onBackAndroid = async() => {
    const nav = this.props.navigator;
    const routers = nav.getCurrentRoutes();
    const now = Date.now();

    if(!nav)
      return false
    if(routers.length > 1){
      nav.pop();
      return true;
    }

    if (now - this.lastBackPressed < 1500)
      BackAndroid.exitApp();
    else {
      this.lastBackPressed = now;
      ToastAndroid.show('再按一次退出', 1000);
    }
    return true
  }
  handleConnectionInfoChange = async (connectionInfo) => {
    console.log("connectionInfo="+connectionInfo);
    if(connectionInfo=="NONE"){
      Alert.alert("網路錯誤","網路未連接",[
        { text:"開啟網路", onPress: ()=>{ NativeModules.OpenSettings.openNetworkSettings(data => {
          console.log('call back data', data);
        });}},
          { text:"取消", onPress: () => {}},  
      ]
      )
    }
  }
  studentButton() {
    const { navigator } = this.props;
    if(navigator) {
      navigator.push({
          name: 'HouseDataStudent',
          component: HouseDataStudent,
          initroute: true
      })
    }
  }

  landlordButton() {
    const { navigator } = this.props;
    if(navigator) {
        navigator.push({
            name: 'LandlordSignin',
            component: LandlordSignin,
            initroute: true
        })
    }
  }

  render(){
    // const { region } = this.props;
    //console.log(region);
    return (
      <View style = {{ flex: 1 }}>

        <View style = {styles.center1}>
          <TouchableOpacity onPress = {this.studentButton.bind(this)}>
            <Text style = {styles.text}> 學生入口 </Text>
          </TouchableOpacity>
        </View>

        <View style = {styles.center2}>
          <TouchableOpacity onPress = {this.landlordButton.bind(this)}>
            <Text style = {styles.text}> 房東入口 </Text>
          </TouchableOpacity>
        </View>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  center1: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'cadetblue',
  },
  center2: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'darksalmon',
  },
  text: {
    color: '#fff',
    fontSize: 30,
  }
});
