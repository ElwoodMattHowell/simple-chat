import React from 'react';
import { View, Platform, KeyboardAvoidingView } from 'react-native';
import { Bubble, GiftedChat } from 'react-native-gifted-chat'

export default class Chat extends React.Component {
  constructor() {
    super();
    this.state = {
      messages: []
    };
  }

  //set screen title to props.name
  //sets messages state with system message
  componentDidMount() {
    let name = this.props.route.params.name;
    this.props.navigation.setOptions({ title: name });
    this.setState({
      messages: [
        {
          _id: 1,
          text: "Hello " + name,
          createdAt: new Date(),
          user: {
            _id: 2,
            name: "React Native",
            avatar: "https://placeimg.com/140/140/any"
          }
        },
        {
          _id: 2,
          text: "You have entered a chat",
          createdAt: new Date(),
          system: true
        }
      ]
    });
  }

  //joins sent message to the messages object of GiftedChat so the recipient can see the message in the chat after receiving it
  onSend(messages = []) {
    this.setState((previousState) => ({
      messages: GiftedChat.append(previousState.messages, messages)
    }))
  }

  //sets background color of right text bubble
  renderBubble(props) {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          right: {
            backgroundColor: '#000'
          }
        }}
      />
    )
  }

  render() {
    let backgroundColor = this.props.route.params.backgroundColor
    return (
      <View style={{ backgroundColor: backgroundColor, height: '100%' }} >
        {/*uses GiftedChat to render chat screen*/}
        <GiftedChat
          rendeBubble={this.renderBubble.bind(this)}
          messages={this.state.messages}
          onSend={(messages) => this.onSend(messages)}
          user={{
            _id: 1
          }}
        />
        {/*assures keyboard is visible when entering text into input field on Android*/}
        {Platform.OS === 'android' ? <KeyboardAvoidingView behavior="height" /> : null}
      </View>
    )
  }
}




