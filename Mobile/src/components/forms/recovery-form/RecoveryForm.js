import React from 'react';
import { View, Text, TextInput, TouchableOpacity, Image } from 'react-native';
import RecoveryFormStyles from './RecoveryFormStyles'; 
import colors from "../../../constants/colors";
const RecoveryForm = ({ account }) => {
    return (
        <View style={RecoveryFormStyles.container}>
            <Image 
                source={require("../../../../assets/authen.png")}
                style={RecoveryFormStyles.image}
            />
            
            <Text style={RecoveryFormStyles.notificationText}>
                A password recovery code has been sent to {account}
            </Text>
            <Text style={RecoveryFormStyles.instructionText}>
                Please check your email or SMS for the code.
            </Text>
            <Text style={RecoveryFormStyles.label}>Enter your verification code (OTP):</Text>
            <View style={RecoveryFormStyles.otpContainer}>
                {[...Array(6)].map((_, index) => (
                    <TextInput
                        key={index}
                        style={RecoveryFormStyles.otpInput}
                        keyboardType="numeric"
                        maxLength={1}
                    />
                ))}
            </View>

            <Text style={RecoveryFormStyles.timerText}>Time remaining: 60s</Text>
            <TouchableOpacity style={RecoveryFormStyles.submitButton} onPress={() => {}}>
                <Text style={RecoveryFormStyles.submitButtonText}>Submit</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => {}}>
                <Text style={RecoveryFormStyles.resendText}>Resend OTP</Text>
            </TouchableOpacity>
        </View>
    );
};

export default RecoveryForm;
