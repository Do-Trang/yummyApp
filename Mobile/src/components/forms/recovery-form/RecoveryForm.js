import React from 'react';
import { View, Text, TextInput, Button, TouchableOpacity, Image } from 'react-native';

const RecoveryForm = ({ account }) => {
    return (
        <View style={{ padding: 16 }}>
            {/* Image */}
            <Image 
                source={{ uri: 'https://example.com/your-image.png' }} // Replace with your image URL
                style={{ width: 100, height: 100, alignSelf: 'center', marginBottom: 16 }}
            />
            
            {/* Notification */}
            <Text style={{ textAlign: 'center', marginBottom: 8 }}>
                A password recovery code has been sent to {account}
            </Text>
            <Text style={{ textAlign: 'center', marginBottom: 16 }}>
                Please check your email or SMS for the code.
            </Text>
            
            {/* Enter OTP */}
            <Text>Enter your verification code (OTP):</Text>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 8 }}>
                <TextInput
                    style={{ width: 40, height: 40, borderBottomWidth: 1, textAlign: 'center' }}
                    keyboardType="numeric"
                    maxLength={1}
                />
                <TextInput
                    style={{ width: 40, height: 40, borderBottomWidth: 1, textAlign: 'center' }}
                    keyboardType="numeric"
                    maxLength={1}
                />
                <TextInput
                    style={{ width: 40, height: 40, borderBottomWidth: 1, textAlign: 'center' }}
                    keyboardType="numeric"
                    maxLength={1}
                />
                <TextInput
                    style={{ width: 40, height: 40, borderBottomWidth: 1, textAlign: 'center' }}
                    keyboardType="numeric"
                    maxLength={1}
                />
                <TextInput
                    style={{ width: 40, height: 40, borderBottomWidth: 1, textAlign: 'center' }}
                    keyboardType="numeric"
                    maxLength={1}
                />
                <TextInput
                    style={{ width: 40, height: 40, borderBottomWidth: 1, textAlign: 'center' }}
                    keyboardType="numeric"
                    maxLength={1}
                />
            </View>
            <Text>Time remaining: 60s</Text>
            <Button title="Submit" onPress={() => {}} />
            <TouchableOpacity onPress={() => {}}>
                <Text style={{ textAlign: 'center', marginTop: 8 }}>Resend OTP</Text>
            </TouchableOpacity>
        </View>
    );
};

export default RecoveryForm;
