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
  ScrollView,
  Image,
  TouchableOpacity,
} from 'react-native';
import {
  Header,
  Content,
  Button,
  Icon,
  Title
} from 'native-base';

import HouseDetail from './HouseDetail.js';
import CreateHouseData from './CreateHouseData.js';

export default class HouseData extends Component {

  constructor(props) {
    super(props);
    this.state = {
      data: [],
      loading: true,
      accessToken: this.props.accessToken,
    }
    this.loadHouse = this.loadHouse.bind(this);
    this.loadHouse();
  }


  nextPage() {
    const { navigator } = this.props;
    //为什么这里可以取得 props.navigator?请看上文:
    //<Component {...route.params} navigator={navigator} />
    //这里传递了navigator作为props
    console.log("next page pressed");
    if(navigator) {
        navigator.push({
            name: 'HouseDetail',
            component: HouseDetail,
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
      const url = 'http://test-zzpengg.c9users.io:8080/house/findMyHouse'
      let res = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'x-access-token': this.state.accessToken,
        },
      }).then((data) => data.json())
        .catch((e) => console.log(e));

      console.log(res);
      this.setState({
        data: res.data,
        loading: false,
      })

    } catch (errors) {
      console.log(errors);
    }
  }

  callback = () => {
    this.loadHouse();
  }


  render() {
    // const { region } = this.props;
    //console.log(region);
    var tmp_array = [
     { title: "便宜的雅房", rent: 10000, area: "寶山", score: 3 },
     { title: "昂貴的套房", rent: 2000, area: "寶山", score: 1},
     { title: "破爛的房子", rent: 500, area: "進德", score: 5 }
    ];
    const { navigator } = this.props;
    return (
      <View>
        <ScrollView>
          <Header style={{backgroundColor: "rgb(122, 68, 37)"}}>
            <Button transparent onPress={this.prePage.bind(this)}>
              <Icon name='ios-arrow-back' />
            </Button>
            <Title>房屋資訊</Title>
          </Header>
          <Content>
            {
              this.state.data.map((val, index) => {
                return (
                  <View style={styles.dataView} key={index}>
                    <View>
                      <Image source={require('../assets/fuck_cat.jpg')} style={{width:100, height:100, marginTop:5, marginLeft:5, marginBottom: 5 }} />
                      <Text style={styles.imageText}>更改圖片</Text>
                    </View>

                    <View style={{marginTop:10, marginLeft: 10}} >
                      <Text style={styles.detailText}>房屋名稱: {val.title}</Text>
                      <Text style={styles.detailText}>所在區域: {val.area}</Text>
                      <Text style={styles.detailText}>租金: {val.rent} /月</Text>
                      <Text style={styles.detailText}>評分: {val.score}</Text>
                      <View style={styles.detailData}>
                        <Button success bordered style={{height: 18}} key={index}
                        onPress={() => {
                          const { navigator } = this.props;
                          if(navigator){
                            navigator.push({
                              name: 'HouseDetail',
                              component: HouseDetail,
                              params: {
                                id: val.id,
                                title: val.title,
                                area: val.area,
                                address: val.address,
                                rent: val.rent,
                                score: val.score,
                                vacancy: val.vacancy,
                                checkwater:val.checkwater,
                                checkele:val.checkele,
                                checknet:val.checknet,
                                type: val.type,
                                accessToken: this.props.accessToken,
                              }
                            })
                          }
                        }}>
                            <Text>詳細資料</Text>
                        </Button>
                      </View>
                    </View>
                  </View>
                )
              })
            }
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
                        callback: this.callback,
                      }
                    })
                  }
                }}
              >
                <Image source={require('../assets/plus.png')} style={{width:80, height:80, marginTop:20, marginLeft:120, marginBottom: 20,}} />
              </TouchableOpacity>
            </View>
          </Content>
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
