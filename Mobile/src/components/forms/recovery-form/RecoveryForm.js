import React, {useState, useEffect, useRef} from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import RecoveryFormStyles from './RecoveryFormStyles'; 
import Snackbar from "react-native-snackbar";
import {IP, PORT} from '@env'

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
        const verifyAccount = async () => {
            if (isSubmitted) {
                const otpValue = otp.join('');
                try {
                    const response = await fetch(`http://${IP}:${PORT}/verify/verify-account`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({ account: props.account, otp: otpValue }),
                    });
    
                    const data = await response.json();
                    console.log(data);
    
                    if (data.success) {
                        console.log("Account verified successfully:", data);
                        Snackbar.show({
                            text: 'Account verified successfully!',
                            duration: Snackbar.LENGTH_SHORT,
                            backgroundColor: "green",
                        });

                        // Move to reset password screen
                        props.navigation.navigate('ResetPasswordScreen', { account: props.account });
                    } else {
                        setErrorMessage("False OTP");
                    }
                } catch (error) {
                    console.log("Error during account verification", error);
                    setErrorMessage("An error occurred. Please try again later.");
                } finally {
                    setIsSubmitted(false);
                }
            }
        };
    
        verifyAccount();
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
                    const response = await fetch(`http://${IP}:${PORT}/verify/resend-otp-recovery`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            account: props.account,
                        }),
                    });
    
                    const data = await response.json();
                    console.log(data)
    
                    if (response.ok) {
                        console.log("OTP sent successfully:", data);
                        Snackbar.show({
                            text: 'OTP sent successfully!',
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
