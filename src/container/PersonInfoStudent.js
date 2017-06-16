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
  AsyncStorage,
  Image,
  Modal,
  Alert,
  TouchableOpacity,
  PixelRatio,
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
  Spinner,
} from 'native-base';
import { Loading } from '../component/Loading.js';
import HouseDetailStudent from './HouseDetailStudent.js';
import StudentChooseRegister from './StudentChooseRegister.js';
import HouseComment from './HouseComment.js';
import {FBLogin, FBLoginManager} from 'react-native-facebook-login';
import UpdateData from './UpdateData.js';
import ImagePicker from 'react-native-image-picker';
import LoveList from './LoveList.js';
import IssueList from './IssueList.js';
import UpdateAvatar from './UpdateAvatar.js';
import UserData from '../component/UserData.js';

const STUDENT_ACCESS_TOKEN = 'student_access_token';

export default class PersonInfoStudent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: '',
      name: "",
      account: "",
      status: "",
      password: "",
      accessToken: "",
      error: "",
      visible:true,
      upload: false,
      avatarSource: null,
    }
  }

  componentWillMount() {
    this.getToken();
  }

  getToken = async() => {
    try {
      let accessToken = await AsyncStorage.getItem(STUDENT_ACCESS_TOKEN);
      if(!accessToken) {
          console.log("not have token");
          this.setState({visible:false});
      } else {
          this.setState({accessToken: accessToken});
          console.log("accessToken = " + accessToken);
          let text = await this.getMyInfo(accessToken);
          console.log("text = " + text);
          if(text == 'getMyInfo success'){
            this.setState({error: 'success'});
            this.setState({visible: false});
            console.log('success');
          }
          else{
            console.log(text);
            this.setState({visible: false});
            this.setState({error: text});
          }

      }
    } catch(error) {
        console.log("catch error = " + error);
        this.setState({visible: false});
    }
  }

  prePage() {
      const { navigator } = this.props;
      if(navigator) {
          navigator.pop();
      }
  }
