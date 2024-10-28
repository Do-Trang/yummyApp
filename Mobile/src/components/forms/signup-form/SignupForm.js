import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    Button,
    SafeAreaView,
    TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import SegmentedControl from '@react-native-community/segmented-control';

const SignupForm = () => {
    const [username, setUsername] = useState("");
    const [account, setAccount] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [isPasswordShown, setIsPasswordShown] = useState(false);
    const [isConfirmPasswordShown, setIsConfirmPasswordShown] = useState(false);
    const [statusUsername, setStatusUsername] = useState("");
    const [statusAccount, setStatusAccount] = useState("");
    const [statusPassword, setStatusPassword] = useState("");
    const [statusConfirmPassword, setStatusConfirmPassword] = useState("");
    const [selectedIndex, setSelectedIndex] = useState(0);

    const getAccountIcon = () => {
        return selectedIndex === 0 ? "mail-outline" : "call-outline";
    };

    return (
        <SafeAreaView>
            <View>
                <View>
                    <Text>Welcome to AnChi 👋</Text>
                </View>
                <SegmentedControl
                    values={['Đăng ký bằng Email', 'Đăng ký bằng Phone']}
                    selectedIndex={selectedIndex}
                    onChange={(event) => setSelectedIndex(event.nativeEvent.selectedSegmentIndex)}
                />
                <Text>Sign Up</Text>
                <View>
                    <Text>Username</Text>
                    <View>
                        <Icon name="person-outline" size={24} />
                        <TextInput 
                            placeholder="Enter your username" 
                            value={username} 
                            onChangeText={setUsername} 
                        />
                        <Text>{statusUsername}</Text>
                    </View>
                </View>
                <View>
                    <Text>Account</Text>
                    <View>
                        <Icon name={getAccountIcon()} size={24} />
                        <TextInput 
                            placeholder={selectedIndex === 0 ? "Enter your email" : "Enter your phone number"} 
                            value={account} 
                            onChangeText={setAccount} 
                        />
                        <Text>{statusAccount}</Text>
                    </View>
                </View>
                <View>
                    <Text>Password</Text>
                    <View>
                        <Icon name="lock-closed-outline" size={24} />
                        <TextInput 
                            placeholder="Enter your password" 
                            secureTextEntry={!isPasswordShown} 
                            value={password} 
                            onChangeText={setPassword} 
                        />
                        <TouchableOpacity onPress={() => setIsPasswordShown(!isPasswordShown)}>
                            <Icon name={isPasswordShown ? "eye-off" : "eye"} size={24} />
                        </TouchableOpacity>
                        <Text>{statusPassword}</Text>
                    </View>
                </View>
                <View>
                    <Text>Confirm Password</Text>
                    <View>
                        <Icon name="lock-closed-outline" size={24} />
                        <TextInput 
                            placeholder="Confirm your password" 
                            secureTextEntry={!isConfirmPasswordShown} 
                            value={confirmPassword} 
                            onChangeText={setConfirmPassword} 
                        />
                        <TouchableOpacity onPress={() => setIsConfirmPasswordShown(!isConfirmPasswordShown)}>
                            <Icon name={isConfirmPasswordShown ? "eye-off" : "eye"} size={24} />
                        </TouchableOpacity>
                        <Text>{statusConfirmPassword}</Text>
                    </View>
                </View>
                <Button title="Submit" />
                <View>
                    <Text>Already have an account?</Text>
                    <TouchableOpacity>
                        <Text>Login</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    );
};

export default SignupForm;