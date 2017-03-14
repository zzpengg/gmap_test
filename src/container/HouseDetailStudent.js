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
  TouchableOpacity,
  Alert,
  Linking,
  Image,
  ScrollView,
  TextInput,
} from 'react-native';
import {
  Header,
  Content,
  Title,
  Icon,
  Button,
  List,
  ListItem,
  Input,
  Picker,
  Item,
} from 'native-base';
import CheckBox from 'react-native-checkbox';


import Dimensions from 'Dimensions';
const windowSize = Dimensions.get('window');
import Comment from '../component/Comment.js';

import CreateHouseData from './CreateHouseData.js';
import StudentSignin from './StudentSignin.js';

export default class HouseDetailStudent extends Component {
  constructor(props)
  {
    super(props);
    this.state = {
      tab : 1,
      selectedItem: undefined,
      results: {
          items: []
      },
      id: this.props.id,
      title: this.props.title,
      area: this.props.area,
      address: this.props.address,
      vacancy: this.props.vacancy,
      rent: this.props.rent,
      type: this.props.type,
      accessToken: this.props.accessToken,
      checkwater:this.props.checkwater,
      checkele:this.props.checkele,
      checknet:this.props.checknet,
      houseId: this.props.id,
      userId: 0,
      name: "develop",
      content: "",
      data: [],
      loading: true,
    }
    this.loadComment = this.loadComment.bind(this);
    this.loadComment();
  }

  loadComment = async () => {
    try {
      const url = 'http://test-zzpengg.c9users.io:8080/comment'
      let res = await fetch(url,{
      method: 'GET',
    }).then((data) => data.json())
      .catch((e) => console.log(e));

      this.setState({
        data: res,
        loading: false,
      });
      console.log(res);
    } catch (errors) {
      console.log(errors);
    }
  }

