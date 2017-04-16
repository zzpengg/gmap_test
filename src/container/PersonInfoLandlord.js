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
  AsyncStorage,
  Image,
  Modal,
  Alert,
} from 'react-native';
import {
  Container,
  Content,
  Picker,
  Item,
  Header,
  Button,
  Icon,
  Title,
  List,
  ListItem,
  InputGroup,
  Input,
  Spinner,
} from 'native-base';

import HouseDetailStudent from './HouseDetailStudent.js';
import StudentRegister from './StudentRegister.js';
import HouseComment from './HouseComment.js';

const ACCESS_TOKEN = 'access_token';

export default class PersonInfoLandlord extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      account: "",
      status: "",
      password: "",
      accessToken: this.props.accessToken,
      error: "",
      visiable:true,
    }
    this.getMyInfo = this.getMyInfo.bind(this);
    this.getMyInfo();
  }

  prePage() {
      const { navigator } = this.props;
      if(navigator) {
          navigator.pop();
      }
  }

  async deleteToken() {
    try {
        await AsyncStorage.removeItem(ACCESS_TOKEN)
    } catch(error) {
        console.log("Something went wrong");
    }
  }

  onLogout(){
    this.deleteToken();
    this.setState({
      error: 'logout'
    })
  }

  async getMyInfo(token) {
    try{
      let token = this.state.accessToken;
      let url = 'http://test-zzpengg.c9users.io:8080/user/getMyInfo';
      let response = await fetch(url, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'x-access-token': token,
        }
      }).then( (data) => data.json() )
      .catch( (err) => console.log(err) )
      console.log("getMyInfo");
      console.log("response");
      console.log(response);

      console.log(response.data.avatar);
      await this.setState({
        name: response.data.name,
        account: response.data.account,
        password: response.data.password,
        avatar: response.data.avatar,
        visible: false,
      })
      return response.text;
    }catch(error){
      console.log("catch error = " + error);
      return error;
    }
  }

  updateMyInfo = async() => {
    try {
      let url = 'http://test-zzpengg.c9users.io:8080/user/updateMyInfo';
      let response = await fetch(url, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'x-access-token': this.state.accessToken,
        },
        body: JSON.stringify({
          name: this.state.name,
          password: this.state.password,
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
            {text:'我知道了',onPress:()=>{}}
          ]
        );
      } else {
            //Handle error
            let error = res;
            throw error;
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
       <Modal
       visible={this.state.visible}
       animationType={"slide"}
       onRequestClose={() => {}}
       >
         <View style={{flex: 1,  flexDirection: 'column',justifyContent: 'center',alignItems: 'center'}}>
           <View >
             <Text>載入中...</Text>
             <Spinner color='blue'/>
           </View>
         </View>
       </Modal>
       <Header style={{backgroundColor: "rgb(122, 68, 37)"}}>
         <Button transparent onPress={this.prePage.bind(this)}>
           <Icon name='ios-arrow-back' />
         </Button>
         <Title>個人資料</Title>
       </Header>
         <Content>
         <View style={styles.loginform}>
           <View>
             {
               this.state.avatar == null ?
               <Image source={require('../assets/fuck_cat.jpg')} style={styles.personImage} />
               :
               this.state.avatar.length < 50 ?
               <Image source={{uri: `https://test-zzpengg.c9users.io:8080/images/${this.state.avatar}`}} style={styles.personImage} />
               :
               <Image source={{uri: this.state.avatar}} style={styles.personImage} />
             }
             <View style={{alignSelf: 'center'}}>
               <Text style={{fontSize: 32}}>{this.state.account}</Text>
             </View>
             <View style={{alignSelf: 'center', flexDirection: 'row'}}>
               <Text style={{paddingTop:13, paddingLeft: 30, fontSize: 15, color: '#7b7d85'}}>名字</Text>
               <Input style={{borderColor: 'red', borderWidth: 5, marginLeft: 15}} onChangeText={ (name) => this.setState({ name: name }) } value={this.state.name}></Input>
             </View>
             <View style={{alignSelf: 'center', flexDirection: 'row'}}>
               <Text style={{paddingTop:13, paddingLeft: 30, fontSize: 15, color: '#7b7d85'}}>密碼</Text>
               <Input style={{borderColor: 'red', borderWidth: 5, marginLeft: 15}} onChangeText={ (password) => this.setState({ password: password }) } value={this.state.password}></Input>
             </View>
            </View>
            <Button style={styles.submitBtn}  onPress={this.updateMyInfo} block warning> 確認送出 </Button>
          </View>

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
  footerItem: {
    flex: 1,
    marginRight: 10,
    marginLeft: 10,
  },
  disabledBtn: {
    backgroundColor: 'rgb(255, 201, 150)',
    elevation: 0,
  },
  spinner: {
    height: 38,
    width: 38,
    borderRadius: 100,
    backgroundColor: 'white',
    elevation: 2,
    position: 'absolute',
    top: 85,
    left: 38 / 2 - 19,
  },
  floatingBtn: {
    position: 'absolute',
    bottom: 23,
    right: 18,
    borderRadius: 100,
    width: 58,
    height: 58,
  },
  form: {
    marginTop: 50,
    marginLeft: 20,
    marginRight: 20,
    padding: 20,
    paddingTop: 30,
    paddingRight: 33,
    paddingBottom: 28,
    backgroundColor: 'rgba(255, 255, 255, 0.85)',
    borderRadius: 5,
    elevation: 2,
  },
  loginform: {
    marginTop: 20,
    marginLeft: 20,
    marginRight: 20,
    padding: 20,
    paddingTop: 30,
    paddingRight: 33,
    paddingBottom: 28,
    backgroundColor: 'rgba(255, 255, 255, 0.85)',
    borderRadius: 5,
    elevation: 2,
  },
  title: {
    height: 40,
  },
  titleText: {
    position: 'absolute',
    top: -10,
    left: 50,
    fontSize: 54,
    zIndex: 1000,
    elevation: 2,
    color: 'rgb(55, 27, 8)',
  },
  submitBtn: {
    elevation: 1,
    marginLeft: 18,
    marginRight: 18,
    marginTop: 20,
  },
  hr: {
    flex: 1,
    borderBottomWidth: 1,
    borderColor: 'gray',
    marginTop: 15,
    marginBottom: 15,
    width: 230,
    marginRight: -18,
  },
  orText: {
    textAlign: 'center',
    fontSize: 18,
  },
  orWrapper: {
    // backgroundColor: 'rgba(255, 255, 255, 0.54)',
    transform: [
      {translateY: 23},
    ],
    width: 25,
    height: 25,
    zIndex: 10000,
    padding: 2,
    paddingLeft: 4,
  },
  bgImg: {
    width:38,
    height:38,
    position: 'absolute',
    top: 0,
    left: 0,
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
    width: 200,
    height: 180,
    marginTop: 5,
    marginLeft: 5,
    marginBottom: 5,
    alignSelf: 'center',
  },
  commentView: {
    marginTop: 30,
    marginLeft: 5,
    marginBottom: 5,
    borderColor: 'red',
    borderRadius: 2,
    borderWidth: 5,
    width: 350,
    alignSelf: 'center'
  },
  logoutBtn: {
    marginLeft: 10,
    marginTop: 10,
    alignSelf: 'center',
    width: 300,
  }
});
