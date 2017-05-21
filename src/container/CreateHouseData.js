/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  Image,
  Text,
  Navigator,
  TouchableOpacity,
  PixelRatio,
  Alert,
  TextInput
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
  Input,
  Left,
  Right,
} from 'native-base';
import CheckBox from 'react-native-checkbox';
import HouseData from './HouseData.js';
import ImagePicker from 'react-native-image-picker';
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
      checkwater: false,
      checkele: false,
      checknet: false,
      type: "套房",
      accessToken: this.props.accessToken,
      account:this.props.account,
      remark:"",
    }

  }

  onAreaChange (value: string) {
    this.setState({
        area: value
    });
  }

  onWaterAndElecChange (value: string) {
    this.setState({
        waterandelec: value
    });
  }

  onTypeChange (value: string) {
    this.setState({
        type: value
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

  checkWater = () => {
    this.setState({checkwater:!this.state.checkwater});
  }


  checkEle = () => {
    this.setState({checkele:!this.state.checkele});
  }

  checkNet = () => {
    this.setState({checknet:!this.state.checknet});
  }
  onHousePressed = async() => {
    try {
      
        if(this.state.title.length==0||this.state.address.length==0||this.state.address.length==0){
          Alert.alert(
            "錯誤訊息",
            "欄位值不能為空",
            [
              {text:'我知道了',onPress:()=>{}}
            ]
          )
        }
      else {
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
          remark:this.state.remark
        })
      }).then( (data) => data.json())
        .catch( (e) => console.log(e) );
      console.log("res = " + res);
      console.log( (res != null) );
      if(res != null){
        console.log("in");
        this.props.callBack();
        this.prePage();
      }
      else{
        console.log("out");
        console.log("something wrong");
      }
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
              <Input style={{borderColor: 'red', borderWidth: 5, marginLeft: 15}}
                keyboardType={'phone-pad'}
                onChangeText={ (vacancy) => {
                  if(isNaN(vacancy)){
                    Alert.alert("型態錯誤","請輸入數字",[{text:"我知道了",onPress:()=>{}}]);
                    this.setState({vacancy:""});
                  }
                  else{
                     this.setState({ vacancy: vacancy });
                  }}}
                  value={this.state.vacancy} />
            </View>

            <View style={styles.viewFlexRow}>
              <Text style={{paddingTop:16, paddingLeft: 30, fontSize: 15, color: '#7b7d85'}}>租金</Text>
              <Input style={{borderColor: 'red', borderWidth: 5, marginLeft: 15, textAlign: 'right',marginRight: 5}}
                keyboardType={'phone-pad'}
                onChangeText={ (rent) => {
                  if(isNaN(rent)){
                    Alert.alert("型態錯誤","請輸入數字",[{text:"我知道了",onPress:()=>{}}]);
                    this.setState({rent:""});
                  }
                  else{
                    this.setState({ rent: rent })
                  }
                  }}
                    value={this.state.rent} />
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
           
             <CheckBox
             style={{flex:1,flexDirection:'row'}}
               label='包水'
               checked={this.state.checkwater}
               onChange={this.checkWater}
             />
            
             
             <CheckBox
             style={{flex:1,flexDirection:'row'}}
               label='包電'
               checked={this.state.checkele}
               onChange={this.checkEle}
             />
            
            
             <CheckBox
             style={{flex:1,flexDirection:'row'}}
               label='網路'
               checked={this.state.checknet}
               onChange={this.checkNet}
             />
            
             <Text>備註:</Text>
              <TextInput
              style={{textAlignVertical: 'top',borderColor:'black',borderRadius:5,borderWidth:0.5}}
              onChangeText = { (remark) => this.setState({remark: remark})}
              editable = {true}
              multiline = {true}
              numberOfLines = {4}
              maxLength = {100}
              blurOnSubmit={true}
              placeholder="長度限定100字"
              value={this.state.remark}
            />
            <Text>{this.state.remark.length}/100</Text>
             </View>
             <Button style={styles.submitBtn} block warning onPress={this.onHousePressed.bind(this)}> 新增 </Button>
           </List>
          </ScrollView>
        </Content>
      </Container>
   );
  }
}
