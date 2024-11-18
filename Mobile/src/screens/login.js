import React from 'react';
import LoginForm from '../components/forms/login-form/LoginForm';

const LoginScreen = ({ navigation }) => {
    return ( 
        <LoginForm navigation={navigation} />
    );
};

export default LoginScreen;
