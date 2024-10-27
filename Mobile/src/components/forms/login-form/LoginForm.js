import React, { useState } from 'react';
import {
    View, 
    Text, 
    TextInput, 
    Button, 
    SafeAreaView, 
    TouchableOpacity,
    Pressable,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import CheckBox from '@react-native-community/checkbox';

const LoginForm = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isPasswordShown, setIsPasswordShown] = useState(true);
    const [isChecked, setIsChecked] = useState(false);
    const [statusEmail, setStatusEmail] = useState("");
    const [statusPassword, setStatusPassword] = useState("");

    return (
        <SafeAreaView>
            <View>
                <View>
                    <Text>Welcome to AnChi 👋</Text>
                </View>
                <Text>Login</Text>
                <View>
                    <Text>Account</Text>
                    <View>
                        <Icon name="person-outline" size={24} />
                        <TextInput 
                            placeholder="Enter your registered phone number or email ..."
                            value={email}
                            onChangeText={setEmail}
                        />
                        <Text>{statusEmail}</Text>
                    </View>
                </View>
                <View>
                    <Text>Password</Text>
                    <View>
                        <Icon name="lock-closed-outline" size={24} />
                        <TextInput 
                            placeholder="Enter your password ..." 
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
                    <CheckBox value={isChecked} onValueChange={setIsChecked}/>
                    <Text>Remember password</Text>
                </View>
                <Button title="Login" />
                <View>
                    <Text>Don't have an account?</Text>
                    <Pressable>
                        <Text>Sign up</Text>
                    </Pressable>
                </View>
                <TouchableOpacity>
                    <Text>Forgot Password?</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}

export default LoginForm;