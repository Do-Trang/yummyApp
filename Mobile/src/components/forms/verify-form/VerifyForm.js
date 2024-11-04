import React, {useState, useEffect, useRef} from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import VerifyFormStyles from './VerifyFormStyles';
import Snackbar from "react-native-snackbar";
import AsyncStorage from '@react-native-async-storage/async-storage';
import {IP, PORT} from '@env'

const VerificationForm = (props) => {
    const [timeRemaining, setTimeRemaining] = useState(300);
    const [otp, setOtp] = useState(Array(6).fill(''));
    const [errorMessage, setErrorMessage] = useState('');
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isResending, setIsResending] = useState(false);

    const otpRefs = useRef([]);
    
    // Submit and verify OTP.
    const submitOtp = () => {
        const otpValue = otp.join('');
        if (otpValue.length < 6) {
            setErrorMessage('Please enter a complete OTP.');
            return;
        }
        setIsSubmitted(true);
    };
    useEffect(() => {
        if (isSubmitted) {
            const otpValue = otp.join('');
            const verifyOtp = async () => {
                try {
                    const response = await fetch(`http://${IP}:${PORT}/verify/verify-account`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({ account: props.account, otp: otpValue }),
                    });

                    const data = await response.json();
                    console.log(data)
                    if (data.success) {
                        Snackbar.show({
                            text: "Account verified successfully!",
                            duration: Snackbar.LENGTH_SHORT,
                            backgroundColor: "green",
                        });

                        await AsyncStorage.setItem('accessToken', data.accessToken);
                        await AsyncStorage.setItem('refreshToken', data.refreshToken);
                        props.navigation.navigate('AnimTab1')
                    } else {
                        setErrorMessage("False OTP");
                    }
                } catch (error) {
                    console.log("Error during account verification:", error);
                    setErrorMessage("An error occurred. Please try again later.");
                } finally {
                    setIsSubmitted(false);
                }
            };

            verifyOtp();
        }
    }, [isSubmitted]);


    // Countdown time to submit OTP.
    useEffect(() => {
        const timer = setInterval(() => {
            setTimeRemaining(prevTime => {
                if (prevTime <= 0) {
                    clearInterval(timer);
                    return 0;
                }
                return prevTime - 1;
            });
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    // Focus next input when typing an OTP number.
    const focusNextInput = (index) => {
        if (otpRefs.current[index]) {
            otpRefs.current[index].focus();
        }
    };

    // Type OTP numbers.
    const handleOtpChange = (index, value) => {
        if (value.length <= 1) {
            const newOtp = [...otp];
            newOtp[index] = value;
            setOtp(newOtp);

            if (value && index < otp.length - 1) {
                setTimeout(() => {
                    focusNextInput(index + 1);
                }, 10);
            }
        }
        setErrorMessage("")
    };

    // Delete OTP numbers.
    const handleKeyPress = (index, event) => {
        if (event.nativeEvent.key === 'Backspace' && otp[index] === '') {
            if (index > 0) {
                focusNextInput(index - 1);
            }
        }
    };

    // Format countdown time. 
    const formatTime = (timeInSeconds) => {
        const minutes = Math.floor(timeInSeconds / 60);
        const seconds = timeInSeconds % 60;
        return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    };

    // Resend OTP.
    const resendOtp = () => {
        setOtp(Array(6).fill(''));
        setErrorMessage('');
        setIsResending(true);
        setTimeRemaining(300);
        console.log("OTP has been resent.");
    };

    useEffect(() => {
        if (isResending) {
            const resendOtp = async () => {
                try {
                    const response = await fetch(`http://${IP}:${PORT}/verify/resend-otp-verification`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({ account: props.account }),
                    });

                    const data = await response.json();
                    if (response.ok) {
                        console.log("OTP sent successfully:", data);
                        Snackbar.show({
                            text: "OTP sent successfully!",
                            duration: Snackbar.LENGTH_SHORT,
                            backgroundColor: "green",
                        });
                    } else {
                        setErrorMessage(data.message || 'Failed to resend OTP.');
                    }
                } catch (error) {
                    console.log("Error during sending OTP:", error);
                    setErrorMessage("An error occurred when sending OTP");
                } finally {
                    setIsResending(false);
                }
            };

            resendOtp();
        }
    }, [isResending]);

    return (
        <KeyboardAvoidingView 
            style={styles.container} 
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 0}
        >
            <ScrollView contentContainerStyle={styles.innerContainer} keyboardShouldPersistTaps='handled'>
                <Image 
                    source={require("../../../../assets/authen.png")}
                    style={VerifyFormStyles.image}
                />
                
                <Text style={VerifyFormStyles.notificationText}>
                    A verification code has been sent to {props.account}
                </Text>
                <Text style={VerifyFormStyles.instructionText}>
                    Please check your email or SMS for the code.
                </Text>
                
                <Text style={VerifyFormStyles.label}>Enter your verification code (OTP):</Text>
                <View style={VerifyFormStyles.otpContainer}>
                    {[...Array(6)].map((_, index) => (
                        <TextInput
                            key={index}
                            style={VerifyFormStyles.otpInput}
                            keyboardType="numeric"
                            maxLength={1}
                            id={`otp-input-${index}`} 
                            onChangeText={(value) => handleOtpChange(index, value)}
                            onKeyPress={(event) => handleKeyPress(index, event)}
                            ref={ref => otpRefs.current[index] = ref}
                        />
                    ))}
                </View>
                <Text style={styles.errorText}>{errorMessage || ' '}</Text>
                <Text style={VerifyFormStyles.timerText}>Time remaining: {formatTime(timeRemaining)}</Text>
                <TouchableOpacity style={VerifyFormStyles.submitButton} onPress={submitOtp}>
                    <Text style={VerifyFormStyles.submitButtonText}>Submit</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={resendOtp}>
                    <Text style={VerifyFormStyles.resendText}>Resend OTP</Text>
                </TouchableOpacity>
            </ScrollView>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    innerContainer: {
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 30,
    },
    errorText: {
        color: 'red',
        marginBottom: 0,
    },
});

export default VerificationForm;