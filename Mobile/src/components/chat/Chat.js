import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, KeyboardAvoidingView, Alert } from 'react-native';
import ChatStyles from './ChatStyle';
import { CustomButtonOutline1 } from '../CustomButton';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import colors from '../../constants/colors';
import AudioRecorderPlayer from 'react-native-audio-recorder-player';
// Thêm import Tts
import Tts from 'react-native-tts';

const ChatForm = (props) => {
    const [messages, setMessages] = useState([]);
    const [inputText, setInputText] = useState('');
    const [sessionId, setSessionId] = useState(null);
    const [recording, setRecording] = useState(false);

    const userId = 'user123';
    const flatListRef = useRef();
    const navigation = useNavigation();
    const audioRecorderPlayer = useRef(new AudioRecorderPlayer()).current;

    // Thiết lập một số option cho TTS
    useEffect(() => {
        // Thay đổi ngôn ngữ theo nhu cầu, ví dụ "vi-VN" hoặc "en-US"
        Tts.setDefaultLanguage('vi-VN');
        // Tốc độ đọc, giá trị mặc định khoảng 0.5 -> 0.7
        Tts.setDefaultRate(0.5);
        // Cao độ (pitch), giá trị mặc định: 1.0
        Tts.setDefaultPitch(1.0);
    }, []);

    // Hàm gửi tin nhắn
    const handleSend = async () => {
        if (inputText.trim() === '') return;

        const userMessage = { id: `${Date.now()}_user`, text: inputText, sender: 'user' };
        setMessages((prevMessages) => [...prevMessages, userMessage]);

        try {
            let endpoint = 'http://172.20.10.10:5000/chat';
            let body = {
                user_id: userId,
                question: inputText
            };

            if (!sessionId) {
                endpoint = 'http://172.20.10.10:5000/first-chat';
            } else {
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

                // Lưu session ID khi lần đầu chat
                if (!sessionId && result.session_id) {
                    setSessionId(result.session_id);
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

    // Hàm thu âm giọng nói
    const handleRecordVoice = async () => {
        try {
            if (recording) {
                const result = await audioRecorderPlayer.stopRecorder();
                audioRecorderPlayer.removeRecordBackListener();
                setRecording(false);

                const formData = new FormData();
                formData.append('file', {
                    uri: result,
                    name: 'voice-recording.wav',
                    type: 'audio/wav'
                });

                const response = await fetch('http://192.168.122.1:5000/transcribe', {
                    method: 'POST',
                    body: formData,
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                });

                const resultJson = await response.json();

                if (response.ok) {
                    setInputText(resultJson.transcription);
                } else {
                    Alert.alert('Error', resultJson.error || 'Failed to transcribe voice');
                }
            } else {
                const result = await audioRecorderPlayer.startRecorder();
                audioRecorderPlayer.addRecordBackListener((e) => {
                    console.log('Recording...', e);
                });
                setRecording(true);
            }
        } catch (error) {
            console.error('Error recording voice:', error);
            Alert.alert('Error', 'Failed to record voice. Please try again.');
        }
    };

    // Hàm phát âm thanh (Text To Speech) cho 1 tin nhắn
    const speakMessage = (text) => {
        Tts.stop();
        Tts.speak(text);
    };

    // Hàm render mỗi tin nhắn trên FlatList
    const renderMessage = ({ item }) => {
        const isUser = item.sender === 'user';

        return (
            <View style={[ChatStyles.messageContainer, isUser ? ChatStyles.userMessage : ChatStyles.botMessage]}>
                {/* Nếu là bot thì hiện thêm nút loa */}
                {!isUser && (
                    <TouchableOpacity onPress={() => speakMessage(item.text)} style={{ marginRight: 8 }}>
                        <Icon name="volume-high" size={20} color="#6464af" />
                    </TouchableOpacity>
                )}
                <Text style={ChatStyles.messageText}>{item.text}</Text>
            </View>
        );
    };

    useEffect(() => {
        // Mỗi khi cập nhật messages, scroll tới cuối
        flatListRef.current?.scrollToEnd({ animated: true });
    }, [messages]);

    return (
        <KeyboardAvoidingView style={ChatStyles.container} behavior="padding">
            {/* Header */}
            <View style={ChatStyles.header}>
                <CustomButtonOutline1
                    icon_name="arrow-back"
                    style={ChatStyles.backButton}
                    onPress={() => navigation.pop()}
                    onLongPress={() => navigation.pop()}
                    colors={[colors.home1, colors.home2, colors.white]}
                    type="ionicon"
                    size={36}
                />
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
                keyboardShouldPersistTaps="handled"
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
                    <Icon name="send" size={30} color="#fff" />
                </TouchableOpacity>
                <TouchableOpacity onPress={handleRecordVoice} style={ChatStyles.recordButton}>
                    <Icon name={recording ? "mic-off" : "mic"} size={20} color="#6464af" />
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
    );
};

export default ChatForm;
