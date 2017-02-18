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
  DataCard: [],
};

const propTypes = {
  DataCard: PropTypes.array
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
  }
});

const DataCard = (props) => (
  <View style={styles.dataView}>
    <View>
      <Image source={require('../assets/fuck_cat.jpg')} style={{width:100, height:100, marginTop:5, marginLeft:5, marginBottom: 5 }} />
      <Text style={styles.imageText}>更改圖片</Text>
    </View>

    <View style={{marginTop:10, marginLeft: 10}} >
      <Text style={styles.detailText}>房屋名稱: {props.title}</Text>
      <Text style={styles.detailText}>所在區域: {props.area}</Text>
      <Text style={styles.detailText}>租金: {props.rent} /月</Text>
      <Text style={styles.detailText}>評分: {props.score}</Text>
      <View style={styles.detailData}>
        <Button success bordered style={{height: 18}}>
            <Text>詳細資料</Text>
        </Button>
      </View>
    </View>
  </View>
);


DataCard.propTypes = propTypes;
DataCard.defaultProps = defaultProps;

export default DataCard;
