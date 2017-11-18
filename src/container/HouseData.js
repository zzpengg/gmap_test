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
  ListView
} from 'react-native';
import {
  Header,
  Content,
  Button,
  Icon,
  Title,
  Spinner
} from 'native-base';
import {Loading} from '../component/Loading'
import HouseDetail from './HouseDetail.js';
import CreateHouseData from './CreateHouseData.js';

import HouseDataComponent from '../component/HouseDataComponent.js';
import Config from '../../config.json';

export default class HouseData extends Component {

  constructor(props) {
    super(props);
    this.state = {
      data: [],
      loading: true,
      accessToken: this.props.accessToken,
      visible:true,
    }
    this.loadHouse = this.loadHouse.bind(this);
    this.loadHouse();
  }


  nextPage = (id) => {
    const { navigator } = this.props;
    //为什么这里可以取得 props.navigator?请看上文:
    //<Component {...route.params} navigator={navigator} />
    //这里传递了navigator作为props
    console.log('house id = ' + id);
    console.log(this.props.accessToken);
    console.log("heyhey");
    console.log("next page pressed");
    if(navigator) {
        navigator.push({
            name: 'HouseDetail',
            component: HouseDetail,
            params: {
              id: id,
              accessToken: this.props.accessToken,
              callBack: this.callBack,
            }
        })
    }
  }

  prePage() {
    this.props.callBack();
    const { navigator } = this.props;
    if(navigator) {
        navigator.pop();
    }
  }

  loadHouse = async () => {
    try {
      console.log("***loadHouse***");
      const url = Config.backend_url +  'house/findMyHouse';
      let res = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'x-access-token': this.state.accessToken,
        },
      }).then((data) => data.json())
        .catch((e) => console.log(e));


      this.setState({
        data: res.data,
        loading: false,
        visible:false,
      })

    } catch (errors) {
      console.log(errors);
    }
  }

  callBack = () => {
    this.loadHouse();
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

  HouseDetailStudentPage = (id) => {
    const { navigator } = this.props;
    console.log("id = " + id);
    if(navigator){
      navigator.push({
        name: 'HouseDetail',
        component: HouseDetail,
        params: {
          id: id,
        }
      })
    }
  }


  render() {
    // const { region } = this.props;
    //console.log(region);
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    const dataSource = ds.cloneWithRows(this.state.data);
    const { navigator } = this.props;
    return (
      <View>
      <Loading label="載入中..." visible={this.state.visible}/>
        <ScrollView>
          <Header style={{backgroundColor: "rgb(122, 68, 37)"}}>
            <Button transparent onPress={this.prePage.bind(this)}>
              <Icon name='ios-arrow-back' />
            </Button>
            <Title>房屋資訊</Title>
          </Header>
          <View style={{flex: 1,justifyContent: 'center',alignItems: 'center'}}>
          <Text style={{marginLeft:10, marginTop:10}} >共{this.state.data.length}間房屋</Text>
            <ListView
              initialListSize={1}
              dataSource={dataSource}
              renderRow={(rowData,rowID)=>{
                return(
                  <HouseDataComponent val={rowData} index={rowID} nextPage={this.nextPage}/>
                )
              }}
            />
            <View style={styles.dataView}>
              <TouchableOpacity
                onPress={() => {
                  const { navigator } = this.props;
                  if(navigator){
                    navigator.push({
                      name: 'CreateHouseData',
                      component: CreateHouseData,
                      params: {
                        accessToken: this.props.accessToken,
                        account:this.props.account,
                        callBack: this.callBack,
                      }
                    })
                  }
                }}
              >
                <Image source={require('../assets/plus.png')} style={{width:80, height:80, marginTop:20, marginLeft:120, marginBottom: 20,}} />
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </View>
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
  }
});
