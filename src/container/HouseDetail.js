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
  TouchableHighlight,
  Alert,
  Linking,
  Image,
  ScrollView,
  TextInput,
  ActivityIndicator,
  PixelRatio,
  Modal
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
  Spinner
} from 'native-base';
import Swiper from 'react-native-swiper'
import CheckBox from 'react-native-checkbox';
import ImagePicker from 'react-native-image-picker';
import IconVec from 'react-native-vector-icons/FontAwesome';
import Dimensions from 'Dimensions';
const windowSize = Dimensions.get('window');
import Comment from '../component/Comment.js';
import {Loading} from '../component/Loading';
import CreateHouseData from './CreateHouseData.js';

export default class HouseDetail extends Component {
  constructor(props)
  {
    super(props);
    this.state = {
      tab :1,
      selectedItem: undefined,
      results: {
          items: []
      },
      houseId: this.props.id,

      landlordId:this.props.landlordId,
      userId: 0,

      accessToken: this.props.accessToken,
      title: '',
      area: '',
      address: '',
      vacancy: '',
      rent: '',
      type: '',
      score: '',
      phone: '',
      checkwater: '',
      checkele: '',
      checknet: '',
      remark:"",
      path:[],
      name: "develop",
      content: "",
      data: [],
      loading: true,
      houseSource:null,
      fileType:"",
      upload:false,
      updatevisible:false,
    }

    this.loadTheHouse = this.loadTheHouse.bind(this);
    this.loadTheHouse();
    this.loadComment = this.loadComment.bind(this);
    this.loadComment();
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
          houseSource: source,
        })}
    });
  }
  LinkToPhotoUrl = async (url) =>{
    Alert.alert("查看相片","是否查看",[
      {text:"是",onPress:()=>{
            Linking.canOpenURL(url).then(supported => {
              if (supported) {
                Linking.openURL(url);
              }
            });
      }},
      {text:"否",onPress:()=>{}}
    ])
  }
  confirmtodeletephoto = async (path)=>{

    Alert.alert("刪除照片","是否刪除",[
       {
        text: '確認', onPress: async() => {
          console.log("path="+path);
          await this.deletephoto(path);
        }
      },
      { text: '取消', onPress: () => {} }
    ])
  }
  deletephoto = async(path) =>{
    try{
        let url = Config.backend_url + 'house/deletehousephoto';
        const res = await fetch(url,{
          method :'POST',
          headers:{
              'Accept': 'application/json',
              'Content-Type': 'application/json',
              'x-access-token': this.state.accessToken,
          },
          body:JSON.stringify({
            'id':this.props.id,
            'path':path
          })
        })
        await this.loadTheHouse();
    }
    catch(err){
      console.log("err="+err);
    }
  }
   upload = async() => {
    if(this.state.fileType!="image/jpeg"){
      Alert.alert("檔案型態錯誤","照片格式僅限jpg檔",[
        {text:"我知道了",onPress:()=>{this.setState({houseSource:null})}}
      ]);
    }
    else if(this.state.path.length>=5){
      Alert.alert("錯誤訊息","照片限制最多5張",[
        {text:"我知道了",onPress:()=>{this.setState({houseSource:null})}}
      ]);
    }
    else{
    this.setState({upload:true})
    let data = new FormData()
    let id = this.props.id;
    data.append('id', id);
    data.append('house', {...this.state.houseSource, type: 'image/jpeg', name: 'image.jpg',});
    let url = Config.backend_url + 'house/uploadhousephoto';
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
        houseSource:null
      })
      Alert.alert("上傳訊息","上傳失敗",[{text:"我知道了",onPress:()=>{}}]);
      check = 0;
    })
    console.log(response);
    if(response.text === "success upload" && check == 1){
      await this.setState({
        upload: false,
        houseSource:null
      })
       Alert.alert("上傳訊息","上傳成功",[{text:"我知道了",onPress:()=>{}}]);
    }
    await this.loadTheHouse();
    console.log(response);
    }
  }

  loadTheHouse = async () => {
    try {
      const url = Config.backend_url + 'house/findTheUserHouse';
      let res = await fetch(url,{
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'x-access-token': this.state.accessToken,
        },
        body: JSON.stringify({
          houseId: this.state.houseId,
        })
      }).then( (data) => data.json() )
        .catch((e) => console.log(e));

      console.log(res);

      const {
        address,
        area,
        checkele,
        checknet,
        checkwater,
        createdAt,
        id,
        landlordId,
        phone,
        rent,
        score,
        title,
        type,
        updatedAt,
        vacancy,
        path,
        remark
      } = res.data;

      await this.setState({
        address,
        area,checkele,
        checknet,
        checkwater,
        createdAt,
        houseId: id,
        landlordId,
        phone,
        rent,
        score,
        title,
        type,
        updatedAt,
        vacancy,
        path,
        remark
      });
    } catch (errors) {
      console.log(errors);
    }
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
        loading: false,
      });

    } catch (errors) {
      console.log(errors);
    }
  }

  onCommentPressed = async() => {
    try {
      if(this.state.content.length==0){
        Alert.alert("長度錯誤","內容不可為空",{text:"我知道了",onPress:()=>{}})
      }
      else{
         let url = Config.backend_url + 'comment/createLandlordComment';
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
        })
      }).then( (res) => res.json() )
      .catch( (err) => console.log(err))
      console.log(response);
      this.loadComment();
      }
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
      this.setState({updatevisible:true})
      let url = Config.backend_url + 'house/updateMyHouse';
      let res = await fetch(url, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'x-access-token': this.state.accessToken,
        },
        body: JSON.stringify({
          id: this.state.houseId,
          title: this.state.title,
          area: this.state.area,
          address: this.state.address,
          vacancy: this.state.vacancy,
          rent: this.state.rent,
          checkwater:this.state.checkwater,
          checknet:this.state.checknet,
          checkele:this.state.checkele,
          type: this.state.type,
          remark:this.state.remark
        })
      }).then( (data) => data.json())
        .catch( (e) => console.log(e) );
      console.log(res);
      console.log( (res != null) );
      if(res.text == "house update success"){
        Alert.alert("訊息","更新成功",[{text:"確認",onPress:()=>{}}]);
        console.log("in");
        await this.setState({
          tab: 1,
          updatevisible:false,
        })
      }
      else{
        console.log("out");
        console.log("something wrong");
        Alert.alert("訊息","更新失敗",[{text:"確認",onPress:()=>{}}]);
      }
    } catch (errors) {
      console.log(errors);
    }
  }

  prePage = async() => {
    await this.props.callBack();
    const { navigator } = this.props;
    if(navigator) {
        navigator.pop();
    }
  }

  navigate = () => {
    Alert.alert('導航',`${this.state.address}`, [

        {
          text: '前往',onPress:()=>{
            const url = `http://maps.google.com/maps/?daddr=${this.state.address}`;
            Linking.canOpenURL(url).then(supported => {
              if (supported) {
                Linking.openURL(url);
              }
            });
          }},
      { text: '取消', onPress: () => {} }
    ]);
  }

  gmap = () => {
    const imgWidth = parseInt(windowSize.width/5*4);
    const imgHeight = parseInt(imgWidth / 16.0 * 9.0, 10);

    return (
      <TouchableOpacity  style={{flex: 1, paddingTop: 20,alignItems:'center' }} onPress={this.navigate}>
        <View>
          <Image
            resizeMode="cover"
            source={{
              uri: `https://maps.googleapis.com/maps/api/staticmap?center=${this.state.address}&zoom=16.85&size=${imgWidth}x${imgHeight}&scale=8&language=zh-tw&markers=size:mid%7Ccolor:blue%7C${this.state.address}&key=AIzaSyBiwSQUTr6brsJoPHcliZ3TVFYgYf7ulbw` }}
            style={{
              width: imgWidth,
              height: imgHeight,
            }}
          />
        </View>
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
      else{
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

  extra = () => {
    const { checkwater, checkele, checknet } = this.state;
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

  dataContent = tab => {
    const { title, area, address, vacancy, rent, type, score, phone, checkwater, checkele, checknet } = this.state;
    if(tab==1){
       let url=`${Config.backend_url}images/house/${this.state.landlordId}/${this.state.houseId}/`;
      return (
        <View>
          {(this.state.path.length>0)&&
          (<Swiper style={styles.wrapper} height={250}>
            {
              (this.state.path.map((val)=>{
                return(
                        <View style={styles.slide}>
                          <TouchableOpacity onPress={()=>{this.LinkToPhotoUrl(url+val)}}style={styles.image} >
                            <Image resizeMode='contain' style={{width:windowSize.width,height:250}}source={{uri:url+val}}/>
                          </TouchableOpacity>
                          <TouchableOpacity  style={styles.delete} onPress={()=>{this.confirmtodeletephoto(val)}}>
                            <Image   style={{width:30,height:30}} source={require('../assets/delete.png')}/>
                          </TouchableOpacity>
                        </View>
                )
              }))
            }

        </Swiper>)
          }
 {       /*<Image
          source={require('../assets/house.jpg')}
          style={{width:300, height:100, marginTop: 10, alignSelf: 'center' }}
        />*/}
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
        <Text style={styles.detailText}>備註:</Text>
        <View style={{flex:1,width:windowSize.width/5*4,alignSelf:'center',backgroundColor:'#ccc'}}>
            <ScrollView style={{height:windowSize.height/6}}>
              <Text
              style={{alignSelf:'center',width:windowSize.width/5*4,color:'#2d85ca'}}
              editable = {false}
              multiline = {true}
              maxLength = {100}>
              {this.state.remark}
              </Text>
            </ScrollView>
         </View>
        </View>
      );
    }
    if(tab==2){
      return(
        <ScrollView>
        <Loading label="上傳中" visible={this.state.upload}/>
        <Loading label="更新中" visible={this.state.updatevisible}/>
          <View style={styles.viewFlexRow} >
             <View style={{padding:10}}>
               <View style={{marginLeft: 100}} >
                <TouchableOpacity onPress={this.selectPhotoTapped.bind(this)}>
                  <View style={[styles.avatar, styles.avatarContainer, {marginBottom: 20}]}>
                  { this.state.houseSource === null ? <Text>選擇照片</Text> :
                    <Image style={styles.avatar} source={this.state.houseSource} />
                  }
                  </View>
                  <Text style={{marginLeft: 150}}>{this.state.uploadState}</Text>
                </TouchableOpacity>
                </View>
                <TouchableOpacity style={{marginLeft:130}} onPress={this.upload}>
                  <Text >按此上傳圖片</Text>
                </TouchableOpacity>
              </View>
          </View>
          <List style={styles.form}>
           <View style={styles.viewFlexRow}>
             <Text style={styles.houseTitle}>房屋名稱</Text>
             <Input style={styles.houseTitleInput} onChangeText={ (title) => this.setState({ title: title }) } value={title} ></Input>
           </View>
           <View style={styles.viewFlexRow}>
             <Text style={styles.areaText}>所在區域</Text>
             <Picker
                style={{ width: 120, marginLeft: 50, marginTop: 6}}
                iosHeader="Select one"
                mode="dropdown"
                selectedValue={area}
                onValueChange={this.onAreaChange.bind(this)}>
                <Item label="寶山" value="寶山" />
                <Item label="進德" value="進德" />
                <Item label="其他" value="其他" />
             </Picker>
           </View>

          <View style={styles.viewFlexRow}>
            <Text style={styles.addrText} >彰化縣彰化市</Text>
            <Input style={{borderColor: 'red', borderWidth: 5}} onChangeText={ (address) => this.setState({ address: `彰化縣彰化市${address}` }) } value={address.slice(6,address.length)}></Input>
          </View>

          <View style={styles.viewFlexRow}>
            <Text style={{paddingTop:13, paddingLeft: 30, fontSize: 15, color: '#7b7d85'}}>剩餘空房</Text>
            <Input style={{borderColor: 'red', borderWidth: 5, marginLeft: 15}} onChangeText={ (vacancy) => this.setState({ vacancy: vacancy }) } value={vacancy}></Input>
          </View>

          <View style={styles.viewFlexRow}>
            <Text style={{paddingTop:16, paddingLeft: 30, fontSize: 15, color: '#7b7d85'}}>租金</Text>
            <Input style={{borderColor: 'red', borderWidth: 5, marginLeft: 15 ,marginRight: 5}} onChangeText={ (rent) => this.setState({ rent: rent }) } value={rent}></Input>
            <Text style={{paddingTop:10, fontSize: 15, color: '#7b7d85'}} >/月</Text>
          </View>

           <View style={styles.viewFlexRow}>
             <Text style={{paddingTop:11, paddingLeft: 30, fontSize: 15, color: '#7b7d85'}}>類型</Text>
             <Picker
                style={{ width: 120, marginLeft: 50, height: 45}}
                iosHeader="Select one"
                mode="dropdown"
                selectedValue={type}
                onValueChange={this.onTypeChange.bind(this)}>
                <Item label="雅房" value="雅房" />
                <Item label="套房" value="套房" />
             </Picker>
           </View>
           <View>
           <CheckBox
             label='包水'
             checked={checkwater}
             onChange={this.checkWater}
           />
           <CheckBox
             label='包電'
             checked={checkele}
             onChange={this.checkEle}
           />
           <CheckBox
             label='網路'
             checked={checknet}
             onChange={this.checkNet}
           />
           <Text>備註:</Text>
          <TextInput
            style={{textAlignVertical: 'top',borderColor:'black',borderRadius:5,borderWidth:0.5}}
            onChangeText = { (remark) => this.setState({remark:remark})}
            editable = {true}
            numberOfLines = {4}
            multiline = {true}
            blurOnSubmit={true}
            placeholder="長度限定100字"
            value={this.state.remark}
          />
          <Text>{this.state.remark.length}/100</Text>
           </View>

           <Button style={styles.submitBtn} block warning onPress={this.updateHousePressed.bind(this)}> 送出修改 </Button>
         </List>
        </ScrollView>
      )
    }
    if(tab==3){
      return (
        <View>
          <Text style={styles.houseTitle}>房屋名稱: {this.state.title}</Text>
          {
            this.state.loading ?
              <ActivityIndicator
                animating={this.state.loading}
                style={styles.spinner}
                color="rgb(213, 179, 36)"
              /> : null
          }
          {
            this.state.data.length > 0 ?
            this.state.data.map((val, index) =>
              <Comment key={index+2} {...val} thumbs_up={() => this.thumbs_up(val.id)} thumbs_down={() => this.thumbs_down(val.id)} identity="landlord"/>
            ) : <Text style={{alignSelf: 'center'}} >暫無留言</Text>
          }
            <TextInput
            style={{alignSelf:'center',width:windowSize.width/5*4,textAlignVertical: 'top',borderColor:'black',borderRadius:5,borderWidth:0.5}}
            onChangeText = { (content) => this.setState({content: content})}
            editable = {true}
            numberOfLines = {4}
            multiline = {true}
            blurOnSubmit={true}
            placeholder="長度限定100字"
            maxLength={100}
          />
          <Text style={{marginLeft: 18}}>{this.state.content.length}/100</Text>
          <Button style={styles.submitBtn} onPress={this.onCommentPressed.bind(this)} block warning> 確認送出 </Button>
        </View>
      )
    }
  }

  deleteMyHouse = () => {
    Alert.alert('是否刪除','', [
      {
        text: '確認', onPress: async() => {
          await this.success();
          await this.prePage();
        }
      },
      { text: '取消', onPress: () => {} }
    ]);
  }

  success = async() => {
    try{
      const url = Config.backend_url + 'house/deleteMyHouse';
      let res = await fetch(url,{
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'x-access-token': this.state.accessToken,
        },
        body: JSON.stringify({
          id: this.state.houseId,
        })
      }).then( (data) => data.json() )
        .catch((e) => console.log(e));

        console.log(res);
    } catch (errors) {
      console.log(errors);
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
         {
            this.state.accessToken.length != 0 ?
              <Button transparent onPress={this.deleteMyHouse.bind(this)}>
                <IconVec name="trash" style={{fontSize: 30}}/>
              </Button>
            :
            null
         }
       </Header>
        <View style={{flexDirection: 'row'}}>
          <Button
            onPress={() => {
              this.setState({
                tab: 1
              })
            }}
            style={{width: windowSize.width/3}}
          >詳細資訊</Button>
          <Button
            onPress={() => {
              this.setState({
                tab: 2
              })
            }}
            style={{width: windowSize.width/3}}
          >修改資訊</Button>
          <Button
            onPress={() => {
              this.setState({
                tab: 3
              })
            }}
            style={{width: windowSize.width/3}}
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
  slide: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'transparent'
  },
  image:{
    flex:1
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
  delete:{
    position:'absolute',
    top:10,
    right:10,
    width:30,
    height:30
  }
});
