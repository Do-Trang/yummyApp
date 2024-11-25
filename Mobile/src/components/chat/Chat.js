import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, KeyboardAvoidingView, Alert } from 'react-native';
import ChatStyles from './ChatStyle';
import Icon from 'react-native-vector-icons/Ionicons';

const ChatForm = () => {
    const [messages, setMessages] = useState([]);
    const [inputText, setInputText] = useState('');
    const [sessionId, setSessionId] = useState(null);
    const userId = 'user123'; // Example user ID
    const flatListRef = useRef(); // Reference for FlatList to scroll

    const handleSend = async () => {
        if (inputText.trim() === '') return;

        const userMessage = { id: `${Date.now()}_user`, text: inputText, sender: 'user' };
        setMessages((prevMessages) => [...prevMessages, userMessage]);

        try {
            let endpoint = 'http://192.168.122.1:5000/chat';
            let body = {
                user_id: userId,
                question: inputText
            };

            if (!sessionId) {
                // Initialize a new session
                endpoint = 'http://192.168.122.1:5000/first-chat';
            } else {
                // Use existing session
                body.session_id = sessionId;
            }

            const response = await fetch(endpoint, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(body)
            });

            const result = await response.json();

            if (response.ok) {
                const botMessage = { id: `${Date.now()}_bot`, text: result.response, sender: 'bot' };
                setMessages((prevMessages) => [...prevMessages, botMessage]);

                if (!sessionId && result.session_id) {
                    setSessionId(result.session_id); // Save session ID after first chat
                }
            } else {
                Alert.alert('Error', result.error || 'Failed to get response from chatbot');
            }
        } catch (error) {
            console.error('Error sending message:', error);
            Alert.alert('Error', 'Failed to send message. Please try again.');
        }

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

    useEffect(() => {
        // Scroll to the bottom whenever a new message is added
        flatListRef.current?.scrollToEnd({ animated: true });
    }, [messages]);

    return (
        <KeyboardAvoidingView style={ChatStyles.container} behavior="padding">
            {/* Header */}
            <View style={ChatStyles.header}>
                <Text style={ChatStyles.headerText}>Chat with AnchiBot</Text>
            </View>

            {/* Chat Area */}
            <FlatList
                ref={flatListRef}
                data={messages}
                renderItem={renderMessage}
                keyExtractor={(item) => item.id}
                style={ChatStyles.chatArea}
                contentContainerStyle={{ paddingBottom: 200 }}
                keyboardShouldPersistTaps="handled" // Prevent keyboard dismissing on tapping inside the list
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
