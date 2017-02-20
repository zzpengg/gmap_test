import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  Alert
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

export default class LandlordRegistion extends Component {

  constructor(props) {
    super(props);
    this.state = {
        selectedItem: 'undefined'
        ,
        selected1: 'male',
        results: {
            items: []
        },
        name: "0000",
        phone: "",
        gender: "",
        address: "",
        changhao: "",
        password: "",
        password_comfirmed: "",
        error: "",
    }
  }
  checkname(value)
  {
    if(this.state.name.length>10){
      Alert.alert(
        '帳號超過長度限制',
        '請輸入小於10個字的帳號',
       [
        {text:'我知道了',onPress:()=>{}}
       ]
     )
   }
    //   this.setState({
    //     name: 'gggggg',
    //     phone: "號碼長度超過限制囉",
    //     address: "地址長度超過限制囉",
    //     changhao: "帳號長度超過限制囉",
    //     password: "ggggggg",
    //     password_comfirmed: "密碼不合",
    //   }
  }
  onValueChange (value: string) {
    this.setState({
        selected1 : value
    });
  }

  async onRegisterPressed () {
    try {

      let namelength = this.state.name.length;
      console.log(namelength);
      var formcheck="";
      //console.log(this.state.password.localeCompare(this.state.password_comfirmed));
      //console.log(this.state.password == this.state.password_comfirmed);
      // if(namelength > 10)
      // {formcheck+="請輸入小於10個字的帳號";}
      // if(this.state.password.localeCompare(this.state.password_comfirmed)==0)
      if(namelength > 10){
        Alert.alert(
          '帳號超過長度限制',
          '請輸入小於10個字的帳號',
         [
          {text:'我知道了',onPress:()=>{}}
         ]
       )
      //   this.setState({
      //     name: 'gggggg',
      //     phone: "號碼長度超過限制囉",
      //     address: "地址長度超過限制囉",
      //     changhao: "帳號長度超過限制囉",
      //     password: "ggggggg",
      //     password_comfirmed: "密碼不合",
      //   })
       }
        else if(this.state.password.localeCompare(this.state.password_comfirmed)==0){
          await  fetch('http://test-zzpengg.c9users.io:8080/user', {
                  method: 'POST',
                  body: JSON.stringify({
                        name: this.state.name,
                        phone: this.state.phone,
                        gender: this.state.selected1,
                        address: this.state.address,
                        changhao: this.state.changhao,
                        password: this.state.password,
                        password_comfirmed: this.state.password_comfirmed
                  })
                })
        }
    } catch (errors) {
      console.log(errors);
    }
  }


render() {
    return (
      <View style={styles.container}>
        <Header style={{backgroundColor: "rgb(122, 68, 37)"}}>
          <Button transparent >
            <Icon name='ios-arrow-back' />
          </Button>
          <Title>房東註冊</Title>
        </Header>
        <Content>
            <View>
              <List style={styles.form}>
              <View style={{marginLeft: 50}} >
                <Image source={require('../assets/fuck_cat.jpg')} style={{width:150, height:150}}/>
                <Text style={{fontSize: 15, marginLeft: 30}}>新增大頭貼</Text>
              </View>
                <Text style={{fontSize: 18}}>基本資料</Text>
                <ListItem style={{ marginTop: 15 }}>
                  <InputGroup borderType="regular" style={{ borderRadius: 5}} >
                    <Input
                    placeholder="姓名"
                    onChangeText={ (val) =>{this.setState({name:val}),this.checkname(val)}}
                    maxLength={10}
                    />
                  </InputGroup>
                </ListItem>
                <ListItem style={{ marginTop: 10 }}>
                  <InputGroup borderType="regular" style={{ borderRadius: 5}} >
                    <Input placeholder="電話" onChangeText={ (val) => this.setState({phone: val}) }/>
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
                    <Item label="男" value="male" />
                    <Item label="女" value="female" />
                    <Item label="其他" value="others" />
                 </Picker>
               </View>
               <ListItem style={{ marginTop: 15 }}>
                 <InputGroup borderType="regular" style={{ borderRadius: 5 }} >
                   <Input placeholder="住址" onChangeText={ (val) => this.setState({address: val}) } />
                 </InputGroup>
               </ListItem>
               <Text style={{fontSize: 18, marginTop: 40}}>帳號密碼</Text>
               <ListItem style={{ marginTop: 15 }}>
                 <InputGroup borderType="regular" style={{ borderRadius: 5 }} >
                   <Input placeholder="帳號" onChangeText={ (val) => this.setState({changhao: val}) }/>
                 </InputGroup>
               </ListItem>
               <ListItem style={{ marginTop: 15 }}>
                 <InputGroup borderType="regular" style={{ borderRadius: 5 }} >
                   <Input placeholder="密碼" onChangeText={ (val) => this.setState({password: val}) }/>
                 </InputGroup>
               </ListItem>
               <ListItem style={{ marginTop: 15 }}>
                 <InputGroup borderType="regular" style={{ borderRadius: 5 }} >
                   <Input placeholder="確認密碼" onChangeText={ (val) => this.setState({password_comfirmed: val}) }/>
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
});
