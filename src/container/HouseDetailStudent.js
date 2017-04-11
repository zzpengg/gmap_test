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
  TouchableOpacity,
  Alert,
  Linking,
  Image,
  ScrollView,
  TextInput,
  ActivityIndicator,
  AsyncStorage,
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
import IconVec from 'react-native-vector-icons/FontAwesome';

import Dimensions from 'Dimensions';
const windowSize = Dimensions.get('window');
import Comment from '../component/Comment.js';

import CreateHouseData from './CreateHouseData.js';
import StudentSignin from './StudentSignin.js';

import HouseComment from './HouseComment.js';

const STUDENT_ACCESS_TOKEN = 'student_access_token';

export default class HouseDetailStudent extends Component {
  constructor(props)
  {
    super(props);
    this.state = {
      selectedItem: undefined,
      results: {
          items: []
      },
      accessToken: this.props.accessToken,
      houseId: this.props.id,
      userId: this.props.userId||0,
      name: "develop",
      content: "",
      data: [],
      house: [],
      loading: true,
      comment: [],
    }
    this.loadBestComment = this.loadBestComment.bind(this);
    this.loadBestComment();
    this.getToken = this.getToken.bind(this);
    this.getToken();
    this.loadTheHouse = this.loadTheHouse.bind(this);
    this.loadTheHouse();
  }

  loadBestComment = async () => {
    try {
      const url = 'http://test-zzpengg.c9users.io:8080/comment/findBestComment'
      let res = await fetch(url,{
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          houseId: this.state.houseId,
        })
      }).then( (data) => data.json() )
        .catch((e) => console.log(e));

      console.log(res);

