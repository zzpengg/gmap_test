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
  ScrollView,
  Image
} from 'react-native';
import Comment from '../component/Comment.js';

export default class Comments extends Component {
  render() {
    // const { region } = this.props;
    //console.log(region);
    var tmp_array = [
     { name: "彰師大", score: 3 ,content: '越叫福應層道定對絕常建白去件的頭她'+
     '主一直它記教為半做長我關：著到形入他道法間效像反。動起創中投自滿政不現樹！'+
     '人好代急區機長下同道；處越星地性大以散的會車臺我道還寶定苦的建不什？有城'+
     '機遠取然，提有發年。發樣麼。樣程給式緊這界流聲！能數的應司往見保爭南子：來四母我只受久美一。'},
     { name: "煞氣A", score: 1,content: '越叫福應層道定對絕常建白去件的頭她'+
     '主一直它記教為半做長我關：著到形入他道法間效像反。動起創中投自滿政不現樹！'+
     '人好代急區機長下同道；處越星地性大以散的會車臺我道還寶定苦的建不什？有城'+
     '機遠取然，提有發年。發樣麼。樣程給式緊這界流聲！能數的應司往見保爭南子：來四母我只受久美一。'},
     { name: "霸氣B", score: 5,content: '越叫福應層道定對絕常建白去件的頭她'+
     '主一直它記教為半做長我關：著到形入他道法間效像反。動起創中投自滿政不現樹！'+
     '人好代急區機長下同道；處越星地性大以散的會車臺我道還寶定苦的建不什？有城'+
     '機遠取然，提有發年。發樣麼。樣程給式緊這界流聲！能數的應司往見保爭南子：來四母我只受久美一。' }
    ];
    return (
      <View>
        <ScrollView>
          <Text style={styles.houseTitle}>房屋名稱: </Text>
          <Image source={require('../assets/house.jpg')} style={styles.houseImage} />
          {
            tmp_array.map(function(val, index){
              return (<Comment key={index+2} name={val.name} content={val.content} score={val.score}/>)
            })
          }

        </ScrollView>
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
  houseTitle: {
    marginTop: 10,
    marginLeft: 10,

  },
  houseImage: {
    width: 300,
    height: 100,
    marginTop: 5,
    marginLeft: 5,
    marginBottom: 5,
    alignSelf: 'center'
  },
});
