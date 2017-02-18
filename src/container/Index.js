/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import MapView from 'react-native-maps';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Navigator
} from 'react-native';

import Filter from './Filter.js';
import LandlordSignin from './LandlordSignin.js';
import UpdateHouseData from './UpdateHouseData.js';
import HouseDetail from './HouseDetail.js';
import StudentRegister from './StudentRegister.js';
import LandlordRegistion from './LandlordRegistion.js';
import HouseDatas from './HouseDatas.js';
import Comments from './Comments.js';
import Detail from './Detail.js';

export default class Index extends Component {

  _pressButton() {
    const { navigator } = this.props;
    //为什么这里可以取得 props.navigator?请看上文:
    //<Component {...route.params} navigator={navigator} />
    //这里传递了navigator作为props
    if(navigator) {
        navigator.push({
            name: 'Filter',
            component: Filter,
        })
    }
  }

  _pressButton2() {
    const { navigator } = this.props;
    //为什么这里可以取得 props.navigator?请看上文:
    //<Component {...route.params} navigator={navigator} />
    //这里传递了navigator作为props
    if(navigator) {
        navigator.push({
            name: 'LandlordSignin',
            component: LandlordSignin,
        })
    }
  }

  _pressButton3() {
    const { navigator } = this.props;
    //为什么这里可以取得 props.navigator?请看上文:
    //<Component {...route.params} navigator={navigator} />
    //这里传递了navigator作为props
    if(navigator) {
        navigator.push({
            name: 'UpdateHouseData',
            component: UpdateHouseData,
        })
    }
  }
  _pressButton4() {
    const { navigator } = this.props;
    //为什么这里可以取得 props.navigator?请看上文:
    //<Component {...route.params} navigator={navigator} />
    //这里传递了navigator作为props
    if(navigator) {
        navigator.push({
            name: 'LandlordRegistion',
            component: LandlordRegistion,
        })
    }
  }

  _pressButton5() {
    const { navigator } = this.props;
    //为什么这里可以取得 props.navigator?请看上文:
    //<Component {...route.params} navigator={navigator} />
    //这里传递了navigator作为props
    if(navigator) {
        navigator.push({
            name: 'StudentRegister',
            component: StudentRegister,
        })
    }
  }

  _pressButton6() {
    const { navigator } = this.props;
    //为什么这里可以取得 props.navigator?请看上文:
    //<Component {...route.params} navigator={navigator} />
    //这里传递了navigator作为props
    if(navigator) {
        navigator.push({

            name: 'HouseDatas',
            component: HouseDatas,
        })
    }
  }

  _pressButton7() {
    const { navigator } = this.props;
    //为什么这里可以取得 props.navigator?请看上文:
    //<Component {...route.params} navigator={navigator} />
    //这里传递了navigator作为props
    if(navigator) {
        navigator.push({
            name: 'Comments',
            component: Comments,
        })
    }
  }
  _pressButton8() {
    const { navigator } = this.props;
    //为什么这里可以取得 props.navigator?请看上文:
    //<Component {...route.params} navigator={navigator} />
    //这里传递了navigator作为props
    if(navigator) {
        navigator.push({

            name: 'HouseDetail',
            component: HouseDetail,
        })
    }
  }

  _pressButton8() {
    const { navigator } = this.props;
    //为什么这里可以取得 props.navigator?请看上文:
    //<Component {...route.params} navigator={navigator} />
    //这里传递了navigator作为props
    if(navigator) {
        navigator.push({
            name: 'Detail',
            component: Detail,
        })
    }
  }
  _pressButton9() {
    const { navigator } = this.props;
    //为什么这里可以取得 props.navigator?请看上文:
    //<Component {...route.params} navigator={navigator} />
    //这里传递了navigator作为props
    if(navigator) {
        navigator.push({
            name: 'HouseDetail',
            component: HouseDetail,
        })
    }
  }

  render() {
    // const { region } = this.props;
    //console.log(region);


   return (
     <View style={{ flex: 1 }}>
        <View style={[styles.center, { backgroundColor: 'cadetblue'}]}>
          <TouchableOpacity onPress={this._pressButton.bind(this)}>
            <Text style={{ color: '#fff', fontSize: 30  }}> 學生 </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={this._pressButton5.bind(this)}>
            <Text style={{ color: '#fff', fontSize: 30 }}> 學生註冊 </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={this._pressButton6.bind(this)}>
            <Text style={{ color: '#fff', fontSize: 30 }}> HouseDatas </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={this._pressButton7.bind(this)}>
            <Text style={{ color: '#fff', fontSize: 30 }}> Comments </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={this._pressButton8.bind(this)}>
            <Text style={{ color: '#fff', fontSize: 30 }}> Detail </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={this._pressButton9.bind(this)}>
            <Text style={{ color: '#fff', fontSize: 30 }}> HouseDetail </Text>
          </TouchableOpacity>
        </View>
        <View style={[styles.center, { backgroundColor: 'darksalmon' }]}>
          <TouchableOpacity onPress={this._pressButton2.bind(this)}>
            <Text style={{ color: '#fff', fontSize: 30 }}> 房東 </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={this._pressButton3.bind(this)}>
            <Text style={{ color: '#fff', fontSize: 30 }}> 修改房屋資訊 </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={this._pressButton4.bind(this)}>
            <Text style={{ color: '#fff', fontSize: 30 }}> LandlordRegistion </Text>
          </TouchableOpacity>
        </View>
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
});