      await this.setState({
        comment: res.data,
        loading: false,
      });
    } catch (errors) {
      console.log(errors);
    }
  }

  getToken = async() => {
    try {
      let accessToken = await AsyncStorage.getItem(STUDENT_ACCESS_TOKEN);
      if(!accessToken) {
          console.log("not have token");
      } else {
          console.log("accessToken = " + accessToken);
          this.setState({accessToken: accessToken});
          this.setState({error: 'success'});
          this.setState({isLogin: 1});
          this.setState({loadingisLogin: false});
      }
    } catch(error) {
        console.log("catch error = " + error);
    }
  }

  loadTheHouse = async () => {
    try {
      const url = 'http://test-zzpengg.c9users.io:8080/house/findTheHouse'
      let res = await fetch(url,{
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          houseId: this.state.houseId,
        })
      }).then( (data) => data.json() )
        .catch((e) => console.log(e));

      console.log(res);

      await this.setState({
        house: res.data,
      });
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
  callback = () => {
    this.loadBestComment();
  }

  commentPage = () => {
    const { navigator } = this.props;
    if(navigator) {
      navigator.push({
        name: 'HouseComment',
        component: HouseComment,
        params: {
          accessToken: this.state.accessToken,
          houseId: this.state.houseId,
          callback: this.callback,
        }
      });
    }
  }

  navigate = () => {
    Alert.alert('導航',`${this.state.house.address}`, [
      // { text: '進德校區', onPress: () => {
      //   //const url = `http://maps.google.com/maps/?q=@${this.state.myLat},${this.state.myLon}`;
      //   const url = `http://maps.google.com/maps/?saddr=國立彰化師範大學進德校區&daddr=${this.state.address}`;
      //   Linking.canOpenURL(url).then(supported => {
      //     if (supported) {
      //       Linking.openURL(url);
      //     }
      //   });
      // } },
      // {
      //   text: '寶山校區',onPress:()=>{
      //     const url = `http://maps.google.com/maps/?saddr=國立彰化師範大學寶山校區&daddr=${this.state.address}`;
      //     Linking.canOpenURL(url).then(supported => {
      //       if (supported) {
      //         Linking.openURL(url);
      //       }
      //     });
      //   }},
        {
          text: '前往',onPress:()=>{
            const url = `http://maps.google.com/maps/?daddr=${this.state.house.address}`;
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

  extra = () => {
    const { checkwater, checkele, checknet } = this.state.house;
    let text = "";
    let check = 0;
    if(checkwater){
      text += "水費";
      check += 1;
    }
    if(checkele){
      if(check == 1){
        text += "、電費";
      }else{
        text += "電費";
      }
      check += 1;
    }
    if(checknet){
      if(check == 2){
        text += "、網路費";
      }else {
        text += "網路費";
      }
      check += 1;
    }

    if(check > 0){
      temp = "含" + text;
    }else{
      temp = null;
    }
    if(temp) {
      return (
        <Text style={styles.detailText}>({temp})</Text>
      )
    }else {
      return null
    }
  }

  thumbs_up = async(commentId) => {
    try {
      if(!this.state.accessToken){
        Alert.alert(
          '錯誤訊息',
          '尚未登入',
          [
            {text:'我知道了',onPress:()=>{}}
          ]
        );
      }
      else{
        console.log("commentId = " + commentId);
        const url = 'http://test-zzpengg.c9users.io:8080/like/addLike'
        let res = await fetch(url,{
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'x-access-token': this.state.accessToken,
          },
          body: JSON.stringify({
            commentId: commentId,
          })
        }).then( (data) => data.json() )
          .catch((e) => console.log(e));

        console.log(res);
        this.loadBestComment();
      }

    } catch (errors) {
      console.log(errors);
    }
  }

  thumbs_down = async(commentId) => {
    try {
      if(!this.state.accessToken){
        Alert.alert(
          '錯誤訊息',
          '尚未登入',
          [
            {text:'我知道了',onPress:()=>{}}
          ]
        );
      }
      else{
        console.log("commentId = " + commentId);
        const url = 'http://test-zzpengg.c9users.io:8080/like/addDislike'
        let res = await fetch(url,{
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'x-access-token': this.state.accessToken,
          },
          body: JSON.stringify({
            commentId: commentId,
          })
        }).then( (data) => data.json() )
          .catch((e) => console.log(e));

        console.log(res);
        this.loadBestComment();
      }

    } catch (errors) {
      console.log(errors);
    }
  }

  rankStar = (rank) => {
    const star = [];
    for (let i = rank; i > 0; i--) {
      if (i >= 1) {
        star.push(
          <IconVec
            key={i}
            style={{ marginRight: 5 }}
            name={'star'}
            size={15}
            color={'gold'}
          />
        );
      } else if (i < 1 && i >= 0.5) {
        star.push(
          <IconVec
            key={'tail'}
            style={{ marginRight: 5 }}
            name={'star-half'}
            size={15}
            color={'gold'}
          />
        );
      }
    }
    if(rank == 0){
      return <Text>暫無評分</Text>
    }
    return star;
  };

  render() {
    // const { region } = this.props;
    //console.log(region);
   const { title, area, address, vacancy, rent, type, checkwater, checkele, checknet, score, phone } = this.state.house;
   return (
     <ScrollView>
       <Header style={{backgroundColor: "rgb(122, 68, 37)"}}>
         <Button transparent onPress={this.prePage.bind(this)}>
           <Icon name='ios-arrow-back' />
         </Button>
         <Title>房屋資訊</Title>
       </Header>
       <View>
         <Image
           source={require('../assets/house.jpg')}
           style={{width:300, height:100, marginTop: 10, alignSelf: 'center' }}
         />
         <Text style={styles.detailText}>房屋名稱: {title}</Text>
         <Text style={styles.detailText}>所在區域: {area}</Text>
         <View style={{flexDirection: 'row'}}>
           <Text style={styles.detailText}>租金:  {rent}/月</Text>
           {this.extra()}
         </View>
         <Text style={styles.detailText}>地址:  {address}</Text>
         <Text style={styles.detailText}>類型:  {type}</Text>
         {this.gmap()}
         <Text style={styles.detailText}>評價: {this.rankStar(score)}{score ? <Text>({score})</Text> : null}</Text>
         <Text style={styles.detailText}>連絡房東: {phone}</Text>
         <TouchableOpacity onPress={ this.commentPage }>
           <Text style={{marginLeft: 33, fontSize: 18, marginTop: 10}}>最佳留言 <IconVec name='chevron-right' /></Text>
         </TouchableOpacity>
         <View style={styles.hr}></View>
         {
           this.state.loading ?
             <ActivityIndicator
               animating={this.state.loading}
               color="rgb(213, 179, 36)"
             /> :
           (this.state.comment.length != 0) ?
           this.state.comment.map((val, index) => {
             return (
               <View key={index}>
               <Comment {...val} thumbs_up={() => this.thumbs_up(val.id)} thumbs_down={() => this.thumbs_down(val.id)}/>
               <View style={styles.hr}></View>
               </View>
             )
           }) : <Text style={{alignSelf: 'center'}}>暫無留言</Text>
         }
       </View>
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
    marginLeft: 33,
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
    left: 250,
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
    marginTop: 10,
    marginBottom: 10,
    marginLeft: 20,
    marginRight: 20,
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
