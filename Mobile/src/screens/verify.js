import React from 'react';
import VerificationForm from '../components/forms/verify-form/VerifyForm';

const VerificationScreen = ({ navigation, route }) => {
    const { account } = route.params;

    return ( 
        <VerificationForm navigation={navigation} account={account} />
    );
};

export default VerificationScreen;