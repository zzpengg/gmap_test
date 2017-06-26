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
    alignSelf: 'flex-end',
    flexDirection: 'row',
    width: 220,
    flex: 1,
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

rankStar = (rank) => {
  const star = [];
  for (let i = rank; i > 0; i--) {
    if (i >= 1) {
      star.push(
        <Icon
          key={i}
          style={{ marginRight: 5 }}
          name={'star'}
          size={15}
          color={'gold'}
        />
      );
    } else if (i < 1 && i >= 0.5) {
      star.push(
        <Icon
          key={'tail'}
          style={{ marginRight: 5 }}
          name={'star-half'}
          size={15}
          color={'gold'}
        />
      );
    }
  }
  if (rank == 0) {
    return <Text>暫無評分</Text>
  }
  return star;
};

const Comment = (props) => (

  <View style={styles.commentView}>
    <View style={styles.hr}></View>
    <View style={{ flexDirection: 'row' }}>
      {
        (props.avatar == null && props.star == null) ?
          <Image source={require('../assets/landlord-icon.png')} style={styles.personImage} />
          :
          (props.avatar == null && props.star != null) ?
            <Image source={require('../assets/student-icon.png')} style={styles.personImage} />
            :
            (props.avatar.length < 50 && props.star != null) ?
              <Image source={{ uri: `http://ncuerent.ddns.net:1337/images/avatar/student/${props.userId}/${props.avatar}` }} style={styles.personImage} />
              :
              (props.avatar.length < 50 && props.star == null) ?
                <Image source={{ uri: `http://ncuerent.ddns.net:1337/images/avatar/user/${props.userId}/${props.avatar}` }} style={styles.personImage} />
                :
                <Image source={{ uri: props.avatar }} style={styles.personImage} />
      }
      <View style={{ width: 300 }}>
        <View style={{ flexDirection: 'row' }}>
          <Text style={{ fontWeight: 'bold', color: 'black' }}>{props.name}  </Text>
          <Text>{props.time}</Text>
        </View>
        {
          props.star != null ?
            <Text>評分: {this.rankStar(props.star)}</Text>
            :
            <Text>房東回復</Text>
        }
        <Text style={{ fontWeight: 'bold', color: 'black' }}>{props.content}</Text>
        <View style={{ flexDirection: 'row', alignSelf: 'flex-end', marginTop: 10 }}>
          <TouchableOpacity onPress={props.thumbs_up}>
            <View style={{ flexDirection: 'row', marginRight: 10, backgroundColor: '#DDDDDD', height: 23 }}>
              <Icon name="thumbs-up" style={{ fontSize: 17, marginRight: 5 }} color={'#AAAAAA'} />
              <Text>{props.like}</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={props.thumbs_down}>
            <View style={{ flexDirection: 'row', backgroundColor: '#DDDDDD', height: 23 }}>
              <Icon name="thumbs-down" style={{ fontSize: 17, marginRight: 5 }} color={'#AAAAAA'} />
              <Text>{props.dislike}</Text>
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
