/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
// import MapView from 'react-native-maps';
import {
  StyleSheet,
  View,
  ScrollView,
  Image,
  Text,
  Navigator,
  TouchableOpacity,
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
  Body,
  ListItem,
  InputGroup,
  CheckBox,
  Input,
  Left,
  Right,
} from 'native-base';

import HouseData from './HouseData.js';

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
  houseTitle: {
    paddingTop:10,
    paddingLeft: 30,
    fontSize: 15,
    color: '#7b7d85'
  },
  houseTitleInput: {
    borderColor: 'red',
    borderWidth: 5,
    marginLeft: 15,
  },
  viewFlexRow: {
    flexDirection: 'row'
  },
  areaText: {
    paddingTop:20,
    paddingLeft: 30,
    fontSize: 15,
    color: '#7b7d85'
  },
  addrText: {
    paddingTop:10,
    paddingLeft: 30,
    fontSize: 15,
    color: '#7b7d85'
  }
});

export default class CreateHouseData extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedItem: undefined,
      results: {
          items: []
      },
      title: "",
      area: "寶山",
      address: "",
      vacancy: 0,
      rent: 0,
      check_water:false,
      waterandelec: "都不包",
      type: "套房",
      accessToken: this.props.accessToken,
    }

  }

  onAreaChange (value: string) {
    this.setState({
        area : value
    });
  }

  onWaterAndElecChange (value: string) {
    this.setState({
        waterandelec : value
    });
  }

  onTypeChange (value: string) {
    this.setState({
        type : value
    });
  }

  nextPage() {
    const { navigator } = this.props;
    //为什么这里可以取得 props.navigator?请看上文:
    //<Component {...route.params} navigator={navigator} />
    //这里传递了navigator作为props
    if(navigator) {
        navigator.push({
            name: 'HouseDatas',
            component: HouseDatas,
        })
    }
  }

  prePage() {
    const { navigator } = this.props;

    if(navigator) {
      navigator.pop();
    }
  }
  checkWater=()=>{
    this.setState({checkwater:!this.state.checkwater});
}
checkEle=()=>{
  this.setState({checkele:!this.state.checkele});
}
checkNet=()=>{
  this.setState({checknet:!this.state.checknet});
}
  onHousePressed = async() => {
    try {
      console.log("testtest");
      let url = 'http://test-zzpengg.c9users.io:8080/house/createMyHouse'
      let res = await fetch(url, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'x-access-token': this.state.accessToken,
        },
        body: JSON.stringify({
          title: this.state.title,
          area: this.state.area,
          address: `彰化縣彰化市${this.state.address}`,
          vacancy: this.state.vacancy,
          rent: this.state.rent,
          checknet:this.state.checknet,
          checkele:this.state.checkele,
          checkwater:this.state.checkwater,
          type: this.state.type,
        })
      }).then( (data) => data.json())
        .catch( (e) => console.log(e) );
      console.log("res = " + res);
      console.log( (res != null) );
      if(res != null){
        console.log("in");
        this.props.callback();
        this.prePage();
      }
      else{
        console.log("out");
        console.log("something wrong");
      }
      console.log(res);
    } catch (errors) {
      console.log(errors);
    }
  }
  render() {
    // const { region } = this.props;
    //console.log(region);

   return (
     <Container>
        <Header style={{backgroundColor: "rgb(122, 68, 37)"}}>
          <Button transparent onPress={this.prePage.bind(this)}>
            <Icon name='ios-arrow-back' />
          </Button>
          <Title>新增房屋資訊</Title>
        </Header>
        <Content>

          <ScrollView>
            <View style={styles.viewFlexRow} >
              <Image source={require('../assets/fuck_cat.jpg')} style={styles.bgImg} />
              <Image source={require('../assets/pusheen.jpg')} style={styles.bgImg} />
              <View style={{padding:10}}>
                <Image source={require('../assets/space.jpg')} style={{width:80, height:80}} />
                <TouchableOpacity onPress={this.setRequestBody('./image')}>
                  <Text>新增圖片</Text>
                </TouchableOpacity>
              </View>
            </View>
            <List style={styles.form}>
             <View style={styles.viewFlexRow}>
               <Text style={styles.houseTitle}>房屋名稱</Text>
               <Input style={styles.houseTitleInput} onChangeText={ (title) => this.setState({ title: title }) } ></Input>
             </View>
             <View style={styles.viewFlexRow}>
               <Text style={styles.areaText}>所在區域</Text>
               <Picker
                  style={{ width: 120, marginLeft: 50, marginTop: 6}}
                  iosHeader="Select one"
                  mode="dropdown"
                  selectedValue={this.state.area}
                  onValueChange={this.onAreaChange.bind(this)}>
                  <Item label="寶山" value="寶山" />
                  <Item label="進德" value="進德" />
                  <Item label="其他" value="其他" />
               </Picker>
             </View>

            <View style={styles.viewFlexRow}>
              <Text style={styles.addrText} >彰化縣彰化市</Text>
              <Input style={{borderColor: 'red', borderWidth: 5}} onChangeText={ (address) => this.setState({ address: address }) }></Input>
            </View>

            <View style={styles.viewFlexRow}>
              <Text style={{paddingTop:13, paddingLeft: 30, fontSize: 15, color: '#7b7d85'}}>剩餘空房</Text>
              <Input style={{borderColor: 'red', borderWidth: 5, marginLeft: 15}} onChangeText={ (vacancy) => this.setState({ vacancy: vacancy }) }></Input>
            </View>

            <View style={styles.viewFlexRow}>
              <Text style={{paddingTop:16, paddingLeft: 30, fontSize: 15, color: '#7b7d85'}}>租金</Text>
              <Input style={{borderColor: 'red', borderWidth: 5, marginLeft: 15, textAlign: 'right',marginRight: 5}} onChangeText={ (rent) => this.setState({ rent: rent }) }></Input>
              <Text style={{paddingTop:10, fontSize: 15, color: '#7b7d85'}} >/月</Text>
            </View>

             <View style={styles.viewFlexRow}>
               <Text style={{paddingTop:11, paddingLeft: 30, fontSize: 15, color: '#7b7d85'}}>類型</Text>
               <Picker
                  style={{ width: 120, marginLeft: 50, height: 45}}
                  iosHeader="Select one"
                  mode="dropdown"
                  selectedValue={this.state.type}
                  onValueChange={this.onTypeChange.bind(this)}>
                  <Item label="雅房" value="雅房" />
                  <Item label="套房" value="套房" />
               </Picker>
             </View>
             <View>
              <ListItem onPress={this.checkWater}>
                <CheckBox  checked={this.state.checkwater} />
                    <Text>包水</Text>
                </ListItem>
                <ListItem onPress={this.checkEle}>
                  <CheckBox checked={this.state.checkele} />
                      <Text>包電</Text>
                  </ListItem>
              <ListItem onPress={this.checkNet}>
                <CheckBox checked={this.state.checknet} />
                      <Text>網路</Text>
              </ListItem>
             </View>
             <Button style={styles.submitBtn} block warning onPress={this.onHousePressed.bind(this)}> 新增 </Button>
           </List>
          </ScrollView>
        </Content>
      </Container>
   );
  }
}
