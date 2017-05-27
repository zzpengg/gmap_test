import React, { PropTypes } from 'react';
import {
  Text,
  Image,
  StyleSheet,
  View,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import IconVec from 'react-native-vector-icons/FontAwesome';
import {
  Button,
  Icon,
} from 'native-base';

var {height, width} = Dimensions.get('window');


const UserData = (props) => (
  <View >
    <Button style={{backgroundColor: '#FFFFFF'}} block onPress={props.updateDataPage}>
      <View style={{flex: 1, justifyContent: 'space-between', flexDirection: 'row'}}>
        <Text style={{color: 'black', marginTop: 3}}>{props.title}</Text>
        <View style={{flexDirection: 'row'}}>
          <Text style={{color: 'black', marginRight: 5, marginTop: 3}}>{props.value}</Text>
          <Icon name="ios-arrow-forward" />
        </View>
      </View>
    </Button>
  </View>
)

export default UserData;
