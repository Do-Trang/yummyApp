import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  SafeAreaView,
  TouchableOpacity,
  Pressable,
  Image,
} from "react-native";
import colors from "../../../constants/colors";
import Svg, { Path } from "react-native-svg";

import GlobalStyle from "../../../styles/GlobalStyle";
import Icon from "react-native-vector-icons/Ionicons";
import CheckBox from "@react-native-community/checkbox";
import LoginFormStyles from "./LoginFormStyles";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isPasswordShown, setIsPasswordShown] = useState(true);
  const [isChecked, setIsChecked] = useState(false);
  const [statusEmail, setStatusEmail] = useState("");
  const [statusPassword, setStatusPassword] = useState("");

  return (
    <SafeAreaView style={LoginFormStyles.container}>
      {/* <View style={LoginFormStyles.halfCircle}>
        <Image
          style={LoginFormStyles.logo}
          source={require("../../../../assets/logo1.png")}
        />
        <Text style={[GlobalStyle.CustomFont, LoginFormStyles.text]}>
          AnChi
        </Text>
      </View> */}
      <View style={LoginFormStyles.container}>
        <Svg
          height="352"
          width="400"
          viewBox="0 0 400 352"
          style={LoginFormStyles.svg}
        >
          <Path
            fill={colors.primary}
            d="M1 1V316.5C155.063 362.577 242.513 362.883 399.5 316.5V1H1Z"
          />
        </Svg>
        <View style={LoginFormStyles.centerContent}>
          <Image
            style={LoginFormStyles.logo}
            source={require("../../../../assets/logo1.png")}
          />
          <Text style={[LoginFormStyles.text]}>AnChi</Text>
        </View>
      </View>

      <View style={LoginFormStyles.formContainer}>
        <View style={LoginFormStyles.accountContainer}>
          <Icon
            name="person-outline"
            size={24}
            style={LoginFormStyles.accountIcon}
          />
          <Text style={LoginFormStyles.accountLabel}> Account</Text>
        </View>
        <View style={LoginFormStyles.inputContainer}>
          <TextInput
            style={LoginFormStyles.textInput}
            placeholderTextColor="#ccc"
            placeholder="Enter your registered phone number or email ..."
            value={email}
            onChangeText={setEmail}
          />
          <Text>{statusEmail}</Text>
        </View>

        <View>
          <View style={LoginFormStyles.passwordContainer}>
            <Icon
              name="lock-closed-outline"
              size={24}
              style={LoginFormStyles.accountIcon}
            />
            <Text style={LoginFormStyles.passwordLabel}> Password</Text>
          </View>
          <View style={LoginFormStyles.inputContainer}>
            <TextInput
              style={LoginFormStyles.textInput}
              placeholderTextColor="#ccc"
              placeholder="Enter your password ..."
              secureTextEntry={!isPasswordShown}
              value={password}
              onChangeText={setPassword}
            />
            <TouchableOpacity
              onPress={() => setIsPasswordShown(!isPasswordShown)}
              style={LoginFormStyles.toggleIconContainer}
            >
              <Icon
                name={isPasswordShown ? "eye-off" : "eye"}
                size={24}
                style={LoginFormStyles.toggleIcon}
              />
            </TouchableOpacity>
          </View>
          <Text>{statusPassword}</Text>
          <TouchableOpacity style={LoginFormStyles.forgotPasswordButton}>
            <Text style={LoginFormStyles.forgotPasswordText}>
              Forgot Password?
            </Text>
          </TouchableOpacity>
        </View>

        {/* <View>
                    <CheckBox value={isChecked} onValueChange={setIsChecked}/>
                    <Text>Remember password</Text>
                </View> */}

        <View style={LoginFormStyles.buttonContainer}>
          <TouchableOpacity
            style={LoginFormStyles.loginButton}
            // onPress={handleLogin}
          >
            <Text style={LoginFormStyles.buttonText}>Login</Text>
          </TouchableOpacity>
        </View>
        <View style={LoginFormStyles.accountContainer1}>
          <Text>Don't have an account? </Text>
          <Pressable>
            <Text style={LoginFormStyles.signUpText}>Sign up</Text>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default LoginForm;
