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
  Image,
  ScrollView,
} from 'react-native';
import {
  Header,
  Content,
  Title,
  Icon,
  Button,
} from 'native-base';

import Dimensions from 'Dimensions';
const windowSize = Dimensions.get('window');

import UpdateHouseData from './UpdateHouseData.js';

export default class HouseDetail extends Component {
  constructor(props)
  {
    super(props)
  }

  prePage() {
      const { navigator } = this.props;
      if(navigator) {
          navigator.pop();
      }
  }

  nextPage() {
    const { navigator, title, area, rent, score, vacancy, type, waterandelec } = this.props;
    //为什么这里可以取得 props.navigator?请看上文:
    //<Component {...route.params} navigator={navigator} />
    //这里传递了navigator作为props
    console.log("next page pressed");
    if(navigator) {
        navigator.push({
            name: 'UpdateHouseData',
            component: UpdateHouseData,
            params: {
              title: title,
              area: area,
              rent: rent,
              score: score,
              vacancy: vacancy,
              waterandelec: waterandelec,
              type: type,
            }
        })
    }
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

  gmap = () => {
    const imgWidth = parseInt(windowSize.width/5*4);
    const imgHeight = parseInt(imgWidth / 16.0 * 9.0, 10);

    return (
      <TouchableOpacity  style={{flex: 1, paddingTop: 20,alignItems:'center' }} onPress={this.navigate}>
        <Image
          resizeMode="cover"
          source={{
            uri: `https://maps.googleapis.com/maps/api/staticmap?center=彰化市旭光路26號&zoom=16.85&size=${imgWidth}x${imgHeight}&scale=8&language=zh-tw&markers=size:mid%7Ccolor:blue%7C彰化市旭光路26號&key=AIzaSyBiwSQUTr6brsJoPHcliZ3TVFYgYf7ulbw` }}
          style={{
            width: imgWidth,
            height: imgHeight,
          }}
        />
      </TouchableOpacity>
    );
  }

  render() {
    // const { region } = this.props;
    //console.log(region);

   return (
     <ScrollView style={{flexDirection:'column',flex:1}}>
       <Header style={{backgroundColor: "rgb(122, 68, 37)"}}>
         <Button transparent onPress={this.prePage.bind(this)}>
           <Icon name='ios-arrow-back' />
         </Button>
         <Title>房屋資訊</Title>
       </Header>
        <Image source={require('../assets/house.jpg')} style={{width:300, height:100, marginTop: 10, alignSelf: 'center' }} />
        <Text style={styles.detailText}>房屋名稱: {this.props.title}</Text>
        <Text style={styles.detailText}>所在區域: {this.props.area}</Text>
        <Text style={styles.detailText}>租金:  {this.props.rent}/月</Text>
        <Button success bordered style={{height: 18}} onPress={this.nextPage.bind(this)}>
            <Text>詳細資料</Text>
        </Button>
        {this.gmap()}
        <Text style={styles.detailText}>評價: {this.props.score}</Text>
        <Text style={styles.detailText}>連絡房東: </Text>

     </ScrollView>
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
  detailText: {
    marginTop: 5,
    marginLeft: 30,
  },
});
