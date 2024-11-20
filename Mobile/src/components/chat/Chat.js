import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, KeyboardAvoidingView } from 'react-native';
import ChatStyles from './ChatStyle';
import Icon from 'react-native-vector-icons/Ionicons';

const ChatForm = () => {
    const [messages, setMessages] = useState([]);
    const [inputText, setInputText] = useState('');

    const handleSend = () => {
        if (inputText.trim() === '') return;

        // Add user's message
        const userMessage = { id: `${Date.now()}_user`, text: inputText, sender: 'user' };
        setMessages((prevMessages) => [...prevMessages, userMessage]);

        // Simulate bot's reply
        const botMessage = { id: `${Date.now()}_bot`, text: `Echo: ${inputText}`, sender: 'bot' };
        setTimeout(() => {
            setMessages((prevMessages) => [...prevMessages, botMessage]);
        }, 1000);

        setInputText('');
    };

    const renderMessage = ({ item }) => {
        const isUser = item.sender === 'user';
        return (
            <View style={[ChatStyles.messageContainer, isUser ? ChatStyles.userMessage : ChatStyles.botMessage]}>
                <Text style={ChatStyles.messageText}>{item.text}</Text>
            </View>
        );
    };

    return (
        <KeyboardAvoidingView style={ChatStyles.container} behavior="padding">
            {/* Header */}
            <View style={ChatStyles.header}>
                <Text style={ChatStyles.headerText}>Chat with AnchiBot</Text>
            </View>

            {/* Chat Area */}
            <FlatList
                data={messages}
                renderItem={renderMessage}
                keyExtractor={(item) => item.id}
                style={ChatStyles.chatArea}
                contentContainerStyle={{ paddingBottom: 10 }}
            />

            {/* Input Area */}
            <View style={ChatStyles.inputContainer}>
                <TextInput
                    style={ChatStyles.input}
                    placeholder="Nhập tin nhắn..."
                    value={inputText}
                    onChangeText={setInputText}
                />
                <TouchableOpacity onPress={handleSend} style={ChatStyles.sendButton}>
                    <Icon name="send" size={20} color="#fff" />
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
    );
};

export default ChatForm;
