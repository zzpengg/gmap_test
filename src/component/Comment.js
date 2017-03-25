import React, { PropTypes } from 'react';
import {
  Text,
  Image,
  StyleSheet,
  View,
  TouchableOpacity,
} from 'react-native';

import {
  Button,
} from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome';

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
    width: 35,
    height: 35,
    marginTop: 5,
    marginLeft: 5,
    marginBottom: 5,
    borderRadius: 10,
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
  },
  hr: {
    flex: 1,
    borderBottomWidth: 1,
    borderColor: 'gray',
    marginTop: 15,
    marginBottom: 15,
    marginLeft: 5,
    marginRight: 5,
  },
});

const Comment = (props) => (
  <View style={styles.commentView}>
    <View style={{flexDirection: 'row'}}>
      <Image source={require('../assets/fuck_cat.jpg')} style={styles.personImage} />
      <View style={{width: 300}}>
        <View style={{flexDirection: 'row'}}>
          <Text style={{fontWeight: 'bold', color: 'black'}}>{props.name}  </Text>
          <Text>{props.time}</Text>
        </View>
        <Text>評分: {props.score}</Text>
        <Text style={{fontWeight: 'bold', color: 'black'}}>{props.content}</Text>
        <View style={{flexDirection: 'row', alignSelf: 'flex-end', marginTop: 10}}>
          <TouchableOpacity onPress={props.thumbs_up}>
            <View style={{flexDirection: 'row'}}>
              <Icon name="thumbs-up" />
              <Text>讚{props.like}</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={props.thumbs_down}>
            <View style={{flexDirection: 'row'}}>
              <Icon name="thumbs-down" />
              <Text>爛{props.dislike}</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  </View>
);


Comment.propTypes = propTypes;
Comment.defaultProps = defaultProps;

export default Comment;
