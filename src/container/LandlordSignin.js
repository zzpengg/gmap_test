/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import MapView from 'react-native-maps';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  AsyncStorage,
  Image,
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
} from 'native-base';

import HouseData from './HouseData.js';
import LandlordRegistion from './LandlordRegistion.js';

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

const ACCESS_TOKEN = 'access_token';

export default class LandlordSignin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      status: "",
      password: "",
      accessToken: "",
      error: "",
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
        accessToken: this.state.accessToken
      }
    });
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
      error: 'logout'
    })
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
        name: response.name
      })
      return response.text;
    }catch(error){
      console.log("catch error = " + error);
      return error;
    }
  }

  onLoginPressed = async() => {
    try {
      let url = 'http://test-zzpengg.c9users.io:8080/user/login';
      let response = await fetch(url, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: this.state.name,
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
        this.nextPage();
      } else {
            //Handle error
            let error = res;
            throw error;
      }
    } catch(error){
      console.log("error " + error);
    }
  }

  nextPageRegister = () => {
    const { navigator } = this.props;
    navigator.push({
      name: 'LandlordRegistion',
      component: LandlordRegistion,
      params: {
        accessToken: this.state.accessToken
      }
    });
  }

  render() {
    // const { region } = this.props;
    //console.log(region);

   return (
     <View style={styles.container}>
       <Header style={{backgroundColor: "rgb(122, 68, 37)"}}>
         <Button transparent onPress={this.prePage.bind(this)}>
           <Icon name='ios-arrow-back' />
         </Button>
         <Title>房東登入</Title>
       </Header>
       {
          (this.state.error != 'success') ?
          <Content>
          <List style={styles.form}>
           <ListItem style={{ marginTop: 15 }}>
             <InputGroup borderType="regular" style={{ borderRadius: 5 }} >
               <Icon name="ios-person" />
               <Input onChangeText={(name) => {this.setState({name})}} placeholder="NAME" />
             </InputGroup>
           </ListItem>
           <ListItem style={{ marginTop: 10 }}>
             <InputGroup borderType="regular" style={{ borderRadius: 5 }} >
               <Icon name="ios-unlock" />
               <Input onChangeText={(password) => {this.setState({password})}} placeholder="PASSWORD" secureTextEntry={true}/>
             </InputGroup>
           </ListItem>
           <Button onPress={this.nextPageRegister.bind(this)} style={styles.submitBtn} block warning> 註冊 </Button>
           <View style={{ alignItems: 'center' }}>
             <View style={styles.orWrapper}>
               <Text style={styles.orText}>or</Text>
             </View>
             <View style={styles.hr} />
           </View>
           <Button style={styles.submitBtn} onPress={this.onLoginPressed.bind(this)} block info> 登入 </Button>
         </List>
         </Content>
         :
         <Content>
         <View style={styles.loginform}>
           <View>
             <Image source={require('../assets/fuck_cat.jpg')} style={styles.personImage} />
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