onFBLogin = async(data) => {
    await this.setState({loginloading:true});
    console.log("log in");
    console.log(data.credentials);
    const { token, userId } = data.credentials;
    console.log(token);
    console.log(userId);
    try {
      let url = `https://graph.facebook.com/v2.8/${userId}?access_token=${token}&fields=name,picture,gender,email`;
      let response = await fetch(url).then( (data) => data.json() )
      console.log('response = ');
      console.log(response);
      console.log(response.name);
      console.log(response.gender);
      console.log(response.picture.data.url);

      // fb login
      let url2 = 'http://ncuerent.ddns.net:1337/student/FBLogin';
      let response2 = await fetch(url2, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: response.name,
          gender: response.gender,
          email: response.email,
          account: response.name,
          userId: userId,
          password: token,
          avatar: response.picture.data.url
        })
      }).then( (data) => data.json() );
      console.log(response2);
      let accessToken = response2.token;
      console.log(accessToken);
      //On success we will store the access_token in the AsyncStorage
      this.storeToken(accessToken);
      this.setState({accessToken: accessToken,loginloading:false})
      this.setState({error: 'success'});
      this.getToken(accessToken);

    }
    catch(err){
      console.log(err);
    }
  }
  storeToken(responseData){
    AsyncStorage.setItem(STUDENT_ACCESS_TOKEN, responseData, (err)=> {
      if(err){
        console.log("an error");
        throw err;
      }
      console.log("success");
    }).catch((err)=> {
        console.log("error is: " + err);
    });
  }

  async deleteToken() {
    try {
        await AsyncStorage.removeItem(STUDENT_ACCESS_TOKEN)
    } catch(error) {
        console.log("Something went wrong");
    }
  }

  onLogout(){
    FBLoginManager.logout( (data) => {console.log(data) });
    this.deleteToken();
    this.setState({
      error: 'logout'
    })
    console.log('callback called');
    this.prePage();
  }

  async getMyInfo(token) {
    try{
      let url = 'http://ncuerent.ddns.net:1337/student/getMyInfo';
      let response = await fetch(url, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'x-access-token': token,
        }
      }).then( (data) => data.json() )
      .catch( (err) => console.log(err) )
      console.log("getMyInfo");
      console.log("response");
      console.log(response);
      await this.setState({
        id: response.data.id,
        name: response.data.name,
        account: response.data.account,
        password: response.data.password,
        avatarSource: response.data.avatar
      })
      console.log(this.state.id + ' ' + this.state.avatarSource);
      return response.text;
    }catch(error){
      console.log("catch error = " + error);
      return error;
    }
  }

  onLoginPressed = async() => {
    try {
      let url = 'http://ncuerent.ddns.net:1337/student/login';
      let response = await fetch(url, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          account: this.state.account,
          password: this.state.password,
        })
      }).then( (data) => data.json() )
      console.log("pressed");
      console.log(response);
      this.setState({
        status: 'pressed'
      })
      if(response.text === 'login success'){
        //Handle success
        let accessToken = response.token;
        console.log(accessToken);
        //On success we will store the access_token in the AsyncStorage
        this.storeToken(accessToken);
        this.setState({accessToken: accessToken})
        this.setState({error: 'success'});
        this.getToken(accessToken);
      } else if(response.text=== "validate error"){
        Alert.alert('錯誤訊息',
          "信箱尚未驗證\n請至信箱驗證帳戶",
          [
            {text:'我知道了',onPress:()=>{}}
          ]
        );
      }
      else {
            //Handle error
            let error = response;
            throw error;
      }
    } catch(error){
      Alert.alert('錯誤訊息',
      "發生錯誤",
      [
        {text:'我知道了',onPress:()=>{}}
      ]
    );
      console.log("error " + error);
    }
  }

  nextPageRegister = () => {
    const { navigator } = this.props;
    navigator.push({
      name: 'StudentChooseRegister',
      component: StudentChooseRegister,
      params: {
        accessToken: this.state.accessToken
      }
    });
  }

  updateDataPage = () => {
    const { navigator } = this.props;
    console.log("***updateDataPage***");
    navigator.push({
      name: 'UpdateData',
      component: UpdateData,
      params: {
        accessToken: this.state.accessToken,
        callBack: this.getToken,
        name: this.state.name,
        identity: 'student',
      }
    });
  }

  lovePage = () => {
    const { navigator } = this.props;
    navigator.push({
      name: 'LoveList',
      component: LoveList,
      params: {
        accessToken: this.state.accessToken,
      }
    });
  }

  issuePage = () => {
    const { navigator } = this.props;
    navigator.push({
      name: 'IssueList',
      component: IssueList,
      params: {
        accessToken: this.state.accessToken,
      }
    });
  }

  updateAvatarPage = () => {
    const { navigator } = this.props;
    navigator.push({
      name: 'UpdateAvatar',
      component: UpdateAvatar,
      params: {
        accessToken: this.state.accessToken,
      }
    });
  }

  selectPhotoTapped() {
   const options = {
     title: '取得照片',
     cancelButtonTitle: '取消',
     takePhotoButtonTitle: '開啟相機',
     chooseFromLibraryButtonTitle: '從圖片庫尋找',
     quality: 1.0,
     maxWidth: 500,
     maxHeight: 500,
     storageOptions: {
       skipBackup: true
     }
   };

   ImagePicker.showImagePicker(options, async (response) => {
     console.log('Response = ', response);

     if (response.didCancel) {
       console.log('User cancelled photo picker');
     }
     else if (response.error) {
       console.log('ImagePicker Error: ', response.error);
     }
     else if (response.customButton) {
       console.log('User tapped custom button: ', response.customButton);
     }
     else {
       let source = { uri: response.uri };
       console.log(response.type);
       await this.setState({fileType:response.type});
       // You can also display the image using data:
       // let source = { uri: 'data:image/jpeg;base64,' + response.data };
       console.log(source);
      this.setState({
         avatarSource: source,
      })
    }});
  }

  upload = async() => {
    if(this.state.fileType!="image/jpeg"){
      Alert.alert("檔案型態錯誤","照片格式僅限jpg檔",[
        {text:"我知道了",onPress:()=>{this.setState({avatarSource:null})}}
      ]);
    }
    else{
      this.setState({upload:true})
      let data = new FormData()
      let id = this.props.id;
      data.append('id', id);
      data.append('avatar', {...this.state.avatarSource, type: 'image/jpeg', name: 'image.jpg',});
      let url = 'https://test-zzpengg.c9users.io:8080/student/upload';
      let check = 1;
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'multipart/form-data',
          'x-access-token': this.state.accessToken
        },
        body: data
      }).then( (res) => res.json() )
      .catch( async(err) => {
        console.log(err);
        await this.setState({
          upload: false,
          avatarSource:null
        })
        Alert.alert("上傳訊息","上傳失敗",[{text:"我知道了",onPress:()=>{}}]);
        check = 0;
      })
      console.log(response);
      if(response.text === "success upload" && check == 1){
        await this.setState({
          upload: false,
          avatarSource:null
        })
        Alert.alert("上傳訊息","上傳成功",[{text:"我知道了",onPress:()=>{}}]);
      }
      // await this.loadTheHouse();
      console.log(response);
    }
  }

  render() {
   return (
     <View style={styles.container}>
     <Loading label="載入中..." visible={this.state.visible}/>
       <Header style={{backgroundColor: "rgb(122, 68, 37)"}}>
         <Button transparent onPress={this.prePage.bind(this)}>
           <Icon name='ios-arrow-back' />
         </Button>
         <Title>個人資料</Title>
       </Header>
       {
          (this.state.error != 'success') ?
          <Content>
          <List style={styles.form}>
           <ListItem style={{ marginTop: 15 }}>
             <InputGroup borderType="regular" style={{ borderRadius: 5 }} >
               <Icon name="ios-person" />
               <Input onChangeText={(account) => {this.setState({account})}} placeholder="帳號" />
             </InputGroup>
           </ListItem>
           <ListItem style={{ marginTop: 10 }}>
             <InputGroup borderType="regular" style={{ borderRadius: 5 }} >
               <Icon name="ios-unlock" />
               <Input onChangeText={(password) => {this.setState({password})}} placeholder="密碼" secureTextEntry={true}/>
             </InputGroup>
           </ListItem>

           <Button style={styles.submitBtn} onPress={this.onLoginPressed} block info> 登入 </Button>
            <View style={{ alignItems: 'center' }}>
             <View style={styles.orWrapper}>
               <Text style={styles.orText}>or</Text>
             </View>
             <View style={styles.hr} />
           </View>
                     <FBLogin
              loginText="Facebook 登入"
              style={styles.submitBtn}
              ref={(fbLogin) => { this.fbLogin = fbLogin }}
              loginBehavior={FBLoginManager.LoginBehaviors.Native}
              permissions={["public_profile","email","user_friends" ]}
              onLogin={this.onFBLogin}
              onLoginFound={function(data){console.log(data.credentials)}}
              onLoginNotFound={function(e){console.log(e)}}
              onLogout={function(e){console.log(e)}}
              onCancel={function(e){console.log(e)}}
              onPermissionsMissing={function(e){console.log(e)}}/>
              <TouchableOpacity onPress={this.nextPageRegister.bind(this)}>  
                <Text style={{marginTop:15,textAlign:'center',color:'blue',fontSize:15}}>註冊新帳號</Text>
              </TouchableOpacity>
         </List>
         </Content>
         :
         <Content style={{backgroundColor: '#DDDDDD'}}>
          <TouchableOpacity onPress={this.updateAvatarPage}>
           <View style={{flex: 1, flexDirection: 'row', backgroundColor: 'white'}}>
             <View style={[styles.avatar, styles.avatarContainer, {marginBottom: 20}]}>
             {
               this.state.avatarSource == null ?
               <Image style={styles.avatar} source={require('../assets/student-icon.png')} /> :
               <Image style={styles.avatar} source={{uri: `http://ncuerent.ddns.net:1337/images/avatar/student/${this.state.id}`+'/'+`${this.state.avatarSource}`}} />
             }

             </View>
             <Text style={{marginTop: 40, fontSize: 20, marginLeft: 20}}>個人圖片</Text>
           </View>
           </TouchableOpacity>
           <View>
             <Button style={{backgroundColor: '#FFFFFF', }} block >
               <View style={{flex: 1, justifyContent: 'space-between', flexDirection: 'row'}}>
                 <Text style={{color: 'black', marginTop: 3}}>帳號</Text>
                 <View style={{flexDirection: 'row'}}>
                   <Text style={{color: 'black', marginRight: 5, marginTop: 3}}>{this.state.account}</Text>
                 </View>
               </View>
             </Button>
           </View>
           <UserData title="暱稱" value={this.state.name} updateDataPage={this.updateDataPage} />
           <UserData title="我的最愛" value="" updateDataPage={this.lovePage} />
           <UserData title="問題回報" value="" updateDataPage={this.issuePage} />
           <Button style={styles.submitBtn} onPress={this.onLogout.bind(this)} block info> 登出 </Button>
         </Content>
      }
      </View>
   );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fffbe2',
    flex: 1,
    justifyContent: 'center',
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
    marginTop: 50,
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
  loginform: {
    marginTop: 20,
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
    marginRight: 18,
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
    width:38,
    height:38,
    position: 'absolute',
    top: 0,
    left: 0,
  },
  dataView: {
    flexDirection: 'row',
    marginLeft: 10,
    marginTop: 10,
    marginRight: 10,
    borderRadius: 5,
    borderColor: 'gray',
    borderWidth: 5
  },
  imageText: {
    textAlign: 'center'
  },
  detailText: {
    marginTop: 5,
  },
  detailData: {
    alignSelf:'flex-end',
    flexDirection: 'row',
    width: 220,
    flex:1,
    justifyContent: 'flex-end'
  },
  personImage: {
    width: 200,
    height: 180,
    marginTop: 5,
    marginLeft: 5,
    marginBottom: 5,
    alignSelf: 'center',
  },
  commentView: {
    marginTop: 30,
    marginLeft: 5,
    marginBottom: 5,
    borderColor: 'red',
    borderRadius: 2,
    borderWidth: 5,
    width: 350,
    alignSelf: 'center'
  },
  logoutBtn: {
    marginLeft: 10,
    marginTop: 10,
    alignSelf: 'center',
    width: 300,
  },
  avatar: {
    borderRadius: 75,
    width: 100,
    height: 100
  },
  avatarContainer: {
    borderColor: '#9B9B9B',
    borderWidth: 1 / PixelRatio.get(),
    justifyContent: 'center',
    alignItems: 'center'
  },
  viewFlexRow: {
    flexDirection: 'row'
  },
});
