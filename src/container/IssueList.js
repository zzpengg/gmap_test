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
  TextInput,
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

import Dimensions from 'Dimensions';
const windowSize = Dimensions.get('window');

export default class IssueList extends Component {

  constructor(props) {
    super(props);
    this.state = {
      accessToken: this.props.accessToken,
      issue: '',
    }
  }

  prePage() {
    const { navigator } = this.props;
    if(navigator) {
        navigator.pop();
    }
  }

  createIssue = async() => {
    try {
      if(this.state.issue.length == 0){
        Alert.alert(
          '錯誤訊息',
          '內容不得為空',
          [
            {text:'我知道了',onPress:()=>{}}
          ]
        );
      }else{
        let url = 'http://ncuerent.ddns.net:1337/issue/addIssue';
        let response = await fetch(url, {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'x-access-token': this.state.accessToken,
          },
          body: JSON.stringify({
            issue: this.state.issue,
          })
        }).then( (data) => data.json() )
        console.log("pressed");
        console.log(response);
        if(response.text === 'issue create success'){
          //Handle success
          //On success we will store the access_token in the AsyncStorage
          this.setState({error: 'success'});
          Alert.alert('訊息',
            '回報成功',
            [
              {text:'我知道了',onPress:()=>{this.setState({issue: ''})}}
            ]
          );
        }
      }
    } catch(error){
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


  render() {
    return (
      <View style={styles.container}>
        <Header style={{backgroundColor: "rgb(122, 68, 37)"}}>
          <Button transparent onPress={this.prePage.bind(this)}>
            <Icon name='ios-arrow-back' />
          </Button>
          <Title>問題回報</Title>
        </Header>
        <Content>
          <View style={styles.slide2}>
            <View>
              <TextInput
                style={{alignSelf:'center',width:windowSize.width/5*4,textAlignVertical: 'top',borderColor:'black',borderRadius:5,borderWidth:0.5,marginTop:5}}
                onChangeText={(issue) => this.setState({issue})}
                value={this.state.issue}
                editable = {true}
                numberOfLines = {4}
                multiline = {true}
                blurOnSubmit={true}
                placeholder="長度限定100字"
                maxLength={100}
              />
              <Text style={styles.houseTitle}> {this.state.issue.length}/100</Text>
            </View>
            <View style={{flexDirection: 'row', alignItems: 'flex-end',alignSelf:'center'}}>
              <Button style={styles.commentSubmitBtn} onPress={this.createIssue} > 確認送出 </Button>
            </View>
          </View>
        </Content>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  commentSubmitBtn: {
    backgroundColor: 'blue',
  },
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
  },
  houseTitle: {
    marginTop: 10,
    marginLeft: 10,
    alignSelf:'center'
  },
});
