import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
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
        selectedItem: undefined,
        selected1: 'key1',
        results: {
            items: []
        },
        name: "",
    }
  }

  onValueChange (value: string) {
    this.setState({
        selected1 : value
    });
  }

  async onRegisterPressed () {
    try {
      let response = await fetch(`http://test-zzpengg.c9users.io:8080/user/create?name=${this.state.name}`);
      console.log(response);
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
                    <Input placeholder="姓名" onChangeText={ (val) => this.setState({name: val}) } />
                  </InputGroup>
                </ListItem>
                <ListItem style={{ marginTop: 10 }}>
                  <InputGroup borderType="regular" style={{ borderRadius: 5}} >
                    <Input placeholder="電話" />
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
                    <Item label="男" value="key0" />
                    <Item label="女" value="key1" />
                    <Item label="其他" value="key2" />
                 </Picker>
               </View>
               <ListItem style={{ marginTop: 15 }}>
                 <InputGroup borderType="regular" style={{ borderRadius: 5 }} >
                   <Input placeholder="住址" />
                 </InputGroup>
               </ListItem>
               <Text style={{fontSize: 18, marginTop: 40}}>帳號密碼</Text>
               <ListItem style={{ marginTop: 15 }}>
                 <InputGroup borderType="regular" style={{ borderRadius: 5 }} >
                   <Input placeholder="帳號" />
                 </InputGroup>
               </ListItem>
               <ListItem style={{ marginTop: 15 }}>
                 <InputGroup borderType="regular" style={{ borderRadius: 5 }} >
                   <Input placeholder="密碼" />
                 </InputGroup>
               </ListItem>
               <ListItem style={{ marginTop: 15 }}>
                 <InputGroup borderType="regular" style={{ borderRadius: 5 }} >
                   <Input placeholder="確認密碼" />
                 </InputGroup>
               </ListItem>

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
