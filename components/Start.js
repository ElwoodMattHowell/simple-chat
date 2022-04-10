import React from 'react';
import { ImageBackground, StyleSheet, View, TextInput, Text, KeyboardAvoidingView } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Icon from "react-native-vector-icons/FontAwesome";

export default class Start extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      backgroundColor: ""
    };
  }

  //sets background color based on user choice
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
            <Text style={styles.titleText}>Chat App</Text>
          </View>
          {/*prompt user to enter name*/}
          {/*onChange sets name state to name entered*/}
          <View style={styles.inputContainer}>
            <View style={styles.textInputContainer}>
              <Icon style={styles.icon} name="user" size={30} color="#888" />
              <TextInput
                style={styles.input}
                onChangeText={(name) => this.setState({ name })}
                value={this.state.name}
                placeholder='Your Name'>
              </TextInput>
            </View>
            <View style={styles.colorSelection}>
              <Text style={styles.colorSelectionText}>Choose Background Color:</Text>
              {/*TouchableOpacity creates buttons for the user to press to select background color*/}
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
        {Platform.OS === 'ios' ? <KeyboardAvoidingView behavior="padding" /> : null}
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
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  titleContainer: {
    flex: 1,
    resizeMode: 'contain'
  },
  titleText: {
    marginTop: '20%',
    fontSize: 45,
    fontWeight: '600',
    color: '#FFFFFF'
  },
  inputContainer: {
    flexDirection: 'column',
    flexGrow: 1,
    flexShrink: 0,
    height: 200,
    marginTop: 20,
    width: '88%',
    height: 150,
    justifyContent: 'space-evenly',
    alignItems: 'center',
    backgroundColor: 'white',
    flexDirection: 'column',
    marginBottom: '10%',
    borderRadius: 10,
    paddingTop: 15,
    paddingBottom: 15
  },
  textInputContainer: {
    flexDirection: "row",
    justifyContent: 'flex-start',
    alignItems: "center",
    backgroundColor: "#ffffff",
    borderWidth: 1,
    borderColor: "#000",
    height: 90,
    width: "88%",
    borderRadius: 10,
    marginBottom: 60,
    marginTop: 20,
    padding: 10,
  },
  icon: {
    marginRight: 15,
    height: 25,
    width: 25,
  },
  input: {
    height: '70%',
    width: '100%',
    fontSize: 16,
    fontWeight: '300',
    color: '#757083',
  },
  chatButton: {
    width: '100%',
    height: 90,
    backgroundColor: '#757083',
    justifyContent: 'center',
    borderRadius: 10,
    marginBottom: 15,
    marginTop: 15
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
    width: '88%',
    height: 90
  },
  colorSelection: {
    flex: 1,
    height: 90
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
    flex: 1,
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