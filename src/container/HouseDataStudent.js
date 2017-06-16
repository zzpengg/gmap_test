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
  ScrollView,
  Image,
  TouchableOpacity,
  Modal,
  Animated,
  Dimensions,
  ActivityIndicator,
  BackAndroid,
  Navigator,
  AsyncStorage,
  ListView
} from 'react-native';
import {
  Header,
  Content,
  Button,
  Icon,
  Title,
  Spinner,
  Input
} from 'native-base';

import HouseDetailStudent from './HouseDetailStudent.js';
import CreateHouseData from './CreateHouseData.js';
import Filter from '../component/Filter/FilterContainer';
var {height, width} = Dimensions.get('window');
import DropdownMenu from 'react-native-dropdown-menu';
const windowSize = Dimensions.get('window');
import IconVec from 'react-native-vector-icons/FontAwesome';
import PersonInfoStudent from './PersonInfoStudent.js';

import HouseDataComponent from '../component/HouseDataComponent.js';

const STUDENT_ACCESS_TOKEN = 'student_access_token';

export default class HouseData extends Component {

  constructor(props) {
    super(props);
    this.state = {
      data: [],
      loading: true,
      visible:true,
      areaId: 0,
      typeId: 0,
      slideInValue: new Animated.Value(10),
      area: '',
      modalVisible: false,
      updateData: [],
      rent: 0,
    }
    this.loadHouse = this.loadHouse.bind(this);
    this.loadHouse();
  }

  getToken = async() => {
    try {
      let accessToken = await AsyncStorage.getItem(STUDENT_ACCESS_TOKEN);
      if(!accessToken) {
          console.log("not have token");
      } else {
          console.log("accessToken = " + accessToken);
          this.setState({accessToken: accessToken});
      }
    } catch(error) {
        console.log("catch error = " + error);
    }
  }

  nextPage = (id) => {
    const { navigator } = this.props;

    console.log("next page pressed");
    if(navigator) {
        navigator.push({
            name: 'HouseDetailStudent',
            component: HouseDetailStudent,
            params: {
              id: id,
            }
        })
    }
  }

  personPage() {
    const { navigator } = this.props;
    //为什么这里可以取得 props.navigator?请看上文:
    //<Component {...route.params} navigator={navigator} />
    //这里传递了navigator作为props
    console.log("person page pressed");
    if(navigator) {
        navigator.push({
            name: 'PersonInfoStudent',
            component: PersonInfoStudent,
        })
    }
  }


  prePage() {
      const { navigator } = this.props;
      if(navigator) {
          navigator.pop();
      }
  }

  loadHouse = async () => {
    try {
      console.log("***loadHouse***");
      const url = 'http://ncuerent.ddns.net:1337/house/findHouseData'
      let res = await fetch(url)
        .then((data) => data.json())
        .catch((e) => console.log(e));

      // console.log(res);
      // console.log(res.data[0].id + ' ' + res.data[0].landlordId + ' ' + res.data[0].picture);
      this.setState({
        data: res.data,
        updateData: res.data,
        loading: false,
        visible:false
      })
    } catch (errors) {
      console.log(errors);
    }
  }

  callback = () => {
    this.loadHouse();
  }


  typeOnChange = (id) => {
    // this.props.requestFilterType(id);
    this.setState({
      typeId: id,
    });
  };

