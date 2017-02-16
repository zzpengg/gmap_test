import React, { PropTypes } from 'react';
import {
  Text,
  Image,
  StyleSheet,
  View,
} from 'react-native';

import {
  Button,
} from 'native-base';

const defaultProps = {
  Comment: [],
};

const propTypes = {
  Comment: PropTypes.array
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
  dataView: {
    flexDirection: 'row',
    marginLeft: 10,
    marginTop: 10,
    marginRight: 10,
    borderRadius: 5,
    borderColor: 'gray',
    borderWidth: 5
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
  personImage: {
    width: 20,
    height: 20,
    marginTop: 5,
    marginLeft: 5,
    marginBottom: 5,
  },
  commentView: {
    marginTop: 5,
    marginLeft: 5,
    marginBottom: 5,
    borderColor: 'red',
    borderRadius: 2,
    borderWidth: 5,
    width: 350,
    alignSelf: 'center'
  }
});

const Comment = (props) => (
  <View style={styles.commentView}>
    <View style={{flexDirection: 'row'}}>
      <Image source={require('../assets/fuck_cat.jpg')} style={styles.personImage} />
      <View>
        <Text>{props.name}</Text>
        <Text>評分: {props.score}</Text>
        <Text>{props.content}</Text>
      </View>
    </View>
  </View>
);


Comment.propTypes = propTypes;
Comment.defaultProps = defaultProps;

export default Comment;
