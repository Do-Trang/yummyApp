import React, { useState, useEffect } from "react";
import { View, Text, TextInput, SafeAreaView, TouchableOpacity, Image } from "react-native";
import colors from "../../../constants/colors";
import Svg, { Path } from "react-native-svg";
import Snackbar from "react-native-snackbar";
import ResetPasswordStyles from "./ResetPasswordFormStyles";
import Icon from "react-native-vector-icons/Ionicons";
//import {IP, PORT} from '@env'
import {IP, PORT} from '../../../utils/axios';
import client from '../../../utils/axios'

const isValidPassword = (password) => {
    const PATTERN = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&.]{8,}$/;
    return PATTERN.test(password);
};

const ResetPasswordForm = (props) => {
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [isPasswordShown, setIsPasswordShown] = useState(false);
    const [isConfirmPasswordShown, setIsConfirmPasswordShown] = useState(false);
    const [statusPassword, setStatusPassword] = useState("");
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleSubmit = async () => {
        if (newPassword.trim() === "") {
            setStatusPassword("Password cannot be empty!");
            return;
        }

        if (!isValidPassword(newPassword)) {
            setStatusPassword("Password at least 8 characters, including uppercase, lowercase, numbers, and special characters.");
            return;
        }

        if (confirmPassword.trim() === "") {
            setStatusPassword("Confirm password cannot be empty!");
            return;
        }

        if (newPassword !== confirmPassword) {
            setStatusPassword("Passwords do not match!");
            return;
        }

        setStatusPassword("");

        setIsSubmitted(true);
    };

    useEffect(() => {
        if (isSubmitted) {
            client.patch(`/auth/reset-password`, {
                account: props.account,
                newPassword: newPassword,
            })
            .then((response) => {
                const data = response.data;
    
                if (response.status === 200 && data.success) {
                    Snackbar.show({
                        text: data.message,
                        duration: Snackbar.LENGTH_SHORT,
                        backgroundColor: "green",
                    });
                    props.navigation.navigate("LoginScreen");
                } else {
                    setStatusPassword(data.message || "Failed to reset password.");
                }
            })
            .catch((error) => {
                if (error.response) {
                    if (error.response.status === 400) {
                        setStatusPassword("Invalid request. Please check your details.");
                    } else if (error.response.status === 404) {
                        setStatusPassword("User not found. Please check your account.");
                    } else {
                        setStatusPassword(error.response.data.message || "An error occurred. Please try again later.");
                    }
                } else {
                    console.error("Error during reset password:", error);
                    setStatusPassword("An unexpected error occurred.");
                }
            })
            .finally(() => {
                setIsSubmitted(false);
            });
        }
    }, [isSubmitted]);

    return (
        <SafeAreaView style={ResetPasswordStyles.container}>
            <View style={ResetPasswordStyles.header}>
                <Svg height="180" width="400" viewBox="0 0 400 180" style={ResetPasswordStyles.svg}>
                    <Path fill={colors.primary} d="M1 150V1H400V150C250 180 150 180 1 150Z" />
                </Svg>
                <View style={ResetPasswordStyles.centerContent}>
                    <Image style={ResetPasswordStyles.logo} source={require("../../../../assets/app.png")} />
                    <Text style={ResetPasswordStyles.text}>AnChi</Text>
                </View>
            </View>
            <View style={ResetPasswordStyles.formContainer}>
                <View style={ResetPasswordStyles.inputGroup}>
                    <Icon name="lock-closed-outline" size={24} style={ResetPasswordStyles.icon} />
                    <TextInput
                        style={ResetPasswordStyles.textInput}
                        placeholder="Enter your new password"
                        placeholderTextColor="#808080"
                        secureTextEntry={!isPasswordShown}
                        value={newPassword}
                        onChangeText={(text) => {
                            setNewPassword(text);
                            setStatusPassword("");
                        }}
                    />
                    <TouchableOpacity
                        onPress={() => setIsPasswordShown(!isPasswordShown)}
                        style={ResetPasswordStyles.toggleIconContainer}
                    >
                        <Icon name={isPasswordShown ? "eye-off" : "eye"} size={24} style={ResetPasswordStyles.toggleIcon} />
                    </TouchableOpacity>
                </View>
                <Text style={{ color: 'red', minHeight: 20, marginLeft: 5 }}>{statusPassword || " "}</Text>

                <View style={ResetPasswordStyles.inputGroup}>
                    <Icon name="lock-closed-outline" size={24} style={ResetPasswordStyles.icon} />
                    <TextInput
                        style={ResetPasswordStyles.textInput}
                        placeholder="Confirm your password"
                        placeholderTextColor="#808080"
                        secureTextEntry={!isConfirmPasswordShown}
                        value={confirmPassword}
                        onChangeText={(text) => setConfirmPassword(text)}
                    />
                    <TouchableOpacity
                        onPress={() => setIsConfirmPasswordShown(!isConfirmPasswordShown)}
                        style={ResetPasswordStyles.toggleIconContainer}
                    >
                        <Icon name={isConfirmPasswordShown ? "eye-off" : "eye"} size={24} style={ResetPasswordStyles.toggleIcon} />
                    </TouchableOpacity>
                </View>

                <View style={ResetPasswordStyles.buttonContainer}>
                    <TouchableOpacity onPress={handleSubmit} style={ResetPasswordStyles.submitButton}>
                        <Text style={ResetPasswordStyles.buttonText}>Reset Password</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    );
};

export default ResetPasswordForm;