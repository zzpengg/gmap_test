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
  TouchableOpacity,
  PixelRatio,
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
import { Loading } from '../component/Loading.js';
import HouseDetailStudent from './HouseDetailStudent.js';
import StudentRegister from './StudentRegister.js';
import HouseComment from './HouseComment.js';
import UpdateData from './UpdateData.js';
import ImagePicker from 'react-native-image-picker';
import { FBLoginManager } from 'react-native-facebook-login';
import LoveList from './LoveList.js';
import IssueList from './IssueList.js';
import UpdateAvatar from './UpdateAvatar.js';
import UserData from '../component/UserData.js';

const STUDENT_ACCESS_TOKEN = 'student_access_token';

export default class PersonInfoStudent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: '',
      name: "",
      account: "",
      status: "",
      password: "",
      accessToken: "",
      error: "",
      visible:true,
      upload: false,
      avatarSource: null,
    }
  }

  componentWillMount() {
    this.getToken();
  }

  getToken = async() => {
    try {
      let accessToken = await AsyncStorage.getItem(STUDENT_ACCESS_TOKEN);
      if(!accessToken) {
          console.log("not have token");
          this.setState({visible:false});
      } else {
          this.setState({accessToken: accessToken});
          console.log("accessToken = " + accessToken);
          let text = await this.getMyInfo(accessToken);
          console.log("text = " + text);
          if(text == 'getMyInfo success'){
            this.setState({error: 'success'});
            this.setState({visible: false});
            console.log('success');
          }
          else{
            console.log(text);
            this.setState({visible: false});
            this.setState({error: text});
          }

      }
    } catch(error) {
        console.log("catch error = " + error);
        this.setState({visible: false});
    }
  }

  prePage() {
      const { navigator } = this.props;
      if(navigator) {
          navigator.pop();
      }
  }

  storeToken(responseData){
    AsyncStorage.setItem(STUDENT_ACCESS_TOKEN, responseData, (err)=> {
      if(err){
        console.log("an error");
        throw err;
      }
      console.log("success");
    }).catch((err)=> {
        console.log("error is: " + err);
    });
  }

  async deleteToken() {
    try {
        await AsyncStorage.removeItem(STUDENT_ACCESS_TOKEN)
    } catch(error) {
        console.log("Something went wrong");
    }
  }

  onLogout(){
    FBLoginManager.logout( (data) => {console.log(data) });
    this.deleteToken();
    this.setState({
      error: 'logout'
    })
    console.log('callback called');
    this.prePage();
  }

  async getMyInfo(token) {
    try{
      let url = 'http://test-zzpengg.c9users.io:8080/student/getMyInfo';
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
      await this.setState({
        id: response.data.id,
        name: response.data.name,
        account: response.data.account,
        password: response.data.password,
        avatarSource: response.data.avatar
      })
      console.log(this.state.id + ' ' + this.state.avatarSource);
      return response.text;
    }catch(error){
      console.log("catch error = " + error);
      return error;
    }
  }

  onLoginPressed = async() => {
    try {
      let url = 'http://test-zzpengg.c9users.io:8080/student/login';
      let response = await fetch(url, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          account: this.state.account,
          password: this.state.password,
        })
      }).then( (data) => data.json() )
      console.log("pressed");
      console.log(response);
      this.setState({
        status: 'pressed'
      })
      if(response.text === 'login success'){
        //Handle success
        let accessToken = response.token;
        console.log(accessToken);
        //On success we will store the access_token in the AsyncStorage
        this.storeToken(accessToken);
        this.setState({accessToken: accessToken})
        this.setState({error: 'success'});
        this.getToken(accessToken);
      } else if(response.text=== "validate error"){
        Alert.alert('錯誤訊息',
          "信箱尚未驗證\n請至信箱驗證帳戶",
          [
            {text:'我知道了',onPress:()=>{}}
          ]
        );
      }
      else {
            //Handle error
            let error = response;
            throw error;
      }
    } catch(error){
      Alert.alert('錯誤訊息',
      "發生錯誤",
      [
        {text:'我知道了',onPress:()=>{}}
      ]
    );
      console.log("error " + error);
    }
  }

  nextPageRegister = () => {
    const { navigator } = this.props;
    navigator.push({
      name: 'StudentRegister',
      component: StudentRegister,
      params: {
        accessToken: this.state.accessToken
      }
    });
  }

  updateDataPage = () => {
    const { navigator } = this.props;
    navigator.push({
      name: 'UpdateData',
      component: UpdateData,
      params: {
        accessToken: this.state.accessToken,
        name: this.state.name
      }
    });
  }

  lovePage = () => {
    const { navigator } = this.props;
    navigator.push({
      name: 'LoveList',
      component: LoveList,
      params: {
        accessToken: this.state.accessToken,
      }
    });
  }

  issuePage = () => {
    const { navigator } = this.props;
    navigator.push({
      name: 'IssueList',
      component: IssueList,
      params: {
        accessToken: this.state.accessToken,
      }
    });
  }

  updateAvatarPage = () => {
    const { navigator } = this.props;
    navigator.push({
      name: 'UpdateAvatar',
      component: UpdateAvatar,
      params: {
        accessToken: this.state.accessToken,
      }
    });
  }

  render() {
   return (
     <View style={styles.container}>
     <Loading label="載入中..." visible={this.state.visible}/>
       <Header style={{backgroundColor: "rgb(122, 68, 37)"}}>
         <Button transparent onPress={this.prePage.bind(this)}>
           <Icon name='ios-arrow-back' />
         </Button>
         <Title>個人資料</Title>
       </Header>
       {
          (this.state.error != 'success') ?
          <Content>
          <List style={styles.form}>
           <ListItem style={{ marginTop: 15 }}>
             <InputGroup borderType="regular" style={{ borderRadius: 5 }} >
               <Icon name="ios-person" />
               <Input onChangeText={(account) => {this.setState({account})}} placeholder="帳號" />
             </InputGroup>
           </ListItem>
           <ListItem style={{ marginTop: 10 }}>
             <InputGroup borderType="regular" style={{ borderRadius: 5 }} >
               <Icon name="ios-unlock" />
               <Input onChangeText={(password) => {this.setState({password})}} placeholder="密碼" secureTextEntry={true}/>
             </InputGroup>
           </ListItem>
           <Button onPress={this.nextPageRegister} style={styles.submitBtn} block warning> 註冊 </Button>
           <View style={{ alignItems: 'center' }}>
             <View style={styles.orWrapper}>
               <Text style={styles.orText}>or</Text>
             </View>
             <View style={styles.hr} />
           </View>
           <Button style={styles.submitBtn} onPress={this.onLoginPressed} block info> 登入 </Button>
         </List>
         </Content>
         :
         <Content style={{backgroundColor: '#DDDDDD'}}>
          <TouchableOpacity onPress={this.updateAvatarPage}>
           <View style={{flex: 1, flexDirection: 'row', backgroundColor: 'white'}}>
             <View style={[styles.avatar, styles.avatarContainer, {marginBottom: 20}]}>
             {
               this.state.avatarSource == null ?
               <Image style={styles.avatar} source={require('../assets/student-icon.png')} /> :
               <Image style={styles.avatar} source={{uri: `http://test-zzpengg.c9users.io:8080/images/avatar/student/${this.state.id}`+'/'+`${this.state.avatarSource}`}} />
             }
             </View>
             <Text style={{marginTop: 40, fontSize: 20, marginLeft: 20}}>個人圖片</Text>
           </View>
           </TouchableOpacity>
           <View>
             <Button style={{backgroundColor: '#FFFFFF', }} block >
               <View style={{flex: 1, justifyContent: 'space-between', flexDirection: 'row'}}>
                 <Text style={{color: 'black', marginTop: 3}}>帳號</Text>
                 <View style={{flexDirection: 'row'}}>
                   <Text style={{color: 'black', marginRight: 5, marginTop: 3}}>{this.state.account}</Text>
                 </View>
               </View>
             </Button>
           </View>
           <UserData title="暱稱" value={this.state.name} updateDataPage={this.updateDataPage} />
           <UserData title="我的最愛" value="" updateDataPage={this.lovePage} />
           <UserData title="問題回報" value="" updateDataPage={this.issuePage} />
           <Button style={styles.submitBtn} onPress={this.onLogout.bind(this)} block info> 登出 </Button>
         </Content>
      }
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
  },
  avatar: {
    borderRadius: 75,
    width: 100,
    height: 100
  },
  avatarContainer: {
    borderColor: '#9B9B9B',
    borderWidth: 1 / PixelRatio.get(),
    justifyContent: 'center',
    alignItems: 'center'
  },
  viewFlexRow: {
    flexDirection: 'row'
  },
});
