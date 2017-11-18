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

import IconVec from 'react-native-vector-icons/FontAwesome';
import CheckBox from 'react-native-checkbox';
import StarRating from 'react-native-star-rating';

import Dimensions from 'Dimensions';
const windowSize = Dimensions.get('window');
import Comment from '../component/Comment.js';

import CreateHouseData from './CreateHouseData.js';
import StudentSignin from './StudentSignin.js';

import Swiper from 'react-native-swiper';
import Config from '../../config.json';

const STUDENT_ACCESS_TOKEN = 'student_access_token';

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
    color: '#7b7d85',
    alignSelf:'center'
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
 center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  houseTitle: {
    marginTop: 10,
    marginLeft: 10,
    alignSelf:'center'
  },
  houseImage: {
    width: 300,
    height: 100,
    marginTop: 5,
    marginLeft: 5,
    marginBottom: 5,
    alignSelf: 'center'
  },
  wrapper: {
    height: 300,
  },
  slide1: {
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#9DD6EB',
  },
  slide2: {
    height: 200,
    backgroundColor: '#97CAE5',
  },
  commentSubmitBtn: {
    backgroundColor: 'blue',
  }
});

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
      accessToken: this.props.accessToken,
      houseId: this.props.houseId,
      name: "develop",
      content: "",
      data: [],
      loading: true,
      isLogin: 0,
      loadingisLogin: true,
      starCount: 0,
      sortedData: [],
      slice: 0,
      chooseTime: 0,
      chooseGood: 0,
    }
    this.loadComment = this.loadComment.bind(this);
    this.loadComment();
    this.getToken = this.getToken.bind(this);
    this.getToken();
  }

  loadComment = async () => {
    try {
      const url = Config.backend_url + 'comment/findHouseComment';
      let res = await fetch(url,{
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          houseId: this.state.houseId,
        })
    }).then((data) => data.json())
      .catch((e) => console.log(e));
      console.log(res);
      this.setState({
        data: res.data,
        sortedData: res.data,
        loading: false,
      });

    } catch (errors) {
      console.log(errors);
    }
  }

  onCommentPressed = async() => {
    if(this.state.content.length == 0){
      Alert.alert(
        '錯誤訊息',
        '評論內容不得為空',
        [
          {text:'我知道了',onPress:()=>{}}
        ]
      );
    }else if(this.state.starCount == 0){
      Alert.alert(
        '錯誤訊息',
        '尚未選取星星數',
        [
          {text:'我知道了',onPress:()=>{this._swiper.scrollBy(1)}}
        ]
      );
    }else{
      try {
        let url = Config.backend_url + 'comment/createMyComment';
        let response = await fetch(url, {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'x-access-token': this.state.accessToken,
          },
          body: JSON.stringify({
            houseId: this.state.houseId,
            content: this.state.content,
            star: this.state.starCount,
          })
        }).then( (res) => res.json() )
        .catch( (err) => console.log(err))
        console.log(response);
        if(response.text == 'comment create success'){
          Alert.alert(
            '上傳訊息',
            '評論成功',
            [
              {text:'我知道了',onPress:()=>{this._swiper.scrollBy(1)}}
            ]
          );
          this.setState({
            content: '',
            starCount: 0,
          })
        }
        this.loadComment();
      }catch (errors) {
        console.log(errors);
      }
    }
  }

  prePage() {
    const { navigator } = this.props;
    if(navigator) {
      navigator.pop();
    }
  }

  loadToPrePage = () => {
    this.props.callback();
    this.prePage();
  }

  studentSigninPage = () => {
    const { navigator } = this.props;
    if(navigator) {
        navigator.push({
          name: 'StudentSignin',
          component: StudentSignin,
        })
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
        const url = Config.backend_url + 'like/addLike';
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
        this.loadComment();
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
      else {
        console.log("commentId = " + commentId);
        const url = Config.backend_url + 'like/addDislike';
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
        this.loadComment();
      }

    } catch (errors) {
      console.log(errors);
    }
  }

  deleteToken = async() => {
    try {
        await AsyncStorage.removeItem(STUDENT_ACCESS_TOKEN)
    } catch(error) {
        console.log("Something went wrong");
    }
  }

  onLogout = () => {
    this.deleteToken();
    this.setState({
      error: 'logout',
      isLogin: 0,
    })
  }

  onStarRatingPress(rating) {
    this._swiper.scrollBy(1);
    this.setState({
      starCount: rating
    });
  }

  commentArea = () => {
    if(this.state.isLogin == 1){
      return (
        <Swiper style={styles.wrapper} showsButtons={true} ref={(swiper) => {this._swiper = swiper;}} height={200}>
        <View style={styles.slide1}>
          <StarRating
            disabled={false}
            emptyStar={'star-o'}
            fullStar={'star'}
            halfStar={'star-half'}
            iconSet={'FontAwesome'}
            maxStars={5}
            rating={this.state.starCount}
            selectedStar={(rating) => this.onStarRatingPress(rating)}
            starColor={'gold'}
            buttonStyle={{marginLeft: 15, marginRight: 15, marginTop: 10, marginBottom: 10}}
          />
        </View>
        <View style={styles.slide2}>
          <View>
            <TextInput
              style={{alignSelf:'center',width:windowSize.width/5*4,textAlignVertical: 'top',borderColor:'black',borderRadius:5,borderWidth:0.5,marginTop:5}}
              onChangeText={(content) => this.setState({content})}
              value={this.state.content}
              editable = {true}
              numberOfLines = {4}
              multiline = {true}
              blurOnSubmit={true}
              placeholder="長度限定100字"
              maxLength={100}
            />
            <Text style={styles.houseTitle}> {this.state.content.length}/100</Text>
          </View>
          <View style={{flexDirection: 'row', alignItems: 'flex-end',alignSelf:'center'}}>
            <Button style={styles.commentSubmitBtn} onPress={this.onCommentPressed.bind(this)} > 確認送出 </Button>
          </View>
        </View>
        </Swiper>
      );
    }
    else{
      return (
        <TouchableOpacity onPress={ this.studentSigninPage }><Text style={{alignSelf: 'center'}}>尚未登入</Text></TouchableOpacity>
      )
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

  sortByTime = () => {
    if(this.state.slice == 0){
      let timeForData = this.state.data;
      console.log(timeForData[0].createdAt);
      for(let i=0;i<timeForData.length;i++){
        timeForData[i].createdAt = timeForData[i].createdAt.slice(0, 4) +
                                   timeForData[i].createdAt.slice(5, 7) +
                                   timeForData[i].createdAt.slice(8, 10) +
                                   timeForData[i].createdAt.slice(11, 13) +
                                   timeForData[i].createdAt.slice(14, 16) +
                                   timeForData[i].createdAt.slice(17, 19);
      }
      console.log(timeForData[0].createdAt);
    }
    console.log();
    let sortedData = this.state.sortedData.sort( function (a, b){
      return a.createdAt - b.createdAt;
    })
    this.setState({
      sortedData: sortedData,
      slice: 1,
      chooseTime: 1,
      chooseGood: 0,
    })
  }
  sortByGood = () => {
    let sortedData = this.state.sortedData.sort( function (a, b){
      return b.like - a.like;
    })
    this.setState({
      sortedData: sortedData,
      chooseTime: 0,
      chooseGood: 1,
    })
  }

  dataContent = () => {
      return (
        <View>
          {
            this.state.loadingisLogin ?
              <ActivityIndicator
                animating={this.state.loadingisLogin}
                color="rgb(213, 179, 36)"
              /> : this.commentArea()
          }
          {
            this.state.loading ?
              <ActivityIndicator
                animating={this.state.loading}
                style={styles.spinner}
                color="rgb(213, 179, 36)"
              />
              :
              this.state.data.length > 0 ?
              <View>
                <View style={{flex: 1, flexDirection: 'row'}}>
                  <TouchableOpacity onPress={this.sortByTime}>
                    {
                      this.state.chooseTime == 0 ?
                      <View style={{flex: 1, flexDirection: 'row', marginLeft: 10}}>
                        <Icon name="ios-checkmark" style={{fontSize: 40}}/>
                        <Text style={{marginTop: 5, fontSize: 20}}>按照時間順序</Text>
                      </View>
                      :
                      <View style={{flex: 1, flexDirection: 'row', marginLeft: 10}}>
                        <Icon name="ios-checkmark" style={{fontSize: 40, color: 'green'}}/>
                        <Text style={{marginTop: 5, fontSize: 20, color: 'green'}}>按照時間順序</Text>
                      </View>
                    }
                  </TouchableOpacity>
                  <TouchableOpacity onPress={this.sortByGood}>
                    {
                      this.state.chooseGood == 0 ?
                      <View style={{flex: 1, flexDirection: 'row', marginLeft: 20}}>
                        <Icon name="ios-checkmark" style={{fontSize: 40}}/>
                        <Text style={{marginTop: 5, fontSize: 20}}>按照人氣順序</Text>
                      </View>
                      :
                      <View style={{flex: 1, flexDirection: 'row', marginLeft: 20}}>
                        <Icon name="ios-checkmark" style={{fontSize: 40, color: 'green'}}/>
                        <Text style={{marginTop: 5, fontSize: 20, color: 'green'}}>按照人氣順序</Text>
                      </View>
                    }
                  </TouchableOpacity>
                </View>
              {
                this.state.sortedData.map((val, index) =>
                  <Comment key={index} {...val} thumbs_up={() => this.thumbs_up(val.id)} thumbs_down={() => this.thumbs_down(val.id)} />
                )
              }</View> : <Text style={{alignSelf: 'center'}} >暫無留言</Text>
          }
        </View>
      )
  }

  getToken = async() => {
    try {
      let accessToken = await AsyncStorage.getItem(STUDENT_ACCESS_TOKEN);
      if(!accessToken) {
          console.log("not have token");
          this.setState({loadingisLogin: false});
      } else {
          console.log("accessToken = " + accessToken);
          let text = await this.checkAuth(accessToken);
          console.log("TExt = " + text);
          if(text==='check success'){
            this.setState({accessToken: accessToken});
            this.setState({error: 'success'});
            this.setState({isLogin: 1});
            this.setState({loadingisLogin: false});
          }
          else{
            this.setState({loadingisLogin: false});
            this.setState({isLogin: 1});
            this.setState({error: text});
          }

          console.log("nextpage");
      }
    } catch(error) {
        console.log("catch error = " + error);
    }
  }

  checkAuth = async(token) => {
    try{
      let url = Config.backend_url + 'student/islogin';
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

  render() {
    // const { region } = this.props;
    //console.log(region);

   return (
     <ScrollView style={{flexDirection:'column',flex:1}}>
       <Header style={{backgroundColor: "rgb(122, 68, 37)"}}>
         <Button transparent onPress={this.loadToPrePage.bind(this)}>
           <Icon name='ios-arrow-back' />
         </Button>
         <Title>留言</Title>
       </Header>
        {this.dataContent()}

     </ScrollView>
   );
  }
}
