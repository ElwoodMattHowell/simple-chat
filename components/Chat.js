import React from 'react';
import { View, Platform, KeyboardAvoidingView } from 'react-native';
import { Bubble, GiftedChat } from 'react-native-gifted-chat';

import * as firebase from 'firebase';
import "firebase/firestore";

// import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";

export default class Chat extends React.Component {
  constructor() {
    super();
    this.state = {
      messages: [],
      uid: 0,
      user: {
        _id: "",
        name: "",
        avatar: ""
      }
    };

    const firebaseConfig = {
      apiKey: "AIzaSyBm-P-jxAPpQQkDJraLDZWF2EK5offuQ1g",
      authDomain: "chat-4c9b2.firebaseapp.com",
      projectId: "chat-4c9b2",
      storageBucket: "chat-4c9b2.appspot.com",
      messagingSenderId: "1044459548557",
      appId: "1:1044459548557:web:0ed248f1479590f75e97c4",
      measurementId: "G-1TQ1KMJ9SN"
    };

    if (!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig);
    }
    this.referenceChatMessages = firebase.firestore().collection("messages");
  }

  //set screen title to props.name
  //sets messages state with system message
  componentDidMount() {
    let name = this.props.route.params.name;
    this.props.navigation.setOptions({ title: name });
    this.authUnsubscribe = firebase.auth().onAuthStateChanged(async (user) => {
      if (!user) {
        this.setState({
          loggedInText: "Please wait, You're being authenticated"
        })
        await firebase.auth().signInAnonymously()
      }
      this.setState({
        uid: user.uid,
        loggedInText: 'Hello there',
        messages: [],
        user: {
          _id: user.uid,
          name: name,
          avatar: "https://placeimg.com/140/140/any"
        }
      });
      this.unsubscribe = this.referenceChatMessages.orderBy("createdAt", "desc").onSnapshot(this.onCollectionUpdate);
    });
  }

  componentWillUnMount() {
    this.unsunscribe();
    this.authUnsubscribe();
  }

  onCollectionUpdate = (querySnapshot) => {
    const messages = [];
    // go through each document
    querySnapshot.forEach((doc) => {
      // get the QueryDocumentSnapshot's data
      let data = doc.data();
      messages.push({
        _id: data._id,
        text: data.text,
        createdAt: data.createdAt.toDate(),
        user: {
          _id: data.user._id,
          name: data.user.name,
          avatar: data.user.avatar
        }
      });
    });
    this.setState({
      messages: messages
    });
  }
  addMessage() {
    const message = this.state.messages[0];
    this.referenceChatMessages.add({
      _id: message._id,
      text: message.text || "",
      createdAt: message.createdAt,
      user: this.state.user
    })
  }
  //joins sent message to the messages object of GiftedChat so the recipient can see the message in the chat after receiving it
  onSend(messages = []) {
    this.setState((previousState) => ({
      messages: GiftedChat.append(previousState.messages, messages)
    }), () => {
      this.addMessage();
    })
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
            _id: this.state.user._id,
            name: this.state.name,
            avatar: this.state.user.avatar
          }}
        />
        {/*assures keyboard is visible when entering text into input field on Android*/}
        {Platform.OS === 'android' ? <KeyboardAvoidingView behavior="height" /> : null}
      </View>
    )
  }
}




