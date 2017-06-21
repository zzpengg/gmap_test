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
import UpdateData from './UpdateData.js';
import ImagePicker from 'react-native-image-picker';
import { FBLoginManager } from 'react-native-facebook-login';
import LoveList from './LoveList.js';
import IssueList from './IssueList.js';

const STUDENT_ACCESS_TOKEN = 'student_access_token';

export default class UpdateAvatar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      account: "",
      status: "",
      password: "",
      accessToken: this.props.accessToken,
      error: "",
      visible: true,
      upload: false,
      avatarSource: null,
    }
  }

  prePage() {
    const { navigator } = this.props;
    if (navigator) {
      navigator.pop();
    }
  }

  async getMyInfo(token) {
    try {
      let url = 'http://ncuerent.ddns.net:1337/student/getMyInfo';
      let response = await fetch(url, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'x-access-token': token,
        }
      }).then((data) => data.json())
        .catch((err) => console.log(err))
      console.log("getMyInfo");
      console.log("response");
      console.log(response);
      await this.setState({
        name: response.data.name,
        account: response.data.account,
        password: response.data.password,
        avatar: response.data.avatar
      })
      return response.text;
    } catch (error) {
      console.log("catch error = " + error);
      return error;
    }
  }

  onLoginPressed = async () => {
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
      }).then((data) => data.json())
      console.log("pressed");
      console.log(response);
      this.setState({
        status: 'pressed'
      })
      if (response.text === 'login success') {
        //Handle success
        let accessToken = response.token;
        console.log(accessToken);
        //On success we will store the access_token in the AsyncStorage
        this.storeToken(accessToken);
        this.setState({ accessToken: accessToken })
        this.setState({ error: 'success' });
        this.getToken(accessToken);
      } else if (response.text === "validate error") {
        Alert.alert('錯誤訊息',
          "信箱尚未驗證\n請至信箱驗證帳戶",
          [
            { text: '我知道了', onPress: () => { } }
          ]
        );
      }
      else {
        //Handle error
        let error = response;
        throw error;
      }
    } catch (error) {
      Alert.alert('錯誤訊息',
        "發生錯誤",
        [
          { text: '我知道了', onPress: () => { } }
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

  updateMyInfo = async () => {
    try {
      let url = 'http://ncuerent.ddns.net:1337/student/updateMyInfo';
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
      }).then((data) => data.json())
      console.log("pressed");
      console.log(response);
      if (response.text === 'updateMyInfo success') {
        //Handle success
        //On success we will store the access_token in the AsyncStorage
        this.setState({ error: 'success' });
        Alert.alert('訊息',
          '修改成功',
          [
            { text: '我知道了', onPress: () => { } }
          ]
        );
      } else {
        //Handle error
        let error = res;
        throw error;
      }
    } catch (error) {
      let str = "" + error;
      Alert.alert('錯誤訊息',
        str,
        [
          { text: '我知道了', onPress: () => { } }
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
        await this.setState({ fileType: response.type });
        // You can also display the image using data:
        // let source = { uri: 'data:image/jpeg;base64,' + response.data };
        console.log(source);
        this.setState({
          avatarSource: source,
        })
      }
    });
  }

  uploadStudent = async () => {
    if (this.state.fileType != "image/jpeg") {
      Alert.alert("檔案型態錯誤", "照片格式僅限jpg檔", [
        { text: "我知道了", onPress: () => { this.setState({ avatarSource: null }) } }
      ]);
    }
    else {
      this.setState({ upload: true })
      let data = new FormData()
      let id = this.props.id;
      data.append('id', id);
<<<<<<< HEAD
      data.append('avatar', {...this.state.avatarSource, type: 'image/jpeg', name: 'image.jpg',});
=======
      data.append('avatar', { ...this.state.avatarSource, type: 'image/jpeg', name: 'image.jpg', });
>>>>>>> upstream/master
      let url = 'http://ncuerent.ddns.net:1337/student/upload';
      let check = 1;
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'multipart/form-data',
          'x-access-token': this.state.accessToken
        },
        body: data
      }).then((res) => res.json())
        .catch(async (err) => {
          console.log(err);
          await this.setState({
            upload: false,
            avatarSource: null
          })
          Alert.alert("上傳訊息", "上傳失敗", [{ text: "我知道了", onPress: () => { } }]);
          check = 0;
        })
      console.log(response);
      if (response.text === "success upload" && check == 1) {
        await this.setState({
          upload: false,
          avatarSource: null
        })
        Alert.alert("上傳訊息", "上傳成功", [{ text: "我知道了", onPress: () => { } }]);
      }
      // await this.loadTheHouse();
      console.log(response);
    }
  }

  uploadLandlord = async () => {
    if (this.state.fileType != "image/jpeg") {
      Alert.alert("檔案型態錯誤", "照片格式僅限jpg檔", [
        { text: "我知道了", onPress: () => { this.setState({ avatarSource: null }) } }
      ]);
    }
    else {
      this.setState({ upload: true })
      let data = new FormData()
      let id = this.props.id;
      data.append('id', id);
      data.append('avatar', { ...this.state.avatarSource, type: 'image/jpeg', name: 'image.jpg', });
      let url = 'http://ncuerent.ddns.net:1337/user/upload';
      let check = 1;
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'multipart/form-data',
          'x-access-token': this.state.accessToken
        },
        body: data
      }).then((res) => res.json())
        .catch(async (err) => {
          console.log(err);
          await this.setState({
            upload: false,
            avatarSource: null
          })
          Alert.alert("上傳訊息", "上傳失敗", [{ text: "我知道了", onPress: () => { } }]);
          check = 0;
        })
      console.log(response);
      if (response.text === "success upload" && check == 1) {
        await this.setState({
          upload: false,
          avatarSource: null
        })
        Alert.alert("上傳訊息", "上傳成功", [{ text: "我知道了", onPress: () => { } }]);
      }
      // await this.loadTheHouse();
      console.log(response);
    }
  }

  updateDataPage = () => {
    const { navigator } = this.props;
    navigator.push({
      name: 'UpdateData',
      component: UpdateData,
      params: {
        accessToken: this.state.accessToken,
        name: this.state.name
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

  render() {
    return (
      <View style={styles.container}>
        <Header style={{ backgroundColor: "rgb(122, 68, 37)" }}>
          <Button transparent onPress={this.prePage.bind(this)}>
            <Icon name='ios-arrow-back' />
          </Button>
          <Title>上傳照片</Title>
        </Header>
        <Content style={{ backgroundColor: '#DDDDDD' }}>
          <View style={styles.viewFlexRow} >
            <View style={{ padding: 10 }}>
              <View style={{ marginLeft: 60 }} >
                <TouchableOpacity onPress={this.selectPhotoTapped.bind(this)}>
                  <View style={[styles.avatar, styles.avatarContainer, { marginBottom: 20 }]}>
                    {this.state.avatarSource === null ? <Text>選擇照片</Text> :
                      <Image style={styles.avatar} source={this.state.avatarSource} />
                    }
                  </View>
                  <Text style={{ marginLeft: 100 }}>{this.state.uploadState}</Text>
                </TouchableOpacity>
              </View>
              {
                this.props.identity == 'student' ?
                  <TouchableOpacity style={{ marginLeft: 80 }} onPress={this.uploadStudent}>
                    <Text >按此上傳圖片</Text>
                  </TouchableOpacity>
                  :
                  <TouchableOpacity style={{ marginLeft: 80 }} onPress={this.uploadLandlord}>
                    <Text >按此上傳圖片</Text>
                  </TouchableOpacity>
              }

            </View>
          </View>
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
      { translateY: 23 },
    ],
    width: 25,
    height: 25,
    zIndex: 10000,
    padding: 2,
    paddingLeft: 4,
  },
  bgImg: {
    width: 38,
    height: 38,
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
    alignSelf: 'flex-end',
    flexDirection: 'row',
    width: 220,
    flex: 1,
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
