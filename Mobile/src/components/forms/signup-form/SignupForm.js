import React, { useState, useEffect } from "react";
import { View, Text, TextInput, SafeAreaView, TouchableOpacity, Pressable, Image } from "react-native";
import Snackbar from "react-native-snackbar";
import colors from "../../../constants/colors";
import Svg, { Path } from "react-native-svg";
import Icon from "react-native-vector-icons/Ionicons";
import SegmentedControl from "@react-native-community/segmented-control";
import SignupFormStyles from "./SignupFormStyles";
import {IP, PORT} from '@env'

const validateEmail = (email) => {
    const PATTERN = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return PATTERN.test(email);
};

const validatePhone = (phone) => /^0[0-9]{9}$/.test(phone);

const isValidPassword = (password) => {
    const PATTERN = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&.]{8,}$/;
    return PATTERN.test(password);
};

const SignupForm = (props) => {
    const [username, setUsername] = useState("");
    const [account, setAccount] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [isPasswordShown, setIsPasswordShown] = useState(false);
    const [isConfirmPasswordShown, setIsConfirmPasswordShown] = useState(false);
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [statusUsername, setStatusUsername] = useState("");
    const [statusAccount, setStatusAccount] = useState("");
    const [statusPassword, setStatusPassword] = useState("");
    const [isSubmitted, setIsSubmitted] = useState(false);

    // Choose to signup with email or phone.
    const getAccountIcon = () => selectedIndex === 0 ? "mail-outline" : "call-outline";

    // Submit signup form.
    const handleSubmit = async () => {
        if (username.trim() === "") {
            setStatusUsername("Username cannot be empty!");
            return;
        } else {
            setStatusUsername("");
        }

        if (account.trim() === "") {
            setStatusAccount("Account cannot be empty!");
            return;
        } else {
            setStatusAccount("");
        }

        if (selectedIndex === 0) {
            if (!validateEmail(account)) {
                setStatusAccount("Invalid email format!");
                Snackbar.show({
                    text: "Invalid email format!",
                    duration: Snackbar.LENGTH_SHORT,
                    backgroundColor: "red",
                });
                return;
            }
        } else {
            if (!validatePhone(account)) {
                setStatusAccount("Invalid phone number format!");
                return;
            }
        }

        if (password.trim() === "") {
            setStatusPassword("Password cannot be empty!");
            return;
        } else {
            setStatusPassword("");
        }

        if (!isValidPassword(password)) {
            setStatusPassword("Password at least 8 characters, including uppercase, lowercase, numbers, and special characters.");
            return;
        } else {
            setStatusPassword("");
        }

        if (confirmPassword.trim() === "") {
            setStatusPassword("Confirm password cannot be empty!");
            return;
        }

        if (password !== confirmPassword) {
            setStatusPassword("Passwords do not match!");
            return;
        }

        setStatusPassword("");

        setIsSubmitted(true);
    };

    useEffect(() => {
        const signup = async () => {
            if (isSubmitted) {
                try {
                    const endpoint = selectedIndex === 0 ? 'signup/email' : 'signup/phone';
                    console.log(IP)
                    console.log(PORT)
                    const response = await fetch(`http://${IP}:${PORT}/auth/${endpoint}`, {
                        method: 'POST',
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                            username: username,
                            account: account,
                            password: password,
                        }),
                    });
    
                    const data = await response.json();
    
                    if (response.ok) {
                        Snackbar.show({
                            text: data.message,
                            duration: Snackbar.LENGTH_SHORT,
                            backgroundColor: "green",
                        });
                        props.navigation.navigate("VerifyScreen", { account: account });
                    } else {
                        setStatusAccount(data.message);
                    }
                } catch (error) {
                    console.log("Error during signup:", error);
                    setStatusAccount("An error occurred. Please try again later.");
                } finally {
                    setIsSubmitted(false);
                }
            }
        };
    
        signup();
    }, [isSubmitted, selectedIndex]);     
           
    // Move to login screen.
    const handleLoginRedirect = () => {
        props.navigation.navigate("LoginScreen");
    };


    return (
        <SafeAreaView style={SignupFormStyles.container}>
            <View style={SignupFormStyles.header}>
                <Svg height="180" width="400" viewBox="0 0 400 180" style={SignupFormStyles.svg}>
                    <Path fill={colors.primary} d="M1 150V1H400V150C250 180 150 180 1 150Z" />
                </Svg>
                <View style={SignupFormStyles.centerContent}>
                    <Image style={SignupFormStyles.logo} source={require("../../../../assets/app.png")} />
                    <Text style={SignupFormStyles.text}>AnChi</Text>
                </View>
            </View>

            <View style={SignupFormStyles.formContainer}>
                <SegmentedControl
                    values={["Sign up with Email", "Sign up with Phone"]}
                    selectedIndex={selectedIndex}
                    onChange={(event) => setSelectedIndex(event.nativeEvent.selectedSegmentIndex)}
                />

                <View style={SignupFormStyles.inputGroup}>
                    <Icon name="person-outline" size={24} style={SignupFormStyles.icon} />
                    <TextInput
                        style={SignupFormStyles.textInput}
                        placeholder="Enter your username"
                        placeholderTextColor="#808080"
                        value={username}
                        onChangeText={(text) => {
                            setUsername(text);
                            setStatusUsername("");
                        }}
                    />
                </View>
                <Text style={{ color: 'red', minHeight: 20, marginLeft: 5 }}>{statusUsername || " "}</Text>

                <View style={SignupFormStyles.inputGroup}>
                    <Icon name={getAccountIcon()} size={24} style={SignupFormStyles.icon} />
                    <TextInput
                        style={SignupFormStyles.textInput}
                        placeholder={selectedIndex === 0 ? "Enter your email" : "Enter your phone number"}
                        placeholderTextColor="#808080"
                        value={account}
                        onChangeText={(text) => {
                            setAccount(text);
                            setStatusAccount("");
                        }}
                    />
                </View>
                <Text style={{ color: 'red', minHeight: 20, marginLeft: 5 }}>{statusAccount || " "}</Text>

                <View style={SignupFormStyles.inputGroup}>
                    <Icon name="lock-closed-outline" size={24} style={SignupFormStyles.icon} />
                    <TextInput
                        style={SignupFormStyles.textInput}
                        placeholder="Enter your password"
                        placeholderTextColor="#808080"
                        secureTextEntry={!isPasswordShown}
                        value={password}
                        onChangeText={(text) => {
                            setPassword(text);
                            setStatusPassword("");
                        }}
                    />
                    <TouchableOpacity
                        onPress={() => setIsPasswordShown(!isPasswordShown)}
                        style={SignupFormStyles.toggleIconContainer}
                    >
                        <Icon name={isPasswordShown ? "eye-off" : "eye"} size={24} style={SignupFormStyles.toggleIcon} />
                    </TouchableOpacity>
                </View>
                <Text style={{ color: 'red', minHeight: 20, marginLeft: 5 }}>{statusPassword || " "}</Text>

                <View style={SignupFormStyles.inputGroup}>
                    <Icon name="lock-closed-outline" size={24} style={SignupFormStyles.icon} />
                    <TextInput
                        style={SignupFormStyles.textInput}
                        placeholder="Confirm password"
                        placeholderTextColor="#808080"
                        secureTextEntry={!isConfirmPasswordShown}
                        value={confirmPassword}
                        onChangeText={(text) => setConfirmPassword(text)}
                    />
                    <TouchableOpacity
                        onPress={() => setIsConfirmPasswordShown(!isConfirmPasswordShown)}
                        style={SignupFormStyles.toggleIconContainer}
                    >
                        <Icon name={isConfirmPasswordShown ? "eye-off" : "eye"} size={24} style={SignupFormStyles.toggleIcon} />
                    </TouchableOpacity>
                </View>

                <View style={SignupFormStyles.buttonContainer}>
                    <TouchableOpacity onPress={handleSubmit} style={SignupFormStyles.submitButton}>
                        <Text style={SignupFormStyles.buttonText}>Submit</Text>
                    </TouchableOpacity>
                </View>

                <View style={SignupFormStyles.loginRedirect}>
                    <Text>Already have an account? </Text>
                    <Pressable onPress={handleLoginRedirect}>
                        <Text style={SignupFormStyles.loginText}>Login</Text>
                    </Pressable>
                </View>
            </View>
        </SafeAreaView>
    );
};

export default SignupForm;