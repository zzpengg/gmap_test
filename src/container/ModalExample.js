import React, { Component } from 'react';
import { StyleSheet, Modal, Text, TouchableHighlight, View , Animated, Dimensions,} from 'react-native';
import { Container, Header, Title, Content, Button, Icon, Badge, Tabs, Card, CardItem, List, ListItem, InputGroup, Input } from 'native-base';
var {height, width} = Dimensions.get('window');

export default class ModalExample extends Component {

  constructor(props) {
    super(props);
    this.state = {
      slideInValue: new Animated.Value(10),
    };
  }

  state = {
    modalVisible: false,
  }

  setModalVisible(visible) {
    this.setState({modalVisible: visible});
  }

  render() {
    return (
      <View style={{marginTop: 22}}>
      <Modal
      transparent={true}
      visible={this.props.open}
      onRequestClose={() => {this.props.toggleModal()}}
      animationType='fade'
      >
      <View style={styles.updateModalMask}></View>
      <Animated.View style={[
          styles.updateModal,
          {transform: [{translateY: this.state.slideInValue}]}
        ]} >
        <View style={{padding:18,paddingTop:16,paddingBottom:6}} >
          <Text>Limit</Text>
          <Input selectTextOnFocus={true} keyboardType='numeric' placeholder="Limit" onChangeText={(limit) => {this.props.setLimit(limit)}} />
          <Text>Offset</Text>
          <Input selectTextOnFocus={true} keyboardType='numeric' placeholder="Offset" onChangeText={(offset) => {this.props.setOffset(offset)}} />
        </View>
        <Button style={{margin: 15,elevation:0}} block warning onPress={()=>this.updatePokemons()} >更新 Pokemon</Button>
      </Animated.View>
    </Modal>

        <TouchableHighlight onPress={() => {
          this.setModalVisible(true)
        }}>
          <Text>Show Modal</Text>
        </TouchableHighlight>

      </View>
    );
  }
}

const styles = StyleSheet.create({
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
  }
});
