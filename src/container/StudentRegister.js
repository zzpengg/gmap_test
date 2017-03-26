import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  Alert,
  AsyncStorage,
} from 'react-native';
import {
  Header,
  Button,
  Icon,
  Item,
  Title,
  Content,
  List,
  ListItem,
  InputGroup,
  Input,
  Picker,
} from 'native-base';

import HouseComment from './HouseComment.js';

const STUDENT_ACCESS_TOKEN = 'student_access_token';

export default class StudentRegister extends Component {

  constructor(props) {
    super(props);
    this.state = {
        selectedItem: undefined,
        selected1: 'key1',
        results: {
            items: []
        },
        name: "",
        gender: "",
        email: "",
        account: "",
        password: "",
        password_comfirmed: "",
        error: "",
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

  onLogout(){
    this.deleteToken();
    this.setState({
      error: 'logout'
    })
  }

  async deleteToken() {
    try {
        await AsyncStorage.removeItem(STUDENT_ACCESS_TOKEN)
    } catch(error) {
        console.log("Something went wrong");
    }
  }

  onValueChange (value: string) {
    this.setState({
        selected1 : value
    });
  }

  prePage() {
      const { navigator } = this.props;
      if(navigator) {
          navigator.pop();
      }
  }

  onRegisterPressed = async() => {
    try {

        if((this.state.name.length == 0)||
           (this.state.account.length == 0)||
           (this.state.email.length == 0)||
           (this.state.password.length == 0)){
          Alert.alert(
            "錯誤訊息",
            "欄位值不能為空",
            [
              {text:'我知道了',onPress:()=>{}}
            ]
          )
        }
        else if(this.state.password.localeCompare(this.state.password_comfirmed)!=0){
          console.log(this.state.password + "+" + this.state.password_comfirmed);
          Alert.alert(
            '密碼確認錯誤',
            '請確認密碼',
            [{
              text:'我知道了',onPress:()=>{}
            }]
          )
        }
        else {
          let response = await fetch('http://test-zzpengg.c9users.io:8080/student/register', {
                  method: 'POST',
                  body: JSON.stringify({
                        name: this.state.name,
                        gender: this.state.selected1,
                        email: this.state.email,
                        account: this.state.account,
                        password: this.state.password,
                        password_comfirmed: this.state.password_comfirmed
                  })
                }).then( data => data.json() )
                console.log(response);
                await this.setState({
                  accessToken: response.token
                })
                this.onLogout.bind(this);
                this.storeToken(response.token);
                const { navigator } = this.props;
                if(navigator){
                  navigator.push({
                    name: 'HouseComment',
                    component: HouseComment,
                    params: {
                      accessToken: this.state.accessToken
                    }
                  })
                }
        }
    } catch (errors) {
      console.log(errors);
    }
  }

  render() {
    var data = ["男","女","其他"];
    return (
      <View style={styles.container}>
        <Header style={{backgroundColor: "rgb(122, 68, 37)"}}>
          <Button transparent onPress={this.prePage.bind(this)}>
            <Icon name='ios-arrow-back' />
          </Button>
          <Title>學生註冊</Title>
        </Header>
        <Content>
            <View>
              <List style={styles.form}>
              <View style={{marginLeft: 80}} >
                <Image source={require('../assets/fuck_cat.jpg')} style={{width:150, height:150}}/>
                <Text style={{fontSize: 15, marginLeft: 30}}>新增大頭貼</Text>
              </View>
                <Text style={{fontSize: 18}}>基本資料</Text>
                <ListItem style={{ marginTop: 15 }}>
                  <InputGroup borderType="regular" style={{ borderRadius: 5}} >
                    <Input
                      placeholder="姓名"
                      value={this.state.name}
                      onChangeText={ (val) =>{
                        if(val.length<=10){this.setState({name:val})}
                        else{
                        Alert.alert(
                          '名字超過長度限制',
                          '請輸入小於10個字的名字',
                         [
                          {text:'我知道了',onPress:()=>{}}
                         ]
                        )
                        this.setState({name:""});
                        }}}/>

                  </InputGroup>
                </ListItem>
               <View style={{flexDirection:'row'}}>
                 <Text style={{paddingTop:20, paddingLeft: 30, fontSize: 18}}>性別</Text>
                 {
                   data.length > 0 ?
                      <Picker
                        iosHeader="Select one"
                        mode="dropdown"
                        selectedValue={this.state.selected1}
                        onValueChange={this.onValueChange.bind(this)}>
                        {
                          data.map( (val, index) => <Item key={index} label={val} value={val} /> )
                        }
                      </Picker> : null
                  }
               </View>
               <ListItem style={{ marginTop: 15 }}>
                 <InputGroup borderType="regular" style={{ borderRadius: 5 }} >
                   <Input placeholder="信箱"
                     maxLength={50}
                     onChangeText={ (val) => this.setState({email: val}) }
                     value={this.state.email}/>
                 </InputGroup>
               </ListItem>
               <Text style={{fontSize: 18, marginTop: 40}}>帳號密碼</Text>
               <ListItem style={{ marginTop: 15 }}>
                 <InputGroup borderType="regular" style={{ borderRadius: 5 }} >

                   <Input placeholder="帳號" onBlur={()=>{
                     if(this.state.account.length<4&&this.state.account.length!=0){
                       Alert.alert(
                         "長度不符",
                         "帳號長度應為4~16個字",
                         [{
                           text:'我知道了',onPress:()=>{}
                         }]
                       )
                       this.setState({account:""})
                     }

                   }}
                   onChangeText={ (val) => {
                     if(val.length<=16)
                     this.setState({account: val})
                     else {
                       Alert.alert(
                         "長度不符",
                         "帳號長度應為4~16個字",
                         [{
                           text:'我知道了',onPress:()=>{}
                         }]
                       )
                       this.setState({account:""})
                     }
                   }}
                   value={this.state.account}/>
                 </InputGroup>
               </ListItem>
               <ListItem style={{ marginTop: 15 }}>
                 <InputGroup borderType="regular" style={{ borderRadius: 5 }} >
                   <Input placeholder="密碼" secureTextEntry={true}
                   value={this.state.password}
                   onBlur={()=>{
                     if(this.state.password.length<6 &&this.state.password.length!=0){
                       Alert.alert(
                         "長度不符",
                         "密碼長度為6~20個字母",
                         [{
                           text:'我知道了',onPress:()=>{}
                         }]
                       )
                       this.setState({password:""})
                     }
                   }}
                   onChangeText={(val)=>{
                     if(val.length<=20 )
                     this.setState({password:val})
                     else {
                       Alert.alert(
                         '長度不符',
                         '密碼長度為6~20個字母',
                         [{
                           text:'我知道了',onPress:()=>{}
                         }]
                       )
                       this.setState({password:""})
                     }
                   }

                   }
                   value={this.state.password}/>
                 </InputGroup>
               </ListItem>
               <ListItem style={{ marginTop: 15 }}>
                 <InputGroup borderType="regular" style={{ borderRadius: 5 }} >
                   <Input placeholder="確認密碼" secureTextEntry={true}
                   value={this.state.password_comfirmed}
                   onBlur={()=>{
                     if(this.state.password_comfirmed.length<6 &&this.state.password_comfirmed.length!=0){
                       Alert.alert(
                         "長度不符",
                         "密碼長度應為6~20個字",
                         [{
                           text:'我知道了',onPress:()=>{}
                         }]
                       )
                       this.setState({password_comfirmed:""})
                     }
                   }}
                   onChangeText={(val)=>{
                     if(val.length<=20 )
                     this.setState({password_comfirmed:val})
                     else {
                       Alert.alert(
                         '長度不符',
                         '密碼長度為6~20個字母',
                         [{
                           text:'我知道了',onPress:()=>{}
                         }]
                       )
                       this.setState({password_comfirmed:""})
                     }
                   }
                 }
                 value={this.state.password_comfirmed}/>
                 </InputGroup>
               </ListItem>

               <Button style={styles.submitBtn}
                 block warning
                 onPress={this.onRegisterPressed.bind(this)} > 確認送出 </Button>
             </List>
            </View>
        </Content>
      </View>
    )

  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fffbe2',
    flex: 1,
    justifyContent: 'center',
  },
  disabledBtn: {
    backgroundColor: 'rgb(255, 201, 150)',
    elevation: 0,
  },
  form: {
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
    top: -6,
    top: -18,
    left: 50,
    fontSize: 54,
    fontSize: 65,
    zIndex: 1000,
    elevation: 2,
    color: 'rgb(55, 27, 8)',
  },
  submitBtn: {
    elevation: 1,
    marginLeft: 18,
    marginRight: 0,
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
    width: 100,
    height: 100,
    position: 'absolute',
    top: 0,
    left: 0,
  },
});
