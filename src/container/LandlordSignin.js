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
  TouchableOpacity
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

import HouseData from './HouseData.js';
import LandlordRegistion from './LandlordRegistion.js';
import FBLoginView from'../component/FBLoginView'
import LandlordChooseRegister from './LandlordChooseRegister.js'
const ACCESS_TOKEN = 'access_token';
import {FBLogin, FBLoginManager} from 'react-native-facebook-login';
import {Loading} from '../component/Loading'
import IconVec from 'react-native-vector-icons/FontAwesome';
import PersonInfoLandlord from './PersonInfoLandlord.js';

export default class LandlordSignin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      account: "",
      status: "",
      password: "",
      accessToken: "",
      error: "",
      avatar: '',
      visible:true,
      loginloading:false
    }
  }

  componentWillMount() {
    this.getToken();
  }

  async getToken() {
    try {
      let accessToken = await AsyncStorage.getItem(ACCESS_TOKEN);
      if(!accessToken) {
          console.log("not have token");
          this.setState({
            visible: false,
            error: 'error',
            accessToken: '',
          });
      } else {
          console.log("accessToken = " + accessToken);
          let text = await this.checkAuth(accessToken);
          console.log("TExt = " + text);
          if(text==='check success'){
            this.setState({accessToken: accessToken})
            this.setState({error: 'success'});
          }
          else{
            this.setState({error: text});
          }

          console.log("nextpage");
      }
    } catch(error) {
        console.log("catch error = " + error);
    }
  }

  nextPage(){
    const { navigator } = this.props;
    navigator.push({
      name: 'HouseData',
      component: HouseData,
      params: {
        accessToken: this.state.accessToken,
        account:this.state.account,
        callBack: this.callback,
      }
    });
  }

  personPage() {
    const { navigator } = this.props;
    //为什么这里可以取得 props.navigator?请看上文:
    //<Component {...route.params} navigator={navigator} />
    //这里传递了navigator作为props
    console.log("person page pressed");
    if(navigator) {
        navigator.push({
            name: 'PersonInfoLandlord',
            component: PersonInfoLandlord,
            params: {
              accessToken: this.state.accessToken,
              callBack: this.callback,
            }
        })
    }
  }

  callback = async() => {
    console.log('i am callback');
    await this.getToken();
  }

  prePage() {
      const { navigator } = this.props;
      if(navigator) {
          navigator.pop();
      }
  }

  storeToken(responseData){
    AsyncStorage.setItem(ACCESS_TOKEN, responseData, (err)=> {
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
        await AsyncStorage.removeItem(ACCESS_TOKEN)
    } catch(error) {
        console.log("Something went wrong");
    }
  }

  onLogout(){
    this.deleteToken();
    this.setState({
      accessToken: ''
    })
    this.setState({
      error: 'logout'
    })
    FBLoginManager.logout( (data) => {console.log(data) });
  }

  async checkAuth(token) {
    try{
      let url = 'http://test-zzpengg.c9users.io:8080/user/islogin';
      let response = await fetch(url, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'x-access-token': token,
        }
      }).then( (data) => data.json() )
      console.log("checkAuth");
      console.log("response = " + response);
      console.log("name = " + response.name);
      this.setState({
        name: response.name,
        avatar: response.avatar,
        account: response.account,
        id:response.id
      })
      this.setState({visible:false});
      return response.text;
    }catch(error){
      console.log("catch error = " + error);
      this.setState({visible:false});
      return error;
    }
  }

  onLoginPressed = async() => {
    await this.setState({loginloading:true});
    try {
      let url = 'http://test-zzpengg.c9users.io:8080/user/login';
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
        this.setState({accessToken: accessToken,loginloading:false})
        this.setState({error: 'success'});
        this.nextPage();
      }
      else if(response.text=== "validate error"){
        this.setState({loginloading:false})
        Alert.alert('錯誤訊息',
          "信箱尚未驗證\n請至信箱驗證帳戶",
          [
            {text:'我知道了',onPress:()=>{}}
          ]
        );
      }
      else {
            //Handle error
            let error = res;
            throw error;
      }
    } catch(error){
      this.setState({loginloading:false})
      Alert.alert('錯誤訊息',
      "帳號或密碼輸入錯誤",
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
      name: 'LandlordChooseRegister',
      component: LandlordChooseRegister,
      params: {
        accessToken: this.state.accessToken,
      }
    });
  }

  onFBLogin = async(data) => {
    await this.setState({loginloading:true});
    console.log("log in");
    console.log(data.credentials);
    const { token, userId } = data.credentials;
    console.log(token);
    console.log(userId);
    try {
      let url = `https://graph.facebook.com/v2.8/${userId}?access_token=${token}&fields=name,picture,gender,email`;
      let response = await fetch(url).then( (data) => data.json() )
      console.log('response = ');
      console.log(response);
      console.log(response.name);
      console.log(response.gender);
      console.log(response.picture.data.url);

      // fb login
      let url2 = 'http://test-zzpengg.c9users.io:8080/user/FBLogin';
      let response2 = await fetch(url2, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: response.name,
          phone: response.phone || '尚未取得',
          gender: response.gender,
          address: response.address || '尚未取得',
          email: response.email,
          account: response.name,
          userId: userId,
          password: token,
          avatar: response.picture.data.url
        })
      }).then( (data) => data.json() );
      console.log(response2);
      let accessToken = response2.token;
      console.log(accessToken);
      //On success we will store the access_token in the AsyncStorage
      this.storeToken(accessToken);
      this.setState({accessToken: accessToken,loginloading:false})
      this.setState({error: 'success'});
      this.nextPage();

    }
    catch(err){
      console.log(err);
    }
  }
  render() {
    // const { region } = this.props;
    //console.log(region);

   return (
     <View style={styles.container}>
      <Loading label="載入中..." visible={this.state.visible}/>
      <Loading label="登入中" visible={this.state.loginloading}/>
       <Header style={{backgroundColor: "rgb(122, 68, 37)"}}>
         <Button transparent onPress={this.prePage.bind(this)}>
           <Icon name='ios-arrow-back' />
         </Button>
         <Title>房東登入</Title>
         {
            this.state.accessToken.length != 0 ?
              <Button transparent onPress={this.personPage.bind(this)}>
                <IconVec name="user-circle" style={{fontSize: 30}}/>
              </Button>
            :
            null
         }
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
           {/*<Button onPress={this.nextPageRegister.bind(this)} style={styles.submitBtn} block warning> 註冊 </Button>
           <View style={{ alignItems: 'center' }}>
             <View style={styles.orWrapper}>
               <Text style={styles.orText}>or</Text>
             </View>
             <View style={styles.hr} />
           </View>*/}
           <Button style={styles.submitBtn} onPress={this.onLoginPressed.bind(this)} block info> 登入 </Button>
           <View style={{ alignItems: 'center' }}>
             <View style={styles.orWrapper}>
               <Text style={styles.orText}>or</Text>
             </View>
             <View style={styles.hr} />
           </View>
           <FBLogin
              loginText="Facebook 登入"
              style={styles.submitBtn}
              ref={(fbLogin) => { this.fbLogin = fbLogin }}
              loginBehavior={FBLoginManager.LoginBehaviors.Native}
              permissions={["public_profile","email","user_friends" ]}
              onLogin={this.onFBLogin}
              onLoginFound={function(data){console.log(data.credentials)}}
              onLoginNotFound={function(e){console.log(e)}}
              onLogout={function(e){console.log(e)}}
              onCancel={function(e){console.log(e)}}
              onPermissionsMissing={function(e){console.log(e)}}/>
              <TouchableOpacity onPress={this.nextPageRegister.bind(this)}>  
                <Text style={{marginTop:15,textAlign:'center',color:'blue',fontSize:15}}>註冊新帳號</Text>
              </TouchableOpacity>
         </List>
         </Content>
         :
         <Content>
         <View style={styles.loginform}>
           <View>
             {
               this.state.avatar == null ?
               <Image source={require('../assets/landlord-icon.png')} style={styles.personImage} />
               :
               this.state.avatar.length < 50 ?
               <Image source={{uri: `https://test-zzpengg.c9users.io:8080/images/avatar/${this.state.id}/${this.state.avatar}`}} style={styles.personImage} />
               :
               <Image source={{uri: this.state.avatar}} style={styles.personImage} />
             }
             <View style={{alignSelf: 'center'}}>
               <Text style={{fontSize: 32,}}>{this.state.name}</Text>
             </View>
             <Button onPress={this.nextPage.bind(this)} style={styles.submitBtn} block warning> 登入 </Button>
             <View style={{ alignItems: 'center' }}>
               <View style={styles.orWrapper}>
                 <Text style={styles.orText}>or</Text>
               </View>
               <View style={styles.hr} />
             </View>
             <Button style={styles.submitBtn} onPress={this.onLogout.bind(this)} block info> 登出 </Button>
            </View>
          </View>

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
