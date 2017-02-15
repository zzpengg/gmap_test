/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
// import MapView from 'react-native-maps';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
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
  Left,
  Right,
} from 'native-base';

export default class UpdateHouseData extends Component {
  constructor(props) {
    super(props);
    this.state = {
        selectedItem: undefined,
        selected1: 'key1',
        results: {
            items: []
        }
    }
  }

  onValueChange (value: string) {
    this.setState({
        selected1 : value
    });
  }

  render() {
    // const { region } = this.props;
    //console.log(region);

   return (
     <Container>

        <Header style={{backgroundColor: "rgb(122, 68, 37)"}}>
          <Button transparent >
            <Icon name='ios-arrow-back' />
          </Button>
          <Title>修改房屋資訊</Title>
        </Header>
        <Content>
          <ScrollView>
            <View style={{flexDirection: 'row'}} >
              <Image source={require('../assets/fuck_cat.jpg')} style={styles.bgImg} />
              <Image source={require('../assets/pusheen.jpg')} style={styles.bgImg} />
              <View style={{padding:10}}>
                <Image source={require('../assets/space.jpg')} style={{width:80, height:80}} />
                <Text>新增圖片</Text>
              </View>
            </View>
            <List style={styles.form}>
              <ListItem style={{ marginTop: 10 }}>
                <InputGroup borderType="regular" style={{ borderRadius: 5 }} >
                  <Input inlineLabel label="房屋名稱" placeholder="" />
                </InputGroup>
              </ListItem>
             <View style={{flexDirection:'row'}}>
               <Text style={{paddingTop:20, paddingLeft: 30, fontSize: 18}}>所在區域</Text>
               <Picker
                  style={{ width: 120, marginLeft: 50, marginTop: 10}}
                  iosHeader="Select one"
                  mode="dropdown"
                  selectedValue={this.state.selected1}
                  onValueChange={this.onValueChange.bind(this)}>
                  <Item label="Wallet" value="key0" />
                  <Item label="ATM Card" value="key1" />
                  <Item label="Debit Card" value="key2" />
                  <Item label="Credit Card" value="key3" />
                  <Item label="Net Banking" value="key4" />
               </Picker>
             </View>
             <ListItem style={{ marginTop: 15, flexDirection: 'row' }}>
                 <Text>地址</Text>
                 <Text>彰化縣彰化市</Text>
             </ListItem>
             <ListItem style={{ marginTop: 15 }}>
               <InputGroup borderType="regular" style={{ borderRadius: 5 }} >
                 <Input placeholder="地址" />
               </InputGroup>
             </ListItem>
             <ListItem style={{ marginTop: 15 }}>
               <InputGroup borderType="regular" style={{ borderRadius: 5 }} >
                 <Input inlineLabel label="剩餘空房" placeholder="" />
               </InputGroup>
             </ListItem>
             <ListItem style={{ marginTop: 15 }}>
               <InputGroup borderType="regular" style={{ borderRadius: 5 }} >
                 <Input inlineLabel label="租金" placeholder="" />
               </InputGroup>
             </ListItem>
             <View style={{flexDirection:'row'}}>
               <Text style={{paddingTop:20, paddingLeft: 30, fontSize: 18}}>包水、包電</Text>
               <Picker
                  style={{ width: 120, marginLeft: 50, marginTop: 10}}
                  iosHeader="Select one"
                  mode="dropdown"
                  selectedValue={this.state.selected1}
                  onValueChange={this.onValueChange.bind(this)}>
                  <Item label="Wallet" value="key0" />
                  <Item label="ATM Card" value="key1" />
                  <Item label="Debit Card" value="key2" />
                  <Item label="Credit Card" value="key3" />
                  <Item label="Net Banking" value="key4" />
               </Picker>
             </View>
             <View style={{flexDirection:'row'}}>
               <Text style={{paddingTop:20, paddingLeft: 30, fontSize: 18}}>類型</Text>
               <Picker
                  style={{ width: 120, marginLeft: 50, marginTop: 10}}
                  iosHeader="Select one"
                  mode="dropdown"
                  selectedValue={this.state.selected1}
                  onValueChange={this.onValueChange.bind(this)}>
                  <Item label="雅房" value="key0" />
                  <Item label="套房" value="key1" />
                  <Item label="Debit Card" value="key2" />
                  <Item label="Credit Card" value="key3" />
                  <Item label="Net Banking" value="key4" />
               </Picker>
             </View>

             <Button style={styles.submitBtn} block warning> 登入 </Button>
           </List>
          </ScrollView>
        </Content>
      </Container>
   );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FBFAFA',
  },
 map: {
   ...StyleSheet.absoluteFillObject,
 },
 center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  mb: {
    marginBottom: 15,
  },
  bgImg: {
    width:150,
    height:150,
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
});
