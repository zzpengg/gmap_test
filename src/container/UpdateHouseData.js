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
  View
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
} from 'native-base';

export default class Filter extends Component {
  render() {
    // const { region } = this.props;
    //console.log(region);

   return (
     <Container style={styles.container}>
        <Header searchBar rounded>
          <InputGroup>
            <Icon name="ios-search" />
            <Input placeholder="Search" />
            <Icon name="ios-people" />
          </InputGroup>
          <Button transparent>
            Search
          </Button>
        </Header>

        <Content padder>
          <InputGroup borderType="regular" style={styles.mb}>
            <Input placeholder="update Textbox" />
          </InputGroup>
          <InputGroup borderType="underline" style={styles.mb}>
            <Input placeholder="Underlined Textbox" />
          </InputGroup>
          <InputGroup borderType="rounded" style={styles.mb}>
            <Input placeholder="Rounded Textbox" />
          </InputGroup>
          <InputGroup style={styles.mb}>
            <Icon name="ios-home" style={{ color: '#00C497' }} />
            <Input placeholder="Icon Textbox" />
          </InputGroup>
          <InputGroup iconRight style={styles.mb}>
            <Icon name="ios-swap" style={{ color: '#00C497' }} />
            <Input placeholder="Icon Alignment in Textbox" />
          </InputGroup>
          <InputGroup iconRight success style={styles.mb}>
            <Icon name="ios-checkmark-circle" style={{ color: '#00C497' }} />
            <Input placeholder="Textbox with Success Input" />
          </InputGroup>
          <InputGroup iconRight error style={styles.mb}>
            <Icon name="ios-close-circle" style={{ color: 'red' }} />
            <Input placeholder="Textbox with Error Input" />
          </InputGroup>
          <InputGroup iconRight disabled style={styles.mb}>
            <Icon name="ios-information-circle" style={{ color: '#384850' }} />
            <Input placeholder="Disabled Textbox" />
          </InputGroup>
        </Content>
      </Container>
   );
  }
}

const styles = StyleSheet.create({
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
});