  onCommentPressed = async() => {
    try {
      let url = 'http://test-zzpengg.c9users.io:8080/comment/createMyComment'
      let response = await fetch(url, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'x-access-token': this.state.accessToken,
        },
        body: JSON.stringify({
          houseId: this.state.houseId,
          userId: this.state.userId,
          name: this.state.name,
          content: this.state.content,
        })
      });
      console.log(response);
    } catch (errors) {
      console.log(errors);
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

  updateHousePressed = async() => {
    try {
      let url = 'http://test-zzpengg.c9users.io:8080/house/updateMyHouse'
      let res = await fetch(url, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'x-access-token': this.state.accessToken,
        },
        body: JSON.stringify({
          id: this.state.id,
          title: this.state.title,
          area: this.state.area,
          address: `彰化縣彰化市${this.state.address}`,
          vacancy: this.state.vacancy,
          rent: this.state.rent,
          checkwater:this.state.checkwater,
          checknet:this.state.checknet,
          checkele:this.state.checkele,
          type: this.state.type,
        })
      }).then( (data) => data.json())
        .catch( (e) => console.log(e) );
      console.log(res);
      console.log( (res != null) );
      if(res != null){
        console.log("in");
        this.setState({
          tab: 1
        })
      }
      else{
        console.log("out");
        console.log("something wrong");
      }
    } catch (errors) {
      console.log(errors);
    }
  }

  prePage() {
      const { navigator } = this.props;
      if(navigator) {
          navigator.pop();
      }
  }

  navigate = () => {
    Alert.alert('選擇出發地點','進德校區,寶山校區', [
      { text: '進德校區', onPress: () => {
        //const url = `http://maps.google.com/maps/?q=@${this.state.myLat},${this.state.myLon}`;
        const url = `http://maps.google.com/maps/?saddr=國立彰化師範大學進德校區&daddr=${this.state.address}`;
        Linking.canOpenURL(url).then(supported => {
          if (supported) {
            Linking.openURL(url);
          }
        });
      } },
      {
        text: '寶山校區',onPress:()=>{
          const url = `http://maps.google.com/maps/?saddr=國立彰化師範大學寶山校區&daddr=${this.state.address}`;
          Linking.canOpenURL(url).then(supported => {
            if (supported) {
              Linking.openURL(url);
            }
          });
        }},
        {
          text: '目前位置',onPress:()=>{
            const url = `http://maps.google.com/maps/?daddr=${this.state.address}`;
            Linking.canOpenURL(url).then(supported => {
              if (supported) {
                Linking.openURL(url);
              }
            });
          }},
      { text: '取消', onPress: () => {} },
    ]);
  }

  gmap = () => {
    const imgWidth = parseInt(windowSize.width/5*4);
    const imgHeight = parseInt(imgWidth / 16.0 * 9.0, 10);

    return (
      <TouchableOpacity  style={{flex: 1, paddingTop: 20,alignItems:'center' }} onPress={this.navigate}>
        <Image
          resizeMode="cover"
          source={{
            uri: `https://maps.googleapis.com/maps/api/staticmap?center=${this.state.address}&zoom=16.85&size=${imgWidth}x${imgHeight}&scale=8&language=zh-tw&markers=size:mid%7Ccolor:blue%7C${this.state.address}&key=AIzaSyBiwSQUTr6brsJoPHcliZ3TVFYgYf7ulbw` }}
          style={{
            width: imgWidth,
            height: imgHeight,
          }}
        />
      </TouchableOpacity>
    );
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

  commentArea = () => {
    if(this.state.userId != 0){
      return (
        <View>
          <Text style={styles.houseTitle}>userId: {this.state.userId}</Text>
          <Text style={styles.houseTitle}>houseId: {this.state.houseId}</Text>
          <TextInput
            style={{borderColor: 'gray', borderWidth: 1, marginLeft: 10, marginRight: 10}}
            onChangeText={(content) => this.setState({content})}
            value={this.state.content}
            multiline={true}
          />
          <Text style={styles.houseTitle}> {this.state.content.length}/100</Text>
          <Button style={styles.submitBtn} onPress={this.onCommentPressed.bind(this)} block warning> 確認送出 </Button>
        </View>
      );
    }
    else {
      return (
        <View>
          <TouchableOpacity onPress={ () => {
            const { navigator } = this.props;

            if(navigator){
              navigator.push({
                name: 'StudentSignin',
                component: StudentSignin
              })
            }
          }}>
            <Text style={{fontSize: 20, alignSelf: 'center'}}>需要登入</Text>
          </TouchableOpacity>
        </View>
      )
    }
  }

  dataContent = tab => {
    if(tab==1){
      return (
        <View>
        <Image
          source={require('../assets/house.jpg')}
          style={{width:300, height:100, marginTop: 10, alignSelf: 'center' }}
        />
        <Text style={styles.detailText}>房屋名稱: {this.state.title}</Text>
        <Text style={styles.detailText}>所在區域: {this.state.area}</Text>
        <Text style={styles.detailText}>租金:  {this.state.rent}/月</Text>
        {this.gmap()}
        <Text style={styles.detailText}>評價: {this.state.score}</Text>
        <Text style={styles.detailText}>連絡房東: </Text>
        </View>
      );
    }
    if(tab==3){
      let tmp_array = [
       { name: "彰師大", score: 3 ,content: '越叫福應層道定對絕常建白去件的頭她'+
       '主一直它記教為半做長我關：著到形入他道法間效像反。動起創中投自滿政不現樹！'+
       '人好代急區機長下同道；處越星地性大以散的會車臺我道還寶定苦的建不什？有城'+
       '機遠取然，提有發年。發樣麼。樣程給式緊這界流聲！能數的應司往見保爭南子：來四母我只受久美一。'},
       { name: "煞氣A", score: 1,content: '越叫福應層道定對絕常建白去件的頭她'+
       '主一直它記教為半做長我關：著到形入他道法間效像反。動起創中投自滿政不現樹！'+
       '人好代急區機長下同道；處越星地性大以散的會車臺我道還寶定苦的建不什？有城'+
       '機遠取然，提有發年。發樣麼。樣程給式緊這界流聲！能數的應司往見保爭南子：來四母我只受久美一。'},
       { name: "霸氣B", score: 5,content: '越叫福應層道定對絕常建白去件的頭她'+
       '主一直它記教為半做長我關：著到形入他道法間效像反。動起創中投自滿政不現樹！'+
       '人好代急區機長下同道；處越星地性大以散的會車臺我道還寶定苦的建不什？有城'+
       '機遠取然，提有發年。發樣麼。樣程給式緊這界流聲！能數的應司往見保爭南子：來四母我只受久美一。' }
      ];
      return (
        <View>
          <Text style={styles.houseTitle}>房屋名稱: {this.state.title}</Text>
          <Image source={require('../assets/house.jpg')} style={styles.houseImage} />
          {
            this.state.loading ?
              <ActivityIndicator
                animating={this.state.loading}
                style={styles.spinner}
                color="rgb(213, 179, 36)"
              /> : null
          }
          {
            tmp_array.map((val, index) => {
              return (<Comment key={index+2} name={val.name} content={val.content} score={val.score}/>)
            })
          }
          {
            this.state.data.map((val, index) => {
              return (<Comment key={index+2} name={val.name} content={val.content} score={val.score}/>)
            })
          }

          {this.commentArea()}
        </View>
      )
    }
  }

  render() {
    // const { region } = this.props;
    //console.log(region);

   return (
     <ScrollView style={{flexDirection:'column',flex:1}}>
       <Header style={{backgroundColor: "rgb(122, 68, 37)"}}>
         <Button transparent onPress={this.prePage.bind(this)}>
           <Icon name='ios-arrow-back' />
         </Button>
         <Title>房屋資訊</Title>
       </Header>
        <View style={{flexDirection: 'row'}}>
          <Button
            onPress={() => {
              this.setState({
                tab: 1
              })
            }}
            style={{width: windowSize.width/2}}
          >詳細資訊</Button>
          <Button
            onPress={() => {
              this.setState({
                tab: 3
              })
            }}
            style={{width: windowSize.width/2}}
          >房屋評論</Button>
        </View>
        {this.dataContent(this.state.tab)}

     </ScrollView>
   );
  }
}

const styles = StyleSheet.create({
  container: {
   ...StyleSheet.absoluteFillObject,
   height: 400,
   width: 400,
   justifyContent: 'flex-end',
   alignItems: 'center',
 },
 map: {
   ...StyleSheet.absoluteFillObject,
 },
 center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  detailText: {
    marginTop: 5,
    marginLeft: 30,
  },
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
    marginRight: 10,
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
  container: {
   ...StyleSheet.absoluteFillObject,
   height: 400,
   width: 400,
   justifyContent: 'flex-end',
   alignItems: 'center',
 },
 map: {
   ...StyleSheet.absoluteFillObject,
 },
 center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  houseTitle: {
    marginTop: 10,
    marginLeft: 10,

  },
  houseImage: {
    width: 300,
    height: 100,
    marginTop: 5,
    marginLeft: 5,
    marginBottom: 5,
    alignSelf: 'center'
  },
});
