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
import StudentRegister from './StudentRegister.js';
import HouseComment from './HouseComment.js';
import ImagePicker from 'react-native-image-picker';
import { FBLoginManager } from 'react-native-facebook-login';


const STUDENT_ACCESS_TOKEN = 'student_access_token';

export default class PersonInfoStudent extends Component {
  constructor(props) {
    super(props);
    this.state = {
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
      let url = 'http://test-zzpengg.c9users.io:8080/student/getMyInfo';
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
        name: response.data.name,
        account: response.data.account,
        password: response.data.password,
      })
      return response.text;
    }catch(error){
      console.log("catch error = " + error);
      return error;
    }
  }

  onLoginPressed = async() => {
    try {
      let url = 'http://test-zzpengg.c9users.io:8080/student/login';
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
      name: 'StudentRegister',
      component: StudentRegister,
      params: {
        accessToken: this.state.accessToken
      }
    });
  }

  updateMyInfo = async() => {
    try {
      let url = 'http://test-zzpengg.c9users.io:8080/student/updateMyInfo';
      let response = await fetch(url, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'x-access-token': this.state.accessToken,
        },
        body: JSON.stringify({
          name: this.state.name,
          password: this.state.password,
        })
      }).then( (data) => data.json() )
      console.log("pressed");
      console.log(response);
      if(response.text === 'updateMyInfo success'){
        //Handle success
        //On success we will store the access_token in the AsyncStorage
        this.setState({error: 'success'});
        Alert.alert('訊息',
          '修改成功',
          [
            {text:'我知道了',onPress:()=>{}}
          ]
        );
      } else {
            //Handle error
            let error = res;
            throw error;
      }
    } catch(error){
      let str=""+error;
      Alert.alert('錯誤訊息',
      str,
      [
        {text:'我知道了',onPress:()=>{}}
      ]
    );
      console.log("error " + error);
    }
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
           <Button onPress={this.nextPageRegister} style={styles.submitBtn} block warning> 註冊 </Button>
           <View style={{ alignItems: 'center' }}>
             <View style={styles.orWrapper}>
               <Text style={styles.orText}>or</Text>
             </View>
             <View style={styles.hr} />
           </View>
           <Button style={styles.submitBtn} onPress={this.onLoginPressed} block info> 登入 </Button>
         </List>
         </Content>
         :
         <Content>
         <View style={styles.loginform}>
           <Loading label="上傳中" visible={this.state.upload}/>
           <View>
             {
               /*this.state.avatar == null ?
               <Image source={require('../assets/fuck_cat.jpg')} style={styles.personImage} />
               :
               <Image source={{uri: `https://test-zzpengg.c9users.io:8080/images/${this.state.avatar}`}} style={styles.personImage} />*/
             }
             <View style={styles.viewFlexRow} >
                <View style={{padding:10}}>
                  <View style={{marginLeft: 60}} >
                   <TouchableOpacity onPress={this.selectPhotoTapped.bind(this)}>
                     <View style={[styles.avatar, styles.avatarContainer, {marginBottom: 20}]}>
                     { this.state.avatarSource === null ? <Text>選擇照片</Text> :
                       <Image style={styles.avatar} source={this.state.avatarSource} />
                     }
                     </View>
                     <Text style={{marginLeft: 100}}>{this.state.uploadState}</Text>
                   </TouchableOpacity>
                   </View>
                   <TouchableOpacity style={{marginLeft:80}} onPress={this.upload}>
                     <Text >按此上傳圖片</Text>
                   </TouchableOpacity>
                 </View>
             </View>
             <View style={{alignSelf: 'center'}}>
               <Text style={{fontSize: 32}}>{this.state.account}</Text>
             </View>
             <View style={{alignSelf: 'center', flexDirection: 'row'}}>
               <Text style={{paddingTop:13, paddingLeft: 30, fontSize: 15, color: '#7b7d85'}}>名字</Text>
               <Text style={{paddingTop:13, paddingLeft: 30, fontSize: 15, color: '#7b7d85'}}>{this.state.name}</Text>
               <Icon name="ios-arrow-forward" />
               {/*<Input style={{borderColor: 'red', borderWidth: 5, marginLeft: 15}} onChangeText={ (name) => this.setState({ name: name }) } value={this.state.name}></Input>*/}
             </View>
             <View style={{alignSelf: 'center', flexDirection: 'row'}}>
               <Text style={{paddingTop:13, paddingLeft: 30, fontSize: 15, color: '#7b7d85'}}>密碼</Text>
               <Input style={{borderColor: 'red', borderWidth: 5, marginLeft: 15}} onChangeText={ (password) => this.setState({ password: password }) } value={this.state.password}></Input>
             </View>
            </View>
            <Button style={styles.submitBtn}  onPress={this.updateMyInfo} block warning> 確認修改 </Button>
            <Button style={styles.submitBtn} onPress={this.onLogout.bind(this)} block info> 登出 </Button>
          </View>

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
    width: 150,
    height: 150
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
