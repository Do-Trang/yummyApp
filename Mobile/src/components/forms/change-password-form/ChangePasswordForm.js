import React, { useState, useEffect } from "react";
import { View, Text, TextInput, SafeAreaView, TouchableOpacity, Image } from "react-native";
import colors from "../../../constants/colors";
import Svg, { Path } from "react-native-svg";
import Snackbar from "react-native-snackbar";
import ChangePasswordStyles from "./ChangePasswordFormStyles";
import Icon from "react-native-vector-icons/Ionicons";
//import { IP, PORT } from '@env';
import client from '../../../utils/axios';

const isValidPassword = (password) => {
    const PATTERN = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&.]{8,}$/;
    return PATTERN.test(password);
};

const ChangePasswordForm = (props) => {
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [isOldPasswordShown, setIsOldPasswordShown] = useState(false);
    const [isNewPasswordShown, setIsNewPasswordShown] = useState(false);
    const [isConfirmPasswordShown, setIsConfirmPasswordShown] = useState(false);

    const [oldPasswordStatus, setOldPasswordStatus] = useState("");
    const [newPasswordStatus, setNewPasswordStatus] = useState("");
    const [confirmPasswordStatus, setConfirmPasswordStatus] = useState("");
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleSubmit = async () => {
        let valid = true;

        if (oldPassword.trim() === "") {
            setOldPasswordStatus("Old password cannot be empty!");
            valid = false;
        }

        if (newPassword.trim() === "") {
            setNewPasswordStatus("Password cannot be empty!");
            valid = false;
        } else if (!isValidPassword(newPassword)) {
            setNewPasswordStatus("Password must be at least 8 characters, including uppercase, lowercase, numbers, and special characters.");
            valid = false;
        }

        if (confirmPassword.trim() === "") {
            setConfirmPasswordStatus("Confirm password cannot be empty!");
            valid = false;
        } else if (newPassword !== confirmPassword) {
            setConfirmPasswordStatus("Passwords do not match!");
            valid = false;
        }

        if (!valid) {
            return;
        }

        setOldPasswordStatus("");
        setNewPasswordStatus("");
        setConfirmPasswordStatus("");

        setIsSubmitted(true);
    };

    useEffect(() => {
        if (isSubmitted) {
            console.log(IP, PORT)
            client.patch(`/auth/change-password`, {
                currentPassword: oldPassword,
                newPassword: newPassword,
            })
            .then((response) => {
                const data = response.data;

                Snackbar.show({
                    text: data.message,
                    duration: Snackbar.LENGTH_SHORT,
                    backgroundColor: "green",
                });
                props.navigation.goBack();
            })
            .catch((error) => {
                if (error.response) {
                    if (error.response.status === 401) {
                        setOldPasswordStatus("Old password is incorrect.");
                    } else if (error.response.status === 404) {
                        setOldPasswordStatus("User not found. Please check your account.");
                    } else {
                        setOldPasswordStatus(error.response.data.message || "An error occurred. Please try again later.");
                    }
                } else {
                    console.error("Error during password change:", error);
                    setOldPasswordStatus("An unexpected error occurred.");
                }
            })
            .finally(() => {
                setIsSubmitted(false);
            });
        }
    }, [isSubmitted]);

    return (
        <SafeAreaView style={ChangePasswordStyles.container}>
            <View style={ChangePasswordStyles.header}>
                <Svg height="180" width="400" viewBox="0 0 400 180" style={ChangePasswordStyles.svg}>
                    <Path fill={colors.primary} d="M1 150V1H400V150C250 180 150 180 1 150Z" />
                </Svg>
                <View style={ChangePasswordStyles.centerContent}>
                    <Image style={ChangePasswordStyles.logo} source={require("../../../../assets/app.png")} />
                    <Text style={ChangePasswordStyles.text}>AnChi</Text>
                </View>
            </View>
            <View style={ChangePasswordStyles.formContainer}>
                {/* Old Password */}
                <View style={ChangePasswordStyles.inputGroup}>
                    <Icon name="lock-closed-outline" size={24} style={ChangePasswordStyles.icon} />
                    <TextInput
                        style={ChangePasswordStyles.textInput}
                        placeholder="Enter your old password"
                        placeholderTextColor="#808080"
                        secureTextEntry={!isOldPasswordShown}
                        value={oldPassword}
                        onChangeText={(text) => {
                            setOldPassword(text);
                            setOldPasswordStatus("");
                        }}
                    />
                    <TouchableOpacity
                        onPress={() => setIsOldPasswordShown(!isOldPasswordShown)}
                        style={ChangePasswordStyles.toggleIconContainer}
                    >
                        <Icon name={isOldPasswordShown ? "eye-off" : "eye"} size={24} style={ChangePasswordStyles.toggleIcon} />
                    </TouchableOpacity>
                </View>
                <Text style={{ color: 'red', minHeight: 20, marginLeft: 5 }}>{oldPasswordStatus}</Text>

                {/* New Password */}
                <View style={ChangePasswordStyles.inputGroup}>
                    <Icon name="lock-closed-outline" size={24} style={ChangePasswordStyles.icon} />
                    <TextInput
                        style={ChangePasswordStyles.textInput}
                        placeholder="Enter your new password"
                        placeholderTextColor="#808080"
                        secureTextEntry={!isNewPasswordShown}
                        value={newPassword}
                        onChangeText={(text) => {
                            setNewPassword(text);
                            setNewPasswordStatus("");
                        }}
                    />
                    <TouchableOpacity
                        onPress={() => setIsNewPasswordShown(!isNewPasswordShown)}
                        style={ChangePasswordStyles.toggleIconContainer}
                    >
                        <Icon name={isNewPasswordShown ? "eye-off" : "eye"} size={24} style={ChangePasswordStyles.toggleIcon} />
                    </TouchableOpacity>
                </View>
                <Text style={{ color: 'red', minHeight: 20, marginLeft: 5 }}>{newPasswordStatus}</Text>

                {/* Confirm Password */}
                <View style={ChangePasswordStyles.inputGroup}>
                    <Icon name="lock-closed-outline" size={24} style={ChangePasswordStyles.icon} />
                    <TextInput
                        style={ChangePasswordStyles.textInput}
                        placeholder="Confirm your password"
                        placeholderTextColor="#808080"
                        secureTextEntry={!isConfirmPasswordShown}
                        value={confirmPassword}
                        onChangeText={(text) => {
                            setConfirmPassword(text)
                            setConfirmPasswordStatus("")
                        }}
                    />
                    <TouchableOpacity
                        onPress={() => setIsConfirmPasswordShown(!isConfirmPasswordShown)}
                        style={ChangePasswordStyles.toggleIconContainer}
                    >
                        <Icon name={isConfirmPasswordShown ? "eye-off" : "eye"} size={24} style={ChangePasswordStyles.toggleIcon} />
                    </TouchableOpacity>
                </View>
                <Text style={{ color: 'red', minHeight: 20, marginLeft: 5 }}>{confirmPasswordStatus}</Text>

                <View style={ChangePasswordStyles.buttonContainer}>
                    <TouchableOpacity onPress={handleSubmit} style={ChangePasswordStyles.submitButton}>
                        <Text style={ChangePasswordStyles.buttonText}>Change Password</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    );
};

export default ChangePasswordForm;