  update = () => {
    let data = this.state.data;
    if(this.state.area == '進德')
    {
      data = data.filter(function (el) {
        return el.area === '進德';
      });
    }
    if(this.state.area == '寶山')
    {
      data = data.filter(function (el) {
        return el.area === '寶山';
      });
    }
    if(this.state.rent == '3000以下')
    {
      data = data.filter(function (el) {
        return el.rent < 3000;
      });
    }
    if(this.state.rent == '3000~4000')
    {
      data = data.filter(function (el) {
        return el.rent >= 3000 && el.rent < 4000;
      });
    }
    if(this.state.rent == '4000~5000')
    {
      data = data.filter(function (el) {
        return el.rent >= 4000 && el.rent < 5000;
      });
    }
    if(this.state.rent == '5000以上')
    {
      data = data.filter(function (el) {
        return el.rent >= 5000;
      });
    }
    if(this.state.type == '套房')
    {
      data = data.filter(function (el) {
        return el.type == '套房';
      });
    }
    if(this.state.type == '雅房')
    {
      data = data.filter(function (el) {
        return el.type == '雅房';
      });
    }
    this.setState({
      updateData: data,
      modalVisible: false,
    })
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

    const data = [["地區", "寶山", "進德"], ["類型", "套房", "雅房"], ["租金", "3000以下", "3000~4000", "4000~5000", "5000以上"]];
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    const dataSource = ds.cloneWithRows(this.state.updateData);
    const { navigator } = this.props;
    return (
        <ScrollView pagingEnabled={true}
        style={{flex:1}}>
          <View style={{flex: 1}} >
            <Header style={{backgroundColor: "rgb(122, 68, 37)"}}>
              <Button transparent onPress={this.prePage.bind(this)}>
                <Icon name='ios-arrow-back' />
              </Button>
              <Title>房屋資訊</Title>
              <Button transparent onPress={this.personPage.bind(this)}>
                <IconVec name="user-circle" style={{fontSize: 30}}/>
              </Button>
            </Header>
          <DropdownMenu style={{flex: 1}}
            arrowImg={require('../assets/dropdown_arrow.png')}      //set the arrow icon, default is a triangle
            checkImage={require('../assets/menu_check.png')}    //set the icon of the selected item, default is a check mark
            bgColor={"brown"}                            //the background color of the head, default is grey
            tintColor={"white"}                        //the text color of the head, default is white
            selectItemColor={"red"}                    //the text color of the selected item, default is red
            data={data}
            maxHeight={310}                            // the max height of the menu
            handler={
              async (selection, row) => {
                if(selection == 0){
                  await this.setState({
                    area: data[0][row]
                  })
                  console.log("data = " + data[selection][row]);
                  await this.update();
                }
                if(selection == 1){
                  await this.setState({
                    type: data[1][row]
                  })
                  console.log("data = " + data[selection][row]);
                  await this.update();
                }
                if(selection == 2){
                  await this.setState({
                    rent: data[2][row]
                  })
                  console.log("data = " + data[selection][row]);
                  await this.update();
                }
              }
            } >
          <View style={{flex: 10, alignItems: 'center', justifyContent: 'flex-end'}}>

            {
              this.state.loading ?null:
              this.state.updateData.length?<Text style={{marginLeft:10, marginTop:10}} >共{this.state.updateData.length}筆資料</Text>:

              <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
               <Image source={require('../assets/searchhouse.jpg')} style={{width:width*0.75, height:width*0.75}}/ >
               <Text>目前尚無符合的房屋</Text>
              </View>

            }

            {
              this.state.loading ?
                <ActivityIndicator
                  animating={this.state.loading}
                  color="rgb(213, 179, 36)"
                /> : null
            }
            <ListView
              initialListSize={5}
              dataSource={dataSource}
              renderRow={(rowData,rowID)=>{
                return(
                  <HouseDataComponent val={rowData} index={rowID} nextPage={this.nextPage}/>
                )

              }}
            />
                {
                   this.state.loading?null:
                   this.state.updateData.length?
                  <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                    <Image source={require('../assets/searchhouse.jpg')} style={{width:width*0.35, height:width*0.35}}/ >
                    <Text>已無符合需求的房屋</Text>
                  </View>:null
                }
              </View>
            </DropdownMenu>
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
  slide: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: '#fff',
    fontSize: 25,
    fontWeight: 'bold'
  },
  topLeft: {
    padding: 30,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  topRight: {
    padding: 30,
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
  },
  bottomLeft: {
    padding: 30,
    justifyContent: 'flex-end',
    alignItems: 'flex-start',
  },
  bottomRight: {
    padding: 30,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },
  dataView: {
    flexDirection: 'row',
    marginLeft: 10,
    marginTop: 10,
    marginRight: 10,
    borderRadius: 5,
    borderColor: 'gray',
    borderWidth: 5,
    width: 360,
    height: 140,
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
  updateModal: {
    backgroundColor: 'white',
    marginTop: 150,
    padding: 25,
    elevation: 8,
    borderRadius: 2,
    position: 'absolute',
    bottom: -5,
    left: width*0.025,
    width: width*0.95,

  },
  updateModalMask: {
    position: 'absolute',
    width: width,
    height: height,
    backgroundColor: 'rgba(0, 0, 0, 0.65)',
    top: 0,
    left: 0
  },
});
