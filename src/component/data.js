import React, { PropTypes } from 'react';
import {
  Text,
  Image,
  StyleSheet,
  View,
} from 'react-native';

const defaultProps = {
  data: [],
};

const propTypes = {
  data: PropTypes.array
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: 200,
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
});

const Data = (props) => (
  <View style={{flexDirection: 'row'}}>
    <View>
      <Image source={require('../assets/fuck_cat.jpg')} style={{width:100, height:100 }}/>
    </View>

    <View>
      <Text>房屋名稱</Text>
      <Text>所在區域</Text>
      <Text>租金</Text>
      <Text>{props.name}</Text>
    </View>
  </View>
);


Data.propTypes = propTypes;
Data.defaultProps = defaultProps;

export default Data;
