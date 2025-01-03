import React, { useState, useEffect } from "react";
import { StyleSheet } from 'react-native';
import { View, Text, TextInput, SafeAreaView, TouchableOpacity, Pressable, Image, KeyboardAvoidingView, Platform, ScrollView} from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import colors from "../../../constants/colors";
import Svg, { Path } from "react-native-svg";
import Icon from "react-native-vector-icons/Ionicons";
import CheckBox from "@react-native-community/checkbox";
import LoginFormStyles from "./LoginFormStyles";
import Snackbar from "react-native-snackbar";
// import {IP, PORT} from '@env'
import {IP, PORT} from '../../../utils/axios';
import client from '../../../utils/axios'

const validateEmail = (email) => {
    const PATTERN = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return PATTERN.test(email);
};

const validatePhone = (phone) => /^0[0-9]{9}$/.test(phone);

const LoginForm = (props) => { 
    const [account, setAccount] = useState("");
    const [password, setPassword] = useState("");
    const [isPasswordShown, setIsPasswordShown] = useState(false);
    const [isChecked, setIsChecked] = useState(false);
    const [statusAccount, setStatusAccount] = useState("");
    const [statusPassword, setStatusPassword] = useState("");
    const [accountFocused, setAccountFocused] = useState(false);
    const [passwordFocused, setPasswordFocused] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Show saved account and password.
    useEffect(() => {
        const loadCredentials = async () => {
            try {
                const storedAccount = await AsyncStorage.getItem('account');
                const storedPassword = await AsyncStorage.getItem('password');
                const storedRememberMe = await AsyncStorage.getItem('rememberMe');

                if (storedAccount && storedPassword && storedRememberMe === 'true') {
                    setAccount(storedAccount);
                    setPassword(storedPassword);
                    setIsChecked(true);
                }
            } catch (error) {
                console.error("Error loading credentials:", error);
            }
        };

        loadCredentials();
    }, []);

    // Submit and verify account.
    const handleLogin = async () => {
        let valid = true;
        setStatusAccount("");
        setStatusPassword("");

        if (!account) {
            setStatusAccount("Account cannot be empty");
            valid = false;
        } else if (!validateEmail(account) && !validatePhone(account)) {
            setStatusAccount("Invalid email or phone number");
            valid = false;
        }

        if (!password) {
            setStatusPassword("Password cannot be empty");
            valid = false;
        }

        if (valid) {
            setIsSubmitting(true);
        }
    };

    useEffect(() => {
        const login = () => {
            if (!isSubmitting) return;

            client.post(`/auth/login`, { account, password })
                .then((response) => {
                    const data = response.data;
                    if (response.status === 200 && data.success) {
                        Snackbar.show({
                            text: data.message,
                            duration: Snackbar.LENGTH_SHORT,
                            backgroundColor: "green",
                        });

                        if (isChecked) {
                            AsyncStorage.setItem('account', account);
                            AsyncStorage.setItem('password', password);
                            AsyncStorage.setItem('rememberMe', 'true');
                        } else {
                            AsyncStorage.removeItem('account');
                            AsyncStorage.removeItem('password');
                            AsyncStorage.removeItem('rememberMe');
                        }

                        AsyncStorage.setItem('accessToken', data.accessToken);
                        AsyncStorage.setItem('refreshToken', data.refreshToken);
                        AsyncStorage.setItem('id', data.id.toString());
                        props.navigation.navigate("AnimTab1");
                    } else {
                        props.navigation.navigate("VerifyScreen", { account: account });
                    }
                })
                .catch((error) => {
                    console.log("Error during login:", error);
                    if (error.response) {
                        if(error.response.data.message == "Non-exist user.") {
                            setStatusAccount(error.response.data.message);
                        }
                        else {
                            setStatusPassword(error.response.data.message)
                        }
                    } else {
                        setStatusAccount("An error occurred. Please try again later.");
                    }
                })
                .finally(() => {
                    setIsSubmitting(false);
                });
        };

        login();
    }, [isSubmitting]);

    // Move to signup screen
    const handleSignup = () => {
        props.navigation.navigate("SignupScreen");
    };

    // Move to recovery screen.
    const handleForgotPassword = () => {
        if (!account) {
            setStatusAccount("Account cannot be empty");
            return;
        }
    
        console.log(IP, PORT);
    
        client.post(`/auth/forgot-password`, { account })
            .then((response) => {
                console.log(response)
                const data = response.data;

                Snackbar.show({
                    text: data.message || "Verification code sent.",
                    duration: Snackbar.LENGTH_SHORT,
                    backgroundColor: "green",
                });
                props.navigation.navigate("RecoveryScreen", { account: account });
            })
            .catch((error) => {
                console.log(error)
                if (error.response && error.response.status === 400) {
                    const data = error.response.data;
                    setStatusAccount(data.message || "Invalid account. Please check your details.");
                } else {
                    console.error("Error during forgot password:", error);
                    setStatusAccount("An error occurred. Please try again later.");
                }
            });
    };

    return (
        <KeyboardAvoidingView 
            style={styles.container} 
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 0}
        >
            <ScrollView 
                contentContainerStyle={styles.innerContainer} 
                keyboardShouldPersistTaps='handled'
                showsVerticalScrollIndicator={false}
            >
        <SafeAreaView style={LoginFormStyles.container}>
            <View style={LoginFormStyles.introContainer}>
                <Svg height="200" width="400" viewBox="0 0 400 200" style={LoginFormStyles.svg}>
                    <Path fill={colors.primary} d="M1 1V150C155 180 242 180 399 150V1H1Z" />
                </Svg>
                <View style={LoginFormStyles.centerContent}>
                    <Image style={LoginFormStyles.logo} source={require("../../../../assets/app.png")} />
                    <Text style={[LoginFormStyles.text]}>AnChi</Text>
                </View>
            </View>

            <Text style={LoginFormStyles.loginText}>Welcome</Text>

            <View style={LoginFormStyles.formContainer}>
                <View style={LoginFormStyles.accountContainer}>
                    <View style={LoginFormStyles.inputContainer}>
                        <Icon name="person-outline" size={24} style={LoginFormStyles.accountIcon} />
                        <TextInput
                            style={[LoginFormStyles.textInput, { borderColor: accountFocused ? 'purple' : 'gray' }]}
                            placeholderTextColor="#ccc"
                            placeholder="Phone number or email"
                            value={account}
                            onChangeText={(text) => {
                                setAccount(text);
                                setStatusAccount("");
                            }}
                            onFocus={() => setAccountFocused(true)}
                            onBlur={() => setAccountFocused(false)}
                        />
                    </View>
                    <Text style={{ color: 'red', minHeight: 20, marginLeft: 10 }}>{statusAccount || " "}</Text>
                </View>
                <View style={LoginFormStyles.passwordContainer}>
                    <View style={LoginFormStyles.inputContainer}>
                        <Icon name="lock-closed-outline" size={24} style={LoginFormStyles.lockIcon} />
                        <TextInput
                            style={[LoginFormStyles.passwordInput, { borderColor: passwordFocused ? 'purple' : 'gray' }]}
                            placeholderTextColor="#ccc"
                            placeholder="Password"
                            secureTextEntry={!isPasswordShown}
                            value={password}
                            onChangeText={(text) => {
                                setPassword(text)
                                setStatusPassword("");
                            }}
                            onFocus={() => setPasswordFocused(true)}
                            onBlur={() => setPasswordFocused(false)}
                        />
                        <TouchableOpacity onPress={() => setIsPasswordShown(!isPasswordShown)} style={LoginFormStyles.toggleIconContainer}>
                            <Icon name={isPasswordShown ? "eye-off" : "eye"} size={24} style={LoginFormStyles.toggleIcon} />
                        </TouchableOpacity>
                    </View>
                    <Text style={{ color: 'red', minHeight: 20, marginLeft: 10 }}>{statusPassword || " "}</Text>
                    <TouchableOpacity style={LoginFormStyles.forgotPasswordButton} onPress={handleForgotPassword}>
                        <Text style={LoginFormStyles.forgotPasswordText}>Forgot password?</Text>
                    </TouchableOpacity>
                </View>
                <View style={LoginFormStyles.rememberMeContainer}>
                    <CheckBox
                        style={LoginFormStyles.checkbox}
                        value={isChecked}
                        onValueChange={() => setIsChecked(!isChecked)}
                    />
                    <Text style={LoginFormStyles.rememberMeText}>Remember me</Text>
                </View>
                <View style={LoginFormStyles.buttonContainer}>
                    <TouchableOpacity style={LoginFormStyles.loginButton} onPress={handleLogin}>
                        <Text style={LoginFormStyles.buttonText}>Login</Text>
                    </TouchableOpacity>
                </View>
                <View style={LoginFormStyles.signupView}>
                    <Text>Don't have an account? </Text>
                    <Pressable onPress={handleSignup}>
                        <Text style={LoginFormStyles.signUpText}>Sign up</Text>
                    </Pressable>
                </View>
            </View>
        </SafeAreaView></ScrollView></KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    innerContainer: {
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default LoginForm;