import React, {useState, useEffect, useRef} from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import RecoveryFormStyles from './RecoveryFormStyles'; 
import Snackbar from "react-native-snackbar";
//import {IP, PORT} from '@env'
import {IP, PORT} from '../../../utils/axios';
import client from '../../../utils/axios'

const RecoveryForm = (props) => {
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
            console.log(IP, PORT);

            client.post('/verify/verify-account', {
                account: props.account,
                otp: otpValue,
            })
            .then((response) => {
                const data = response.data;
                console.log(data);

                Snackbar.show({
                    text: 'Account verified successfully!',
                    duration: Snackbar.LENGTH_SHORT,
                    backgroundColor: "green",
                });

                // Chuyển sang màn hình reset password
                props.navigation.navigate('ResetPasswordScreen', { account: props.account });
            })
            .catch((error) => {
                if (error.response) {
                    if (error.response.status === 400) {
                        setErrorMessage("Invalid OTP. Please check and try again.");
                    } else if (error.response.status === 404) {
                        setErrorMessage("Account not found. Please check your details.");
                    } else {
                        setErrorMessage(error.response.data.message || "An error occurred. Please try again later.");
                    }
                } else {
                    console.log("Error during account verification", error);
                    setErrorMessage("An unexpected error occurred.");
                }
            })
            .finally(() => {
                setIsSubmitted(false);
            });
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
        const resendOTP = async () => {
            if (isResending) {
                try {
                    const response = await client.post('/verify/resend-otp-recovery', {
                        account: props.account,
                    });
    
                    const data = response.data;
                    console.log(data);

                    Snackbar.show({
                        text: 'OTP sent successfully!',
                        duration: Snackbar.LENGTH_SHORT,
                        backgroundColor: "green",
                    });

                } catch (error) {
                    if (error.response) {
                        if (error.response.status === 400) {
                            setErrorMessage(error.response.data.message || 'Invalid account details. Please check and try again.');
                        } else if (error.response.status === 404) {
                            setErrorMessage(error.response.data.message  || 'Account not found. Please check your details.');
                        } else {
                            setErrorMessage(error.response.data.message || 'Failed to resend OTP.');
                        }
                    } else {
                        console.log("Error during sending OTP:", error);
                        setErrorMessage("An unexpected error occurred.");
                    }
                } finally {
                    setIsResending(false);
                }
            }
        };
    
        resendOTP();
    }, [isResending]);    

    return (
        <KeyboardAvoidingView 
            style={styles.container} 
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 0}
        >
            <ScrollView contentContainerStyle={styles.innerContainer} keyboardShouldPersistTaps='handled'>
                <View style={RecoveryFormStyles.container}>
                    <Image 
                        source={require("../../../../assets/authen.png")}
                        style={RecoveryFormStyles.image}
                    />
                    
                    <Text style={RecoveryFormStyles.notificationText}>
                        A password recovery code has been sent to {props.account}
                    </Text>

                    <Text style={RecoveryFormStyles.instructionText}>
                        Please check your email or SMS for the code.
                    </Text>
                    <Text style={RecoveryFormStyles.label}>Enter your recovery code (OTP):</Text>
                    <View style={RecoveryFormStyles.otpContainer}>
                        {[...Array(6)].map((_, index) => (
                            <TextInput
                                key={index}
                                style={RecoveryFormStyles.otpInput}
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
                    <Text style={RecoveryFormStyles.timerText}>Time remaining: {formatTime(timeRemaining)}</Text>
                    <TouchableOpacity style={RecoveryFormStyles.submitButton} onPress={submitOtp}>
                        <Text style={RecoveryFormStyles.submitButtonText}>Submit</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={resendOtp}>
                        <Text style={RecoveryFormStyles.resendText}>Resend OTP</Text>
                    </TouchableOpacity>
                </View>
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

export default RecoveryForm;
