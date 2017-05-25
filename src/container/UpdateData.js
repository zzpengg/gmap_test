/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  TouchableOpacity,
  Modal,
} from 'react-native';
import {
  Header,
  Content,
  Button,
  Icon,
  Title,
  Spinner,
  InputGroup,
  Input,
} from 'native-base';
import { Loading } from '../component/Loading'
import HouseDetail from './HouseDetail.js';
import CreateHouseData from './CreateHouseData.js';

import HouseDataComponent from '../component/HouseDataComponent.js';

export default class UpdateData extends Component {

  constructor(props) {
    super(props);
    this.state = {
      data: [],
      loading: true,
      accessToken: this.props.accessToken,
      visible:true,
    }
    this.loadHouse = this.loadHouse.bind(this);
    this.loadHouse();
  }

  prePage() {
    this.props.callBack();
    const { navigator } = this.props;
    if(navigator) {
        navigator.pop();
    }
  }

  loadHouse = async () => {
    try {
      const url = 'http://test-zzpengg.c9users.io:8080/house/findMyHouse'
      let res = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'x-access-token': this.state.accessToken,
        },
      }).then((data) => data.json())
        .catch((e) => console.log(e));

      console.log(res);
      this.setState({
        data: res.data,
        loading: false,
        visible:false,
      })

    } catch (errors) {
      console.log(errors);
    }
  }

  callBack = () => {
    this.loadHouse();
  }

  HouseDetailStudentPage = (id) => {
    const { navigator } = this.props;
    console.log("id = " + id);
    if(navigator){
      navigator.push({
        name: 'HouseDetail',
        component: HouseDetail,
        params: {
          id: id,
        }
      })
    }
  }


  render() {

    const { navigator } = this.props;
    return (
      <View>
      <Loading label="載入中..." visible={this.state.visible}/>
        <Header style={{backgroundColor: "rgb(122, 68, 37)"}}>
          <Button transparent onPress={this.prePage.bind(this)}>
            <Icon name='ios-arrow-back' />
          </Button>
          <Title>名字</Title>
        </Header>
        <View style={{flex: 1,justifyContent: 'center',alignItems: 'center'}}>
          <InputGroup borderType="regular" style={{ borderRadius: 5 }} >
            <Icon name="ios-person" />
            <Input onChangeText={(account) => {this.setState({account})}} />
          </InputGroup>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  modalcontainer: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.5)'
  },
  innerContainer: {
    borderRadius: 10,
    alignItems: 'center',
    backgroundColor: '#fff', padding: 20
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
  }
});
