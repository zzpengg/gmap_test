import React, { Component } from 'react';
import { StyleSheet,Modal,Text,View } from 'react-native';
import {Spinner} from 'native-base';
const styles = StyleSheet.create({
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
});
export  class Loading extends Component {
    constructor(props){
        super(props)
    }
    render(){
        return(
        <Modal
            visible={this.props.visible}
            animationType={"fade"}
            transparent={true}
            onRequestClose={() => {}}
        >
            <View style={styles.modalcontainer}>
            <View style={styles.innerContainer}>
                <Text>{this.props.label}</Text>
                <Spinner color='blue'/>
            </View>
            </View>
       </Modal>
        );
    }
}
