import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  SafeAreaView,
  TouchableOpacity,
  Pressable,
  Image,
} from "react-native";
import colors from "../../../constants/colors";
import Svg, { Path } from "react-native-svg";
import Icon from "react-native-vector-icons/Ionicons";
import SegmentedControl from "@react-native-community/segmented-control";
import SignupFormStyles from "./SignupFormStyles";

const SignupForm = () => {
  const [username, setUsername] = useState("");
  const [account, setAccount] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isPasswordShown, setIsPasswordShown] = useState(false);
  const [isConfirmPasswordShown, setIsConfirmPasswordShown] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const getAccountIcon = () =>
    selectedIndex === 0 ? "mail-outline" : "call-outline";

  return (
    <SafeAreaView style={SignupFormStyles.container}>
      <View style={SignupFormStyles.header}>
        <Svg
          height="245"
          width="400"
          viewBox="0 0 400 245"
          style={SignupFormStyles.svg}
        >
          <Path
            fill={colors.primary}
            d="M1 202.5V1H398.5V202.5C240.541 258.664 153.577 257.492 1 202.5Z"
          />
        </Svg>
        <View style={SignupFormStyles.centerContent}>
          <Image
            style={SignupFormStyles.logo}
            source={require("../../../../assets/logo1.png")}
          />
          <Text style={SignupFormStyles.text}>AnChi</Text>
        </View>
      </View>

      <View style={SignupFormStyles.formContainer}>
        <SegmentedControl
          values={["Đăng ký bằng Email", "Đăng ký bằng Phone"]}
          selectedIndex={selectedIndex}
          onChange={(event) =>
            setSelectedIndex(event.nativeEvent.selectedSegmentIndex)
          }
        />

        <View style={SignupFormStyles.inputGroup}>
          <Icon name="person-outline" size={24} style={SignupFormStyles.icon} />
          <TextInput
            style={SignupFormStyles.textInput}
            placeholder="Enter your username"
            value={username}
            onChangeText={setUsername}
          />
        </View>

        <View style={SignupFormStyles.inputGroup}>
          <Icon
            name={getAccountIcon()}
            size={24}
            style={SignupFormStyles.icon}
          />
          <TextInput
            style={SignupFormStyles.textInput}
            placeholder={
              selectedIndex === 0
                ? "Enter your email"
                : "Enter your phone number"
            }
            value={account}
            onChangeText={setAccount}
          />
        </View>

        <View style={SignupFormStyles.inputGroup}>
          <Icon
            name="lock-closed-outline"
            size={24}
            style={SignupFormStyles.icon}
          />
          <TextInput
            style={SignupFormStyles.textInput}
            placeholder="Enter your password"
            secureTextEntry={!isPasswordShown}
            value={password}
            onChangeText={setPassword}
          />
          <TouchableOpacity
            onPress={() => setIsPasswordShown(!isPasswordShown)}
            style={SignupFormStyles.toggleIconContainer}
          >
            <Icon
              name={isPasswordShown ? "eye-off" : "eye"}
              size={24}
              style={SignupFormStyles.toggleIcon}
            />
          </TouchableOpacity>
        </View>

        <View style={SignupFormStyles.inputGroup}>
          <Icon
            name="lock-closed-outline"
            size={24}
            style={SignupFormStyles.icon}
          />
          <TextInput
            style={SignupFormStyles.textInput}
            placeholder="Confirm your password"
            secureTextEntry={!isConfirmPasswordShown}
            value={confirmPassword}
            onChangeText={setConfirmPassword}
          />
          <TouchableOpacity
            onPress={() => setIsConfirmPasswordShown(!isConfirmPasswordShown)}
            style={SignupFormStyles.toggleIconContainer}
          >
            <Icon
              name={isConfirmPasswordShown ? "eye-off" : "eye"}
              size={24}
              style={SignupFormStyles.toggleIcon}
            />
          </TouchableOpacity>
        </View>

        <View style={SignupFormStyles.buttonContainer}>
          <TouchableOpacity style={SignupFormStyles.submitButton}>
            <Text style={SignupFormStyles.buttonText}>Submit</Text>
          </TouchableOpacity>
        </View>

        <View style={SignupFormStyles.loginRedirect}>
          <Text>Already have an account? </Text>
          <Pressable>
            <Text style={SignupFormStyles.loginText}>Login</Text>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default SignupForm;
