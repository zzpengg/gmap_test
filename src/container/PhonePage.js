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
  Alert,
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
  Item,
} from 'native-base';
import { Loading } from '../component/Loading'


export default class PhonePage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      accessToken: this.props.accessToken,
      phone: this.props.phone,
    }
  }

  prePage() {
    const { navigator } = this.props;
    this.props.callBack();
    if(navigator) {
        navigator.pop();
    }
  }

  updateMyInfo = async() => {
    try {
      if(this.state.phone.length != 10 || isNaN(this.state.phone)==true ){
        Alert.alert('錯誤訊息',
          '格式錯誤',
          [
            {text:'我知道了',onPress:()=>{}}
          ]
        );
      }else{
      let url = Config.backend_url + 'user/updateMyPhone';
      let response = await fetch(url, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'x-access-token': this.state.accessToken,
        },
        body: JSON.stringify({
          phone: this.state.phone,
        })
      }).then( (data) => data.json() )
      console.log("pressed");
      console.log(response);
      if(response.text === 'updateMyInfo success'){
        //Handle success
        //On success we will store the access_token in the AsyncStorage
        this.setState({error: 'success'});
        Alert.alert('訊息',
          '修改成功',
          [
            {text:'我知道了',onPress:()=>{this.prePage()}}
          ]
        );
      } else {
            //Handle error
            let error = res;
            throw error;
      }
    }} catch(error){
      let str=""+error;
      Alert.alert('錯誤訊息',
      str,
      [
        {text:'我知道了',onPress:()=>{}}
      ]
    );
      console.log("error " + error);
    }
  }

  check = (phone) => {
    if(phone.length > 10){
      Alert.alert('錯誤訊息', '超過十碼',
        [
          {text:'我知道了',onPress:()=>{
            let newPhone = phone.slice(0, 10);
            this.setState({ phone: newPhone})}
          }
        ]
      );
    }else{
      this.setState({
        phone
      })
    }
  }


  render() {
    return (
      <View style={styles.container}>
        <Header style={{backgroundColor: "rgb(122, 68, 37)"}}>
          <Button transparent onPress={this.prePage.bind(this)}>
            <Icon name='ios-arrow-back' />
          </Button>
          <Title>電話</Title>
        </Header>
        <Content>
          <View style={{flex: 1, flexDirection: 'row'}}>
            <Input style={{borderRadius: 0.75, borderColor: 'black', borderWidth: 1, marginTop: 15, marginLeft: 5, marginRight: 5}}
              value={this.state.phone}
              onChangeText={(phone) => this.check(phone)}
            />
            <Button style={{marginTop: 15}} onPress={this.updateMyInfo} block warning> 儲存 </Button>
          </View>
          <Text>{this.state.message}</Text>
        </Content>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fffbe2',
    flex: 1,
    justifyContent: 'center',
  },
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
