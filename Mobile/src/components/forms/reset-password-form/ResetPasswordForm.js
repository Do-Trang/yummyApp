import React, { useState, useEffect } from "react";
import { View, Text, TextInput, SafeAreaView, TouchableOpacity, Image } from "react-native";
import colors from "../../../constants/colors";
import Svg, { Path } from "react-native-svg";
import Snackbar from "react-native-snackbar";
import ResetPasswordStyles from "./ResetPasswordFormStyles";
import Icon from "react-native-vector-icons/Ionicons";

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
        const resetPassword = async () => {
            if (isSubmitted) {
                try {
                    const response = await fetch("http://192.168.1.4:3000/auth/reset-password", {
                        method: 'PATCH',
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                            account: props.account,
                            newPassword: newPassword,
                        }),
                    });

                    const data = await response.json();

                    if (response.ok) {
                        Snackbar.show({
                            text: data.message,
                            duration: Snackbar.LENGTH_SHORT,
                            backgroundColor: "green",
                        });
                        props.navigation.navigate("LoginScreen");
                    } else {
                        setStatusPassword(data.message);
                    }
                } catch (error) {
                    console.log("Error during reset password:", error);
                    setStatusPassword("An error occurred. Please try again later.");
                } finally {
                    setIsSubmitted(false);
                }
            }
        };

        resetPassword();
    }, [isSubmitted]);

    return (
        <SafeAreaView style={ResetPasswordStyles.container}>
            <View style={ResetPasswordStyles.header}>
                <Svg height="180" width="400" viewBox="0 0 400 180" style={ResetPasswordStyles.svg}>
                    <Path fill={colors.primary} d="M1 150V1H400V150C250 180 150 180 1 150Z" />
                </Svg>
                <View style={ResetPasswordStyles.centerContent}>
                    <Image style={ResetPasswordStyles.logo} source={require("../../../../assets/logo1.png")} />
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