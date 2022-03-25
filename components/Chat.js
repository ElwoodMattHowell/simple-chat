import React from 'react';
import { View, StyleSheet } from 'react-native';

export default class Chat extends React.Component {

  //set screen title to props.name
  componentDidMount() {
    let name = this.props.route.params.name;
    this.props.navigation.setOptions({ title: name });
  }

  render() {
    let backgroundColor = this.props.route.params.backgroundColor
    return (
      <View style={{ backgroundColor: backgroundColor, height: '100%' }}></View>
    )
  }
}



