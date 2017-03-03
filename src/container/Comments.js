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
  TextInput,
  ActivityIndicator,
} from 'react-native';
import {
  Footer,
  FooterTab,
  Button,
  Icon,
  Header,
  Content,
  Title,
} from 'native-base';
import Comment from '../component/Comment.js';

export default class Comments extends Component {

  constructor(props) {
    super(props);
    this.state = {
      houseId: 0,
      userId: 0,
      name: "develop",
      content: "",
      data: [],
      loading: true,
    }
    this.loadComment = this.loadComment.bind(this);
    this.loadComment();
  }

  prePage() {
      const { navigator } = this.props;
      if(navigator) {
          navigator.pop();
      }
  }

  loadComment = async () => {
    try {
      const url = 'http://test-zzpengg.c9users.io:8080/comment'
      let res = await fetch(url,{
      method: 'GET',
    }).then((data) => data.json())
      .catch((e) => console.log(e));

      this.setState({
        data: res,
        loading: false,
      });
      console.log(res);
    } catch (errors) {
      console.log(errors);
    }
  }

  async onCommentPressed () {
    try {
      let url = 'http://test-zzpengg.c9users.io:8080/comment'
      let response = await fetch(url, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          houseId: this.state.houseId,
          userId: this.state.userId,
          name: this.state.name,
          content: this.state.content,
        })
      });
      console.log(response);
    } catch (errors) {
      console.log(errors);
    }
  }

  render() {
    // const { region } = this.props;
    //console.log(region);
    var tmp_array = [
     { name: "彰師大", score: 3 ,content: '越叫福應層道定對絕常建白去件的頭她'+
     '主一直它記教為半做長我關：著到形入他道法間效像反。動起創中投自滿政不現樹！'+
     '人好代急區機長下同道；處越星地性大以散的會車臺我道還寶定苦的建不什？有城'+
     '機遠取然，提有發年。發樣麼。樣程給式緊這界流聲！能數的應司往見保爭南子：來四母我只受久美一。'},
     { name: "煞氣A", score: 1,content: '越叫福應層道定對絕常建白去件的頭她'+
     '主一直它記教為半做長我關：著到形入他道法間效像反。動起創中投自滿政不現樹！'+
     '人好代急區機長下同道；處越星地性大以散的會車臺我道還寶定苦的建不什？有城'+
     '機遠取然，提有發年。發樣麼。樣程給式緊這界流聲！能數的應司往見保爭南子：來四母我只受久美一。'},
     { name: "霸氣B", score: 5,content: '越叫福應層道定對絕常建白去件的頭她'+
     '主一直它記教為半做長我關：著到形入他道法間效像反。動起創中投自滿政不現樹！'+
     '人好代急區機長下同道；處越星地性大以散的會車臺我道還寶定苦的建不什？有城'+
     '機遠取然，提有發年。發樣麼。樣程給式緊這界流聲！能數的應司往見保爭南子：來四母我只受久美一。' }
    ];
    return (
      <View>
        <ScrollView>
          <Header style={{backgroundColor: "rgb(122, 68, 37)"}}>
            <Button transparent onPress={this.prePage.bind(this)}>
              <Icon name='ios-arrow-back' />
            </Button>
            <Title>房東註冊</Title>
          </Header>
          <Content>
            <Text style={styles.houseTitle}>房屋名稱: </Text>
            <Image source={require('../assets/house.jpg')} style={styles.houseImage} />
            {
              this.state.loading ?
                <ActivityIndicator
                  animating={this.state.loading}
                  style={styles.spinner}
                  color="rgb(213, 179, 36)"
                /> : null
            }
            {
              tmp_array.map(function(val, index){
                return (<Comment key={index+2} name={val.name} content={val.content} score={val.score}/>)
              })
            }
            {
              this.state.data.map(function(val, index){
                return (<Comment key={index+2} name={val.name} content={val.content} score={val.score}/>)
              })
            }


            <Text style={styles.houseTitle}>{this.state.userId}</Text>
            <TextInput
              onChangeText = { (content) => this.setState({content: content})}
              editable = {true}
              numberOfLines = {4}
              multiline = {true}
            />
            <Text style={styles.houseTitle}>content:{this.state.content}</Text>
            <Button style={styles.submitBtn} onPress={this.onCommentPressed.bind(this)} block warning> 確認送出 </Button>
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
  submitBtn: {
    elevation: 1,
    marginLeft: 18,
    marginRight: 0,
    marginTop: 20,
  },
});
