import React from 'react';
import { View, Platform, KeyboardAvoidingView, LogBox } from 'react-native';
import { Bubble, GiftedChat, InputToolbar } from 'react-native-gifted-chat';
import MapView from 'react-native-maps';

import firebase from 'firebase';
import "firebase/firestore";
import AsyncStorage from '@react-native-async-storage/async-storage';
import NetInfo from '@react-native-community/netinfo';
import CustomActions from './CustomActions.js';

//Configure Firebase
const firebaseConfig = {
  apiKey: "AIzaSyBm-P-jxAPpQQkDJraLDZWF2EK5offuQ1g",
  authDomain: "chat-4c9b2.firebaseapp.com",
  projectId: "chat-4c9b2",
  storageBucket: "chat-4c9b2.appspot.com",
  messagingSenderId: "1044459548557",
  appId: "1:1044459548557:web:0ed248f1479590f75e97c4",
  measurementId: "G-1TQ1KMJ9SN"
};

LogBox.ignoreAllLogs();

export default class Chat extends React.Component {
  constructor() {
    super();
    this.state = {
      isConnected: false,
      messages: [],
      uid: 0,
      user: {
        _id: "",
        name: "",
        avatar: ""
      },
      image: null,
      ocation: null
    };

    //initialize firebase
    if (!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig);
    }
    this.referenceChatMessages = firebase.firestore().collection("messages");

  }

  //get messages from async storage
  async getMessages() {
    let messages = '';
    try {
      messages = await AsyncStorage.getItem('messages') || [];
      this.setState({
        messages: JSON.parse(messages)
      });
    } catch (error) {
      console.log(error.message);
    }
  }


  //save messages to async storage
  async saveMessages() {
    try {
      await AsyncStorage.setItem('messages', JSON.stringify(this.state.messages));
    } catch (error) {
      console.log(error.message);
    }
  }

  //delete messages from async storage
  async deleteMessages() {
    try {
      await AsyncStorage.removeItem('messages');
      this.setState({
        messages: []
      })
    } catch (error) {
      console.log(error.message);
    }
  }



  componentDidMount() {
    //set screen title to props.name
    let name = this.props.route.params.name;
    //sets messages state with system message
    this.props.navigation.setOptions({ title: name });
    //check for online staus
    NetInfo.fetch().then(connection => {
      if (connection.isConnected) {
        this.authUnsubscribe = firebase.auth().onAuthStateChanged(async (user) => {
          // if no user is signed in, create new user
          if (!user) {
            this.setState({
              loggedInText: "Please wait, You're being authenticated"
            })
            await firebase.auth().signInAnonymously()
          }
          //update user
          this.setState({
            isConnected: true,
            uid: user.uid,
            loggedInText: 'Hello there',
            messages: [],
            user: {
              _id: user.uid,
              name: name,
              avatar: "https://placeimg.com/140/140/any"
            }
          });
          //checks for updates in the collection
          this.unsubscribe = this.referenceChatMessages.orderBy("createdAt", "desc").onSnapshot(this.onCollectionUpdate);
        });
        this.saveMessages();
      } else {
        this.getMessages();
        this.setState({
          isConnected: false
        })
      }
    });
  }

  componentWillUnMount() {
    //stop listening for changes
    this.unsunscribe();
    //stop listening to authentication
    this.authUnsubscribe();
  }

  // takes snapshot of messages stored in collection
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
        },
        image: data.image || null,
        location: data.location || null
      });
    });
    this.setState({
      messages: messages
    });
    this.saveMessages();
  }

  //add a new message to the collection
  addMessage() {
    const message = this.state.messages[0];
    this.referenceChatMessages.add({
      _id: message._id,
      text: message.text || '',
      createdAt: message.createdAt,
      user: this.state.user,
      image: message.image || '',
      location: message.location || null,
    })
  }
  //joins sent message to the messages object of GiftedChat so the recipient can see the message in the chat after receiving it
  onSend(messages = []) {
    this.setState((previousState) => ({
      messages: GiftedChat.append(previousState.messages, messages)
    }), () => {
      this.addMessage();
      this.saveMessages();
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

  renderInputToolbar(props) {
    if (this.state.isConnected == false) {
    } else {
      return (
        <InputToolbar {...props} />
      );
    }
  }

  renderCustomActions(props) {
    return <CustomActions {...props} />;
  }

  renderCustomView(props) {
    const { currentMessage } = props;
    if (currentMessage.location) {
      return (
        <MapView
          style={{ width: 300, height: 200 }}
          region={{
            latitude: currentMessage.location.latitude,
            longitude: currentMessage.location.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421
          }}
        />
      );
    }
    return null;
  }

  render() {
    let backgroundColor = this.props.route.params.backgroundColor
    return (
      <View style={{ backgroundColor: backgroundColor, height: '100%' }} >
        {/*uses GiftedChat to render chat screen*/}
        <GiftedChat
          rendeBubble={this.renderBubble.bind(this)}
          renderInputToolbar={this.renderInputToolbar.bind(this)}
          messages={this.state.messages}
          onSend={(messages) => this.onSend(messages)}
          renderActions={this.renderCustomActions}
          renderCustomView={this.renderCustomView}
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




