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
  ScrollView,
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
  ListItem,
  InputGroup,
  Input,
  Spinner,
} from 'native-base';
import {FBLogin, FBLoginManager} from 'react-native-facebook-login';
import FBLoginView from'../component/FBLoginView'
import {Loading} from '../component/Loading.js'
import LandlordSignin from './LandlordSignin.js'
import StudentRegister from './StudentRegister.js'
import Dimensions from 'Dimensions';
import HouseData from './HouseData.js'
import IconVec from 'react-native-vector-icons/FontAwesome';
import Config from '../../config.json';
const windowSize = Dimensions.get('window');
const ACCESS_TOKEN = 'access_token';
export default class StudentChooseRegister extends Component{
    constructor(props){
        super(props)
        this.state={
            content:"隱私權與免責聲明\n隱私權政策\n若您不同意本隱私權政策之全部或部分者，請您停止使用本服務。\n1. 本隱私權政策適用之範圍\n請您在於使用本服務前，確認您已審閱並同意本隱私權政策所列全部條款，若您不同意全部或部分者，則請勿使用本服務。\n本隱私權政策僅適用於本服務對您個人資料所為蒐集、處理處理及使用，不及於其他非本團隊所有或控制之其他團隊或個人。\n您可能經由本服務連結第三人所經營之服務，各該服務所為之個人資料蒐集是依其服務之隱私權政策規定處理，與本團隊無涉。\n2. 個人資料保護法應告知事項\n(1) 蒐集機關名稱：彰師資工107級專題\n(2) 蒐集目的：提供本團隊相關服務、行銷、客戶管理、會員管理及其他與第三任合作之行銷推廣活動\n(3) 個人資料類別：識別類（姓名、地址、聯絡電話、電子郵件信箱等）\n特徵類（年齡、性別、出生年月日等）\n其他（往來電子郵件、服務留言、系統自動記錄之軌跡資訊等）。\n(4) 個人資料使用期間：本服務會員有效期間及終止後六個月 ; 若非會員則於該蒐集個人資料之目的消失後六個月。\n(5) 個人資料使用地區：本團隊執行業務及伺服器所在地，目前為台灣地區。\n(6) 個人資料使用對象：本團隊及本團隊委外之協力廠商（例如：提供物流、金流或活動贈品之廠商）;\n如為本團隊與其他廠商公同蒐集者，將於該共同蒐集之活動中載明。\n(7) 個人資料使用方式：依蒐集目的範圍及本隱私權政策進行使用\n(8) 行使個人資料權利方式：依個人資料保護法第三條規定，您就您的個人資料享有查訊或請求閱覽、補充或更正、停止蒐集、處理或使用、刪除之權利。\n您可以書面方式郵寄至『進德路1號』行使上開權利，本團隊將於收悉您的請求後，儘速處理。\n(9) 個人資料選填說明：若本團隊於蒐集個人資料時，相關網頁或文件載明為選填及必填者，僅為提供您使用本服務之後續更佳體驗。\n3. 個人資料蒐集、處理及使用說明\n本團隊可能透過 Facebook 或類似社群服務系統，於取得您的同意後，將部分本服務的資訊發佈於您的社群活動資訊頁面，若您不同意該等訊息之發布，\n請您勿點選同意鍵，或於事後透過各該社群服務之會員機制移除該等資訊或拒絕本服務繼續發布相關訊息。\n除依法應提供於司法、檢調機關、相關主管機構，或本團隊協力廠商為執行相關活動必要範圍之使用外，\n本團隊不會任意將您的個人資料提供予第三人。\n4. Cookie 技術\n為便日後的辨識，當您使用本服務服務時，本團隊可能會在您的電腦上設定與存取 Cookie。\n您可以透過設定您的個人電腦或上網設備，決定是否允許 Cookie 技術的使用，\n若您關閉 Cookie時，可能會造成您使用本服務服務時之不便利或部分功能限制。\n5. 保密與安全性\n本團隊之員工，僅於為您提供產品或服務之需求範圍內，對於您的個人資料得為有限之接觸。\n為了保護您的帳戶及個人資料的安全，請您不要任意將個人帳號、密碼提供予第三人或第三人以您的個人資料申請帳號、密碼，\n否則，相關責任將由您自行承擔。若您的帳號、密碼有外洩之虞，請您立即更改密碼，或通知本團隊暫停該帳號（本團隊需先要求核對您的個人資料）。\n網際網路並不是一個安全的資訊傳輸環境，請您在使用本服務時，避免將敏感的個人資料提供予他人或在服務上公開揭露。\n6. 未成年/兒童保護\n本服務並非特別為未成年人/兒童設計，未成年人使用本服務時，若同意本服務蒐集、使用其個人資料時，應在法定代理人或監護人之同意下為之。\n法定代理人或監護人得隨時請求本團隊停止特定帳號及其相關之個人資料之蒐集、處理或使用行為。\n7. 隱私權政策之修改\n本團隊可能會修改此隱私權政策，因此你應該定期到訪本頁，確保你已閱讀並同意我們最新修改之版本。\n隱私權政策如經修改，本服務將會公告於服務上，並以您所提供之電子郵件通知您相關之變更。\n若您不同意該等變更或修改，請停止繼續使用本服務服務，並通知本團隊停止蒐集、處理及使用您的個人資料。\n 免責聲明\n當您成為本服務的用戶後，\n您已詳細閱讀及明確瞭解本『免責聲明』並同意，若屬下列情況發生時，本服務無須負擔任何責任：\n1. 您使用本站服務之風險將由您個人承擔。\n用戶同意使用「本服務」各項服務是基於用戶的個人意願，並同意自負任何風險，\n包括因為從「本服務」下載資料資料或圖片，或由「本服務」服務中獲得之資料導致發生任何資源流失等結果。\n2.「本服務」就各項服務，不負任何明示或默視之擔保責任。「本服務」不保證各項服務之穩定、安全、無物及不中斷 \n"+
                            "用戶明示承擔使用本服務之所有風險及可能發生之任何損害。\n"+
                        "3. 用戶在「本服務」填寫之物件資料、個人資料、上傳圖片等行為，純屬用戶個人行為，\n"+
                        "「本服務」對其內容之真實性或完整性不負有任何責任\n"+
                        "4. 任何由於電腦病毒侵入，或因政府管制而造成的暫時性關閉等\n"+
                            "影響網路正常經營之不可抗力而造成的資料毀損、丟失被盜用或被竄改等與「本服務」\n"+
                        "5. 對於用戶透過「本服務」刊登或發佈虛假、違法資訊、侵害他人權益及欺騙、敲詐行為者等，\n"+
                            "皆純屬用戶個人行為，「本服務」對因此而產生的一切糾紛不負任何責任。\n"+
                            "特此聲明。\n"+
                        "6. 本團隊可能會修改此免責聲明，因此你應該定期到訪本頁，確保你已閱讀並同意我們最新修改之版本。\n"+
                            "免責聲明如經修改，本服務將會公告於服務上，並以您所提供之電子郵件通知您相關之變更。\n"+
                            "若您不同意該等變更或修改，請停止繼續使用本服務服務，並通知本團隊停止蒐集、處理及使用您的個人資料。\n",
            loginloading:false,
            accessToken: "",
        }
    }
    onFbRegister = async (data) =>{
    await this.setState({loginloading:true});
    console.log("log in");
    console.log(data.credentials);
    const { token, userId } = data.credentials;
    console.log(token);
    console.log(userId);
    try {
      let url = `https://graph.facebook.com/v2.8/${userId}?access_token=${token}&fields=name,picture,gender,email`;
      let response = await fetch(url).then( (data) => data.json())
      console.log('response = ');
      console.log(response);
      console.log(response.name);
      console.log(response.gender);
      console.log(response.picture.data.url);

      // fb login
      let url2 = Config.backend_url + 'student/FBRegister';
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
      }).then((data) => data.json());
      console.log(response2);
      let accessToken = response2.token;
      console.log(accessToken);
      //On success we will store the access_token in the AsyncStorage
      this.setState({accessToken: accessToken,loginloading:false})
      this.setState({error: 'success'});
      if(response2.text==='update token(password) successful'){
         Alert.alert("訊息","帳號已存在",[{text:"我知道了",onPress:""}]);
      }else{
          Alert.alert("訊息","註冊成功",[{text:"我知道了",onPress:""}]);
      }
      FBLoginManager.logout( (data) => {console.log(data) });
      this.prePage();
    }
     catch(err){
        this.setState({loginloading:false})
        Alert.alert("訊息","註冊失敗",[{text:"我知道了",onPress:""}])
        console.log(err);
    }
  }
    prePage() {
      const { navigator } = this.props;
      if(navigator) {
          navigator.pop();
      }
    }
    nextPageRegister = () => {
    const { navigator } = this.props;
    navigator.push({
      name: 'StudentRegister',
      component: StudentRegister,
      params: {
        accessToken: this.props.accessToken,
      }
    });
  }

    render(){
    return (
      <View style={styles.container}>
        <Header style={{backgroundColor: "rgb(122, 68, 37)"}}>
          <Button transparent onPress={this.prePage.bind(this)} >
            <Icon name='ios-arrow-back' />
          </Button>
          <Title>學生註冊</Title>
        </Header>
        <Loading label="註冊中" visible={this.state.loginloading}/>
        <Content>
            <View style={{flex:1,backgroundColor:"#fffdee"}}>
            <ScrollView style={{height:windowSize.height/2}}>
               <Text style={{alignSelf:'center',width:windowSize.width/5*4,textAlignVertical: 'top'}}multiline = {true}>
                     {this.state.content}
               </Text>
            </ScrollView>
            </View>
            
           <Button onPress={this.nextPageRegister.bind(this)} style={styles.submitBtn} block warning> 註冊 </Button>
           <View style={{ alignItems: 'center' }}>
             <View style={styles.orWrapper}>
               <Text style={styles.orText}>or</Text>
             </View>
             <View style={styles.hr} />
           </View>
           <FBLogin
              loginText="Facebook 註冊"
              style={styles.submitBtn}
              ref={(fbLogin) => { this.fbLogin = fbLogin }}
              loginBehavior={FBLoginManager.LoginBehaviors.Native}
              permissions={["public_profile","email","user_friends"]}
              onLogin={this.onFbRegister}
              onLoginFound={function(data){console.log(data.credentials)}}
              onLoginNotFound={function(e){console.log(e)}}
              onLogout={function(e){console.log(e)}}
              onCancel={function(e){console.log(e)}}
              onPermissionsMissing={function(e){console.log(e)}}/>
        </Content>
        
      </View>
    )
    }
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fffbe2',
    flex: 1,
    justifyContent: 'center',
  },
  modalcontainer: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.5)'
  },
  innerContainer: {
    borderRadius: 10,
    alignItems: 'center',
    backgroundColor: '#fff', padding: 20
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
  }
});