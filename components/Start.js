import React from 'react';
import { ImageBackground, StyleSheet, View, TextInput, Text, Button } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

export default class Start extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      backgroundColor: ""
    };
  }

  setBackgroundColor(color) {
    this.setState({ backgroundColor: color })
  }

  render() {
    return (
      <ImageBackground
        source={require('../assets/background-image.png')}
        resizeMode="cover"
        style={styles.background} >
        <View style={styles.container}>
          <View style={styles.titleContainer}>
            <Text style={styles.titleText}>App Title</Text>
          </View>
          {/*prompt user to enter name*/}
          {/*onChange sets name state to name entered*/}
          <View style={styles.inputContainer}>
            <View style={styles.textInputContainer}>
              <TextInput
                style={styles.input}
                onChangeText={(name) => this.setState({ name })}
                value={this.state.name}
                placeholder='Your Name'>
              </TextInput>
            </View>
            <View style={styles.colorSelection}>
              <Text style={styles.colorSelectionText}>Choose Background Color:</Text>
              <View style={styles.colorChart}>
                <TouchableOpacity
                  style={this.state.backgroundColor === "#090C08" ? styles.color1Selected : styles.color1}
                  onPress={() => this.setBackgroundColor("#090C08")}>
                </TouchableOpacity>
                <TouchableOpacity
                  style={this.state.backgroundColor === "#474056" ? styles.color2Selected : styles.color2}
                  onPress={() => this.setBackgroundColor('#474056')}></TouchableOpacity>
                <TouchableOpacity
                  style={this.state.backgroundColor === "#8A95A5" ? styles.color3Selected : styles.color3}
                  onPress={() => this.setBackgroundColor('#8A95A5')}></TouchableOpacity>
                <TouchableOpacity
                  style={this.state.backgroundColor === "#B9C6AE" ? styles.color4Selected : styles.color4}
                  onPress={() => this.setBackgroundColor('#B9C6AE')}></TouchableOpacity>
              </View>
            </View>
            {/*onPress sends name to Chat page as a prop*/}
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={styles.chatButton}
                onPress={() => this.props.navigation.navigate('Chat', { name: this.state.name, backgroundColor: this.state.backgroundColor })} >
                <Text style={styles.buttonText}>Start Chatting</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ImageBackground>
    )
  }
}
const styles = StyleSheet.create({
  background: {
    flex: 1,
    height: '100%',
    width: '100%'
  },
  input: {
    borderColor: 'gray',
    borderWidth: 1,
    height: '70%',
    paddingLeft: 20,
    fontSize: 16,
    fontWeight: '300',
    color: '#757083',
  },
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
  },
  titleText: {
    marginTop: '20%',
    fontSize: 45,
    fontWeight: '600',
    color: '#FFFFFF'
  },
  inputContainer: {
    flex: .44,
    marginTop: 20,
    width: '88%',
    alignItems: 'center',
    backgroundColor: 'white',
    flexDirection: 'column',
    marginBottom: '10%',
  },
  textInputContainer: {
    flex: 1,
    marginTop: 20,
    width: '88%',
  },
  chatButton: {
    width: '100%',
    height: '80%',
    backgroundColor: '#757083',
    justifyContent: 'center',
    marginBottom: 10
  },
  buttonText: {
    color: '#FFFFFF',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '600',
  },
  buttonContainer: {
    flex: 1,
    justifyContent: 'center',
    width: '88%'
  },
  colorSelection: {
    flex: 1,
  },
  colorSelectionText: {
    fontSize: 16,
    fontWeight: '300',
    color: '#757083',
    opacity: 1,
    marginBottom: 10
  },
  colorChart: {
    flexDirection: 'row',
    flex: 1
  },
  titleContainer: {
    flex: .56
  },
  color1: {
    backgroundColor: '#090C08',
    height: 50,
    width: 50,
    borderRadius: 25,
    marginRight: '7%'
  },
  color1Selected: {
    backgroundColor: '#090C08',
    height: 50,
    width: 50,
    borderRadius: 25,
    marginRight: '7%',
    borderColor: '#757083',
    borderWidth: 5
  },
  color2: {
    backgroundColor: '#474056',
    height: 50,
    width: 50,
    borderRadius: 25,
    marginRight: '7%'
  },
  color2Selected: {
    backgroundColor: '#474056',
    height: 50,
    width: 50,
    borderRadius: 25,
    marginRight: '7%',
    borderColor: '#757083',
    borderWidth: 5
  },
  color3: {
    backgroundColor: '#8A95A5',
    height: 50,
    width: 50,
    borderRadius: 25,
    marginRight: '7%'
  },
  color3Selected: {
    backgroundColor: '#8A95A5',
    height: 50,
    width: 50,
    borderRadius: 25,
    marginRight: '7%',
    borderColor: '#757083',
    borderWidth: 5
  },
  color4: {
    backgroundColor: '#B9C6AE',
    height: 50,
    width: 50,
    borderRadius: 25,
    marginRight: '7%'
  },
  color4Selected: {
    backgroundColor: '#B9C6AE',
    height: 50,
    width: 50,
    borderRadius: 25,
    marginRight: '7%',
    borderColor: '#757083',
    borderWidth: 5
  }
})