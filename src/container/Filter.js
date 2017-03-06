import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  Alert,
  Modal,
  TouchableHighlight
} from 'react-native';
import {
  Header,
  Button,
  Icon,
  Item,
  Title,
  Content,
  List,
  ListItem,
  InputGroup,
  Input,
  Picker,
} from 'native-base';

import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';
import HouseDataStudent from './HouseDataStudent.js';

export default class LandlordRegistion extends Component {

  constructor(props) {
    super(props);
    this.state = {
      area: 0,
      type: 0,
      rent: 0,
      waterandelec: 0
    }
  }

  prePage() {
      const { navigator } = this.props;
      if(navigator) {
          navigator.pop();
      }
  }

  nextPage() {
    const { navigator } = this.props;
    //为什么这里可以取得 props.navigator?请看上文:
    //<Component {...route.params} navigator={navigator} />
    //这里传递了navigator作为props
    console.log("next page pressed");
    if(navigator) {
        navigator.push({
            name: 'HouseDataStudent',
            component: HouseDataStudent,
        })
    }
  }

    async onFilter () {
      try {
          var data = await fetch('http://test-zzpengg.c9users.io:8080/house');
          this.nextPage();

        }catch (errors) {
        console.log(errors);
      }
    }

    render() {
        var area = [
          {label: '進德 ', value: '進德' },
          {label: '寶山', value: '寶山' }
        ];
        var type = [
          {label: '套房 ', value: '套房' },
          {label: '雅房', value: '雅房' }
        ];
        var rent = [
          {label: '3000以下 ', value: 0 },
          {label: '3000~4000', value: 1 }
        ];
        var waterandelec = [
          {label: '包水 ', value: 0 },
          {label: '包電', value: 1 }
        ];
        return (
          <View style={styles.container}>

            <Header style={{backgroundColor: "rgb(122, 68, 37)"}}>
              <Button transparent onPress={this.prePage.bind(this)} >
                <Icon name='ios-arrow-back' />
              </Button>
              <Title>租屋條件</Title>
            </Header>
            <Content>
                <View>
                  <List style={styles.form}>
                    <ListItem style={{ marginTop: 15 }}>
                      <Text style={styles.labelText}>區域</Text>
                      <RadioForm
                        style={{marginLeft: 5}}
                        radio_props={area}
                        initial={0}
                        formHorizontal={true}
                        onPress={(value) => {
                          this.setState({
                            area: value
                          })
                        }}
                      />
                    </ListItem>
                    <ListItem style={{ marginTop: 15 }}>
                      <Text style={styles.labelText}>類型</Text>
                      <RadioForm
                        style={{marginLeft: 5}}
                        radio_props={type}
                        initial={0}
                        formHorizontal={true}
                        onPress={(value) => {
                          this.setState({
                            type: value
                          })
                        }}
                      />
                    </ListItem>
                    <ListItem style={{ marginTop: 15 }}>
                      <Text style={styles.labelText}>租金</Text>
                      <RadioForm
                        style={{marginLeft: 5}}
                        radio_props={rent}
                        initial={0}
                        formHorizontal={true}
                        onPress={(value) => {
                          this.setState({
                            rent: value
                          })
                        }}
                      />
                    </ListItem>
                    <ListItem style={{ marginTop: 15 }}>
                      <Text style={styles.labelText}>是否包水電</Text>
                      <RadioForm
                        style={{marginLeft: 5}}
                        buttonSize= {20}
                        radio_props={waterandelec}
                        initial={0}
                        formHorizontal={true}
                        onPress={(value) => {
                          this.setState({
                            waterandelec: value
                          })
                        }}
                      />
                    </ListItem>
                   <Text>{this.state.error}</Text>
                   <Button style={styles.submitBtn} onPress={this.onFilter.bind(this)} block warning> 確認送出 </Button>
                 </List>
                </View>
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
  disabledBtn: {
    backgroundColor: 'rgb(255, 201, 150)',
    elevation: 0,
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
  title: {
    height: 40,
  },
  titleText: {
    position: 'absolute',
    top: -6,
    top: -18,
    left: 50,
    fontSize: 54,
    fontSize: 65,
    zIndex: 1000,
    elevation: 2,
    color: 'rgb(55, 27, 8)',
  },
  submitBtn: {
    elevation: 1,
    marginLeft: 18,
    marginRight: 0,
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
    width: 100,
    height: 100,
    position: 'absolute',
    top: 0,
    left: 0,
  },
  labelText: {
    fontSize: 15,
    marginTop: 5
  },
});
