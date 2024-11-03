import React from 'react';
import RecoveryForm from '../components/forms/recovery-form/RecoveryForm';

const RecoveryScreen = ({ navigation, route }) => {
    const { account } = route.params;
    return ( 
        <RecoveryForm navigation={navigation} account={account} />
    );
};

export default RecoveryScreen;