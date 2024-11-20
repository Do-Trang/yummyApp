import React, { useState, useEffect } from 'react';
import EditProfileForm from '../components/forms/profile-form/EditProfileForm';

const EditProfileScreen = (props) => {
    console.log(props)
    return (
        <EditProfileForm
            avatar_url={props.route.params.avatar_url}
            username={props.route.params.username}
            address={props.route.params.address}
            gender={props.route.params.gender}
            dob={props.route.params.dob}
            description={props.route.params.description}
            onSave={props.onSave}
            navigation={props.navigation}
        />
    );
};

export default EditProfileScreen;
