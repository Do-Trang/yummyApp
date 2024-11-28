import React, { useState, useEffect } from 'react';
import EditProfileForm from '../components/forms/profile-form/EditProfileForm';

const EditProfileScreen = ({ route, navigation}) => {
    return (
        <EditProfileForm
            avatar_url={route.params.avatar_url}
            username={route.params.username}
            address={route.params.address}
            gender={route.params.gender}
            dob={route.params.dob}
            description={route.params.description}
            onSave={route.params.onSave}
            navigation={navigation}
        />
    );
};

export default EditProfileScreen;
