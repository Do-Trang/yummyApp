import React from 'react';
import ResetPasswordForm from '../components/forms/reset-password-form/ResetPasswordForm';

const ResetPasswordScreen = ({ navigation, route }) => {
    const { account } = route.params;

    return ( 
        <ResetPasswordForm navigation={navigation} account={account} />
    );
};

export default ResetPasswordScreen;