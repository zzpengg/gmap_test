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


import Dimensions from 'Dimensions';
const windowSize = Dimensions.get('window');
import Comment from '../component/Comment.js';

import CreateHouseData from './CreateHouseData.js';
import StudentSignin from './StudentSignin.js';

const STUDENT_ACCESS_TOKEN = 'student_access_token';

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
      userId: this.props.userId||0,
      name: "develop",
      content: "",
      data: [],
      loading: true,
      isLogin: 0,
      loadingisLogin: true,
    }
    this.loadComment = this.loadComment.bind(this);
    this.loadComment();
    this.getToken = this.getToken.bind(this);
    this.getToken();
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

  prePage() {
    const { navigator } = this.props;
    if(navigator) {
        navigator.pop();
    }
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

  commentArea = () => {
    if(this.state.isLogin == 1){
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
    }else{
      return (
        <TouchableOpacity onPress={ this.studentSigninPage }><Text>尚未登入</Text></TouchableOpacity>
      )
    }

  }

  dataContent = () => {
      return (
        <View>
          {
            this.state.loadingisLogin ?
              <ActivityIndicator
                animating={this.state.loadingisLogin}
                color="rgb(213, 179, 36)"
              /> : null
          }
          {this.commentArea()}
          {
            this.state.loading ?
              <ActivityIndicator
                animating={this.state.loading}
                style={styles.spinner}
                color="rgb(213, 179, 36)"
              /> : null
          }
          {
            this.state.data.map((val, index) => {
              return (<Comment key={index+2} name={val.name} content={val.content} score={val.score}/>)
            })
          }
        </View>
      )
  }

  getToken = async() => {
    try {
      let accessToken = await AsyncStorage.getItem(STUDENT_ACCESS_TOKEN);
      if(!accessToken) {
          console.log("not have token");
      } else {
          console.log("accessToken = " + accessToken);
          let text = await this.checkAuth(accessToken);
          console.log("TExt = " + text);
          if(text==='check success'){
            this.setState({accessToken: accessToken})
            this.setState({error: 'success'});
            this.setState({isLogin: 1});
            this.setState({loadingisLogin: false});
          }
          else{
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
      let url = 'http://test-zzpengg.c9users.io:8080/student/islogin';
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
         <Button transparent onPress={this.prePage.bind(this)}>
           <Icon name='ios-arrow-back' />
         </Button>
         <Title>留言</Title>
       </Header>
        {this.dataContent()}

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
