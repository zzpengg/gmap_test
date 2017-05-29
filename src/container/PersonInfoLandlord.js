

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

import HouseDetailStudent from './HouseDetailStudent.js';
import StudentRegister from './StudentRegister.js';
import HouseComment from './HouseComment.js';
import ImagePicker from 'react-native-image-picker';

import { FBLoginManager } from 'react-native-facebook-login';
import { Loading } from '../component/Loading';
import UserData from '../component/UserData.js';
import PhonePage from './PhonePage.js';
import UpdateAvatar from './UpdateAvatar.js';
import UpdateData from './UpdateData.js';

const ACCESS_TOKEN = 'access_token';

export default class PersonInfoLandlord extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      account: "",
      status: "",
      password: "",
      phone: '',
      accessToken: this.props.accessToken,
      error: "",
      visiable:true,
      upload:false,
      avatarSource:null,
    }
    this.getMyInfo = this.getMyInfo.bind(this);
    this.getMyInfo();
  }

  prePage() {
      const { navigator } = this.props;
      this.props.callBack();
      if(navigator) {
          navigator.pop();
      }
  }

  async deleteToken() {
    try {
        await AsyncStorage.removeItem(ACCESS_TOKEN)
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
    this.props.callBack();
    this.prePage();
  }

  async getMyInfo(token) {
    try{
      let token = this.state.accessToken;
      let url = 'http://test-zzpengg.c9users.io:8080/user/getMyInfo';
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

      console.log(response.data.avatar);
      await this.setState({
        name: response.data.name,
        account: response.data.account,
        password: response.data.password,
        phone: response.data.phone,
        avatar: response.data.avatar,
        visible: false,
      })
      return response.text;
    }catch(error){
      console.log("catch error = " + error);
      return error;
    }
  }

  updateMyInfo = async() => {
    try {
      let url = 'http://test-zzpengg.c9users.io:8080/user/updateMyInfo';
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
          phone: this.state.phone,
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
            {text:'我知道了', onPress:() => { this.prePage() }}
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
      let url = 'https://test-zzpengg.c9users.io:8080/user/upload';
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

  phonePage = () => {
    const { navigator } = this.props;
    navigator.push({
      name: 'PhonePage',
      component: PhonePage,
      params: {
        accessToken: this.state.accessToken,
        phone: this.state.phone,
        callBack: this.getMyInfo,
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

  updateDataPage = () => {
    const { navigator } = this.props;
    console.log("***updateDataPage***");
    navigator.push({
      name: 'UpdateData',
      component: UpdateData,
      params: {
        accessToken: this.state.accessToken,
        callBack: this.getMyInfo,
        name: this.state.name,
        identity: 'landlord',
      }
    });
  }

  render() {
   return (
     <View style={styles.container}>
       <Modal
       visible={this.state.visible}
       animationType={"slide"}
       onRequestClose={() => {}}
       >
         <View style={{flex: 1,  flexDirection: 'column',justifyContent: 'center',alignItems: 'center'}}>
           <View >
             <Text>載入中...</Text>
             <Spinner color='blue'/>
           </View>
         </View>
       </Modal>
       <Header style={{backgroundColor: "rgb(122, 68, 37)"}}>
         <Button transparent onPress={this.prePage.bind(this)}>
           <Icon name='ios-arrow-back' />
         </Button>
         <Title>個人資料</Title>
       </Header>
       <Content style={{backgroundColor: '#DDDDDD'}}>
         <TouchableOpacity onPress={this.updateAvatarPage}>
           <View style={{flex: 1, flexDirection: 'row', backgroundColor: 'white'}}>
             <View style={[styles.avatar, styles.avatarContainer, {marginBottom: 20}]}>
             {
               this.state.avatarSource == null ?
               <Image style={styles.avatar} source={require('../assets/landlord-icon.png')} /> :
               <Image style={styles.avatar} source={{uri: `http://test-zzpengg.c9users.io:8080/images/avatar/landlord/${this.state.id}`+'/'+`${this.state.avatarSource}`}} />
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
         <UserData title="電話" value={this.state.phone} updateDataPage={this.phonePage} />
         <UserData title="問題回報" value="" updateDataPage={this.issuePage} />
         <Button style={styles.submitBtn} onPress={this.onLogout.bind(this)} block info> 登出 </Button>
       </Content>
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
