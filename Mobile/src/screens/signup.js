import React from 'react';
import SignupForm from '../components/forms/signup-form/SignupForm';

const SignupScreen = ({ navigation }) => {
    return ( 
        <SignupForm navigation={navigation} />
    );
};

export default SignupScreen;