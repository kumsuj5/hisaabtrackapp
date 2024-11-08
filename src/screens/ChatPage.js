import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet, StatusBar } from 'react-native';
import Colors from '../components/Colors';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const ChatPage = ({ route }) => {
  // console.log(route)s
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
console.log(route.params.details)
  const sendMessage = () => {
    if (message.trim()) {
      setMessages([...messages, { id: messages.length, text: message, sent: true }]);
      setMessage('');
    }
  };

  const renderMessage = ({ item }) => {
    const messageStyle = item.sent ? styles.sentMessage : styles.receivedMessage;
    return (
      <View style={[styles.messageBubble, messageStyle]}>
        <Text style={styles.messageText}>{item.text}</Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {/* <View style={styles.header}>
        <Text style={styles.headerText}>{route?.params?.details.name || 'User'}</Text>
      </View> */}

      {/* Chat Messages */}
      <StatusBar   animated={true}
        backgroundColor={Colors.teal}
/>
      <FlatList
        data={messages}
        renderItem={renderMessage}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.chatContainer}
        inverted
      />

      {/* Message Input */}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.textInput}
          placeholder="Type a message"
          value={message}
          onChangeText={setMessage}
        />
     
        <TouchableOpacity onPress={sendMessage} style={styles.sendButton}>
        <MaterialCommunityIcons name="send" size={20} color="#fff" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
  },
  header: {
    height: 60,
    backgroundColor: '#6200ea',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  headerText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  chatContainer: {
    flexGrow: 1,
    padding: 10,
  },
  messageBubble: {
    padding: 10,
    borderRadius: 10,
    marginVertical: 5,
    maxWidth: '75%',
  },
  sentMessage: {
    backgroundColor: Colors.teal,
    alignSelf: 'flex-end',
  },
  receivedMessage: {
    backgroundColor: '#e0e0e0',
    alignSelf: 'flex-start',
  },
  messageText: {
    color: '#fff',
  },
  inputContainer: {
    flexDirection: 'row',
    padding: 10,
    borderTopWidth: 1,
    borderColor: '#ccc',
  },
  textInput: {
    flex: 1,
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 20,
    paddingHorizontal: 15,
    backgroundColor: '#fff',
  },
  sendButton: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.teal,
    borderRadius: 20,
    paddingHorizontal: 10,
    marginLeft: 10,
  },
  sendButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default ChatPage;
