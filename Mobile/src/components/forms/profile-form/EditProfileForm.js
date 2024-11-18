import React, { useState } from 'react';
import { View, Text, TextInput, SafeAreaView, ScrollView, TouchableOpacity, Image } from 'react-native';
import editProfileFormStyles from './EditProfileFormStyles';
import Icon from "react-native-vector-icons/Ionicons";
import { RadioButton } from 'react-native-paper';
import DateTimePicker from '@react-native-community/datetimepicker';
import { launchImageLibrary } from 'react-native-image-picker';
import storage from '@react-native-firebase/storage';
import Snackbar from "react-native-snackbar";

const EditProfileForm = () => {
    const [date, setDate] = useState(new Date());
    const [showCalendar, setShowCalendar] = useState(false);
    const [description, setDescription] = useState("");
    const [username, setUsername] = useState("");
    const [address, setAddress] = useState("");
    const [gender, setGender] = useState("");
    const [avatar, setAvatar] = useState(null);
    const maxWords = 500;

    const changeProfilePicture = () => {
        const options = {
            mediaType: 'photo',
            includeBase64: false,
        };

        launchImageLibrary(options, async (response) => {
            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            } else {
                const uri = response.assets[0].uri;
                setAvatar(uri);
                await uploadImage(uri);
            }
        });
    };

    const uploadImage = async (uri) => {
        const fileName = uri.substring(uri.lastIndexOf('/') + 1);
        const reference = storage().ref(`foods/${fileName}`);
        

        try {
            await reference.putFile(uri);
            const url = await reference.getDownloadURL();
            console.log('Uploaded image URL:', url);
            
        } catch (error) {
            console.error('Upload failed: ', error);
            
        }
    };

    const onChangeDate = (event, selectedDate) => {
        setDate(selectedDate);
        setShowCalendar(false);
    };

    const handleDescriptionChange = (text) => {
        const wordCount = text.trim().split(/\s+/).length;
        if (wordCount <= maxWords) {
            setDescription(text);
        }
    };

    const handleUsernameChange = (text) => {
        setUsername(text);
    };

    const handleAddressChange = (text) => {
        setAddress(text);
    };

    const formatDateToString = (date) => {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };

    return (
        <SafeAreaView style={editProfileFormStyles.container}>
            <ScrollView style={editProfileFormStyles.scrollContainer}>
                <View style={editProfileFormStyles.avatarContainer}>
                    {
                        avatar ? (
                        <Image 
                            source={{ uri: avatar }}
                            style={editProfileFormStyles.avatar}
                        />
                        ) : (
                        <Image 
                            source={require('../../../../assets/profile/avatar.jpg')}
                            style={editProfileFormStyles.avatar}
                        />
                        )
                    }
                    <TouchableOpacity onPress={changeProfilePicture}>
                        <View style={editProfileFormStyles.editAvatarContainer}>
                            <Icon name="create-outline" size={24} style={editProfileFormStyles.uploadButton} color="#007BFF"/>
                            <Text style={editProfileFormStyles.uploadButtonText}>Change profile picture</Text>
                        </View>
                    </TouchableOpacity>
                </View>

                <View style={{ flexDirection: "column" }}>
                    <Text style={editProfileFormStyles.label}>Account</Text>
                    <View style={editProfileFormStyles.inputContainer}>
                        <TextInput 
                            style={editProfileFormStyles.input}
                            editable={false}
                            value="My account"
                        />
                        <Icon name="person-outline" size={20} style={editProfileFormStyles.icon} />
                    </View>
                </View>

                <View style={{ flexDirection: "column" }}>
                    <Text style={editProfileFormStyles.label}>Username</Text>
                    <View style={editProfileFormStyles.inputContainer}>
                        <TextInput 
                            style={editProfileFormStyles.input}
                            placeholder="Enter your nickname"
                            value={username}
                            onChangeText={handleUsernameChange}
                        />
                        <Icon name="person-outline" size={20} style={editProfileFormStyles.icon} />
                    </View>
                </View>

                <View>
                    <Text style={editProfileFormStyles.label}>Gender</Text>
                    <RadioButton.Group onValueChange={setGender} value={gender}>
                        <View style={editProfileFormStyles.radioGroupContainer}>
                            <View style={editProfileFormStyles.radioOption}> 
                                <RadioButton value="Male" color="blue" uncheckedColor='gray'/>
                                <Text>Male</Text>
                                <Icon name="male" size={24} color="blue" style={editProfileFormStyles.genderIcon} />
                            </View>
                            <View style={editProfileFormStyles.radioOption}>
                                <RadioButton value="Female" color="pink" uncheckedColor='gray' />
                                <Text>Female</Text>
                                <Icon name="female" size={24} color="pink" style={editProfileFormStyles.genderIcon} />
                            </View>
                        </View>
                    </RadioButton.Group>
                </View>

                <View style={{ flexDirection: "column" }}>
                    <Text style={editProfileFormStyles.label}>Dob</Text>
                    <TouchableOpacity onPress={() => setShowCalendar(true)} style={editProfileFormStyles.datePickerContainer}>
                        <Icon name="gift-outline" size={20} style={editProfileFormStyles.icon} />
                        <Text style={[editProfileFormStyles.date, { color: date ? 'black' : 'gray' }]}>
                            {formatDateToString(date)}
                        </Text>
                        <Icon name="calendar-outline" size={24} color="gray" style={editProfileFormStyles.calendar} />
                    </TouchableOpacity>
                    {showCalendar && (
                        <DateTimePicker
                            display="spinner"
                            testID="dateTimePicker"
                            value={date}
                            mode="date"
                            is24Hour={true}
                            onChange={onChangeDate}
                        />
                    )}
                </View>

                <View style={{ flexDirection: "column" }}>
                    <Text style={editProfileFormStyles.label}>Address</Text>
                    <View style={editProfileFormStyles.inputContainer}>
                        <TextInput 
                            style={editProfileFormStyles.input}
                            placeholder="Enter your address..."
                            value={address}
                            onChangeText={handleAddressChange}
                        />
                        <Icon name="home-outline" size={20} style={editProfileFormStyles.icon} />
                    </View>
                </View>

                <View style={{ flexDirection: "column" }}>
                    <Text style={editProfileFormStyles.label}>Description</Text>
                    <TextInput 
                        style={editProfileFormStyles.textArea}
                        placeholder="Tell us about yourself..."
                        multiline={true}
                        value={description}
                        onChangeText={handleDescriptionChange}
                    />
                    <Text style={editProfileFormStyles.wordCount}>
                        {description.trim().length}/{maxWords} words
                    </Text>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

export default EditProfileForm;