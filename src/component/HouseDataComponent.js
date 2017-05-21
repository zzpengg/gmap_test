import React, { PropTypes } from 'react';
import {
  Text,
  Image,
  StyleSheet,
  View,
  Dimensions,
  TouchableOpacity,
} from 'react-native';

import {
  Button,
} from 'native-base';

var {height, width} = Dimensions.get('window');

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
  slide: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: '#fff',
    fontSize: 25,
    fontWeight: 'bold'
  },
  topLeft: {
    padding: 30,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  topRight: {
    padding: 30,
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
  },
  bottomLeft: {
    padding: 30,
    justifyContent: 'flex-end',
    alignItems: 'flex-start',
  },
  bottomRight: {
    padding: 30,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },
  dataView: {
    flexDirection: 'row',
    marginLeft: 10,
    marginTop: 10,
    marginRight: 10,
    borderRadius: 5,
    borderColor: 'gray',
    borderWidth: 5,
    width: 360,
    height: 140,
  },
  imageText: {
    textAlign: 'center'
  },
  detailText: {
    marginTop: 5,
  },
  detailData: {
    alignSelf:'flex-end',
    flexDirection: 'row',
    width: 220,
    flex:1,
    justifyContent: 'flex-end'
  },
  updateModal: {
    backgroundColor: 'white',
    marginTop: 150,
    padding: 25,
    elevation: 8,
    borderRadius: 2,
    position: 'absolute',
    bottom: -5,
    left: width*0.025,
    width: width*0.95,

  },
  updateModalMask: {
    position: 'absolute',
    width: width,
    height: height,
    backgroundColor: 'rgba(0, 0, 0, 0.65)',
    top: 0,
    left: 0
  },
});

const HouseDataComponent = (props) => (
  <TouchableOpacity  key={props.index}
  onPress={ () => {
    props.nextPage(props.val.id);
  }} >
  <View style={styles.dataView} key={props.index}>
    <View>
      <Image source={require('../assets/house-icon.png')} style={{width:100, height:100, marginTop:10, marginLeft:5, marginBottom: 5 }} />
    </View>

    <View style={{marginTop:10, marginLeft: 10}} >
      <Text style={styles.detailText}>房屋名稱: {props.val.title}</Text>
      <Text style={styles.detailText}>所在區域: {props.val.area}</Text>
      <Text style={styles.detailText}>租金: {props.val.rent} /月</Text>
      <Text style={styles.detailText}>評分: {this.rankStar(props.val.score)}{props.val.score ? <Text>({props.val.score})</Text> : null}</Text>
    </View>
  </View>
  </TouchableOpacity>
)

export default HouseDataComponent;
