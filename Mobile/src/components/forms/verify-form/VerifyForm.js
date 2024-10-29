import React from 'react';
import { View, Text, TextInput, Button, TouchableOpacity, Image } from 'react-native';
import VerifyFormStyles from './VerifyFormStyles';

const VerificationForm = ({ account }) => {
    return (
        <View style={VerifyFormStyles.container}>
            <Image 
                source={require("../../../../assets/authen.png")}
                style={VerifyFormStyles.image}
            />
            
            {/* Notification */}
            <Text style={VerifyFormStyles.notificationText}>
                A verification code has been sent to {account}
            </Text>
            <Text style={VerifyFormStyles.instructionText}>
                Please check your email or SMS for the code.
            </Text>
            
            {/* Enter OTP */}
            <Text style={VerifyFormStyles.label}>Enter your verification code (OTP):</Text>
            <View style={VerifyFormStyles.otpContainer}>
            {[...Array(6)].map((_, index) => (
                    <TextInput
                        key={index}
                        style={VerifyFormStyles.otpInput}
                        keyboardType="numeric"
                        maxLength={1}
                    />
                ))}
            </View>
            <Text style={VerifyFormStyles.timerText}>Time remaining: 60s</Text>
            <TouchableOpacity style={VerifyFormStyles.submitButton} onPress={() => {}}>
                <Text style={VerifyFormStyles.submitButtonText}>Submit</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => {}}>
                <Text style={VerifyFormStyles.resendText}>Resend OTP</Text>
            </TouchableOpacity>
        </View>
    );
};

export default VerificationForm;