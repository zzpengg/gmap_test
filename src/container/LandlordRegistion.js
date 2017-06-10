import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  Alert,
  Modal,
  TouchableHighlight,
  AsyncStorage,
  PixelRatio,
  TouchableOpacity,
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

import HouseData from './HouseData.js';
import ImagePicker from 'react-native-image-picker';

const ACCESS_TOKEN = 'access_token';

export default class LandlordRegistion extends Component {

  constructor(props) {
    super(props);
    this.state = {
        selectedItem: 'undefined',
        selected1: 'male',
        results: {
            items: []
        },
        name: "",
        phone: "",
        gender: "",
        account: "",
        password: "",
        email:"",
        password_comfirmed: "",
        error: "",
        checkId:"",
        modalVisible: true,
    }
  }
  checkIdRepeat = async() => {
    console.log("checkIdRepeat");
    let url='http://test-zzpengg.c9users.io:8080/user/checkIdRepeat';
    let res=await fetch(url,{
      method:'POST',
      headers:{
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        account:this.state.account
      })
    }).then((data)=>data.json())
    .catch((e)=>console.log(e));
    console.log(res);
     await this.setState({checkid:res.data});
    if(this.state.checkid==1){
      await this.setState({account:""});
      Alert.alert(
        '錯誤訊息',
        '此帳號已存在',
        [
          {text:'我知道了',onPress:()=>{}}
        ]
      )
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

  isempty(val)
  {
    if(val.length==0)
    return 1;
    else return 0;
  }

  async onRegisterPressed () {
    try {
        let str = "";
        if(this.isempty(this.state.name)){
          str +="姓名 "
        }
        if(this.isempty(this.state.email)){
          str +="email "
        }
        if(this.isempty(this.state.account)){
          str +="帳號 "
        }
        if(this.isempty(this.state.phone)){
          str +="電話 "
        }
        if(this.isempty(this.state.password)){
          str +="密碼 "
        }
        if(this.isempty(this.state.name)||this.isempty(this.state.phone)||this.isempty(this.state.account)||this.isempty(this.state.password)||this.isempty(this.state.email)){
          Alert.alert(
            "錯誤訊息",
            "請輸入" + str,
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
          let url = 'http://test-zzpengg.c9users.io:8080/user/register';
               let response = await fetch(url, {
                 method: 'POST',
                 headers: {
                   'Accept': 'application/json',
                   'Content-Type': 'application/json',
                 },
                 body: JSON.stringify({
                   name: this.state.name,
                   phone: this.state.phone,
                   gender: this.state.selected1,
                   account: this.state.account,
                   password: this.state.password,
                   email: this.state.email
                 })
               }).then( (data) => data.json() )

               console.log(response);
               const { navigator } = this.props;
              //  if(navigator){
              //    navigator.push({
              //      name: 'HouseData',
              //      component: HouseData,
              //      params: {
              //        accessToken: this.state.accessToken
              //      }
              //    })
              //  }
              Alert.alert('註冊成功',
                "請至信箱驗證",
                [
                  {text:'我知道了',onPress:()=>{navigator.pop()}}
                ]
              );
             }
         } catch (errors) {
           console.log(errors);
         }
  }
  setModalVisible(visible) {
     this.setState({modalVisible: visible});
   }



render() {
    var data= [
              { sex:"男", type:"male"},
              { sex:"女",type:"female"}
            ];
    return (
      <View style={styles.container}>

        <Header style={{backgroundColor: "rgb(122, 68, 37)"}}>
          <Button transparent onPress={this.prePage.bind(this)} >
            <Icon name='ios-arrow-back' />
          </Button>
          <Title>房東註冊</Title>
        </Header>
        <Content>
            <View>
              <List style={styles.form}>
                <Text style={{fontSize: 18}}>基本資料</Text>
                <ListItem style={{ marginTop: 15 }}>
                  <InputGroup borderType="regular" style={{ borderRadius: 5}} >
                    <Input
                    placeholder="姓名"
                    onChangeText={ (val) =>{
                      if(val.length<=10){this.setState({name:val})}
                      else{
                      this.setState({name:""})
                      Alert.alert(
                        '名字超過長度限制',
                        '請輸入小於10個字的名字',
                       [
                        {text:'我知道了',onPress:()=>{}}
                       ]
                      )
                      }}}
                    value={this.state.name}
                    />
                  </InputGroup>
                </ListItem>
                 <ListItem style={{ marginTop: 10 }}>
                  <InputGroup borderType="regular" style={{ borderRadius: 5}} >
                    <Input placeholder="信箱" onChangeText={(val)=>{this.setState({email:val})}}
                      keyboardType={'email-address'}
                      onBlur={ async() =>{
                      const emailRule = /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z]+$/;
                      if(this.state.email.search(emailRule)==-1 && this.state.email.length!=0)
                      {
                        Alert.alert(
                          "格式錯誤",
                          "請輸入正確信箱",
                          [
                            {text:'我知道了',onPress:()=>{}}
                          ]
                        )
                        this.setState({email:""})
                      }
                    }}
                      value={this.state.email}/>
                  </InputGroup>
                </ListItem>
                <ListItem style={{ marginTop: 10 }}>
                  <InputGroup borderType="regular" style={{ borderRadius: 5}} >
                    <Input placeholder="電話"  keyboardType={'phone-pad'}
                    onChangeText={ (val) =>{
                      if(isNaN(val)==true)
                      {
                        Alert.alert(
                          "格式錯誤",
                          "請輸入數字",
                          [
                            {text:'我知道了',onPress:()=>{}}
                          ]
                        )
                        this.setState({phone:""})
                      }
                      else if(val.length<=10)
                      this.setState({phone: val})
                      else {
                        Alert.alert(
                          "電話長度不對",
                          "電話長度應少於11個數字",
                          [
                            {text:'我知道了',onPress:()=>{}}
                          ]
                        )
                        this.setState({phone:""})
                      }}}
                      value={this.state.phone}/>
                  </InputGroup>
                </ListItem>
               <View style={{flexDirection:'row'}}>
                 <Text style={{paddingTop:20, paddingLeft: 30, fontSize: 18}}>性別</Text>
                 <Picker
                    style={{ width: 120, marginLeft: 50, marginTop: 10}}
                    iosHeader="Select one"
                    mode="dropdown"
                    selectedValue={this.state.selected1}
                    onValueChange={this.onValueChange.bind(this)}>
                    {data.map(function(val, index)  {
                        return (<Item key={index} label={val.sex} value={val.type}/>)
                    })}

                 </Picker>
               </View>

               <Text style={{fontSize: 18, marginTop: 40}}>帳號密碼</Text>
               <ListItem style={{ marginTop: 15 }}>
                 <InputGroup borderType="regular" style={{ borderRadius: 5 }} >
                   <Input placeholder="帳號(長度4~16)"
                      keyboardType='ascii-capable'
                      value={this.state.account}
                      onBlur={async()=>{
                        if(this.state.account.length<4&&this.state.account.length!=0){
                          Alert.alert(
                            "長度不符",
                            "帳號長度應為4~16個字",
                            [{
                              text:'我知道了',onPress:()=>{}
                            }]
                          )
                          await this.setState({account:""})
                        }
                      }}
                   onChangeText={async(val) => {
                     if(val.length<=16)
                     await this.setState({account: val})
                     else {
                       Alert.alert(
                         "長度不符",
                         "帳號長度應為4~16個字",
                         [{
                           text:'我知道了',onPress:()=>{}
                         }]
                       )
                       await this.setState({account:""})
                     }
                     this.checkIdRepeat();
                   }}/>
                 </InputGroup>
               </ListItem>
               <ListItem style={{ marginTop: 15 }}>
                 <InputGroup borderType="regular" style={{ borderRadius: 5 }} >
                   <Input placeholder="密碼(長度6~20)"
                   value={this.state.password}
                   secureTextEntry={true}
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

                   }/>
                 </InputGroup>
               </ListItem>
               <ListItem style={{ marginTop: 15 }}>
                 <InputGroup borderType="regular" style={{ borderRadius: 5 }}>
                   <Input placeholder="確認密碼"
                          secureTextEntry={true}
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
                        }/>
                 </InputGroup>
               </ListItem>
               <Text>{this.state.error}</Text>
               <Button style={styles.submitBtn} onPress={this.onRegisterPressed.bind(this)} block warning> 確認送出 </Button>
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
  avatarContainer: {
    borderColor: '#9B9B9B',
    borderWidth: 1 / PixelRatio.get(),
    justifyContent: 'center',
    alignItems: 'center'
  },
  avatar: {
    borderRadius: 75,
    width: 150,
    height: 150
  }
});
