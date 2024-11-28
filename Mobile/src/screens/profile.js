import React, { useState, useEffect } from 'react';
import { View, Text, ActivityIndicator, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import PersonalCard from '../components/cards/personal-cards/PersonalCard';
import client from '../utils/axios';
import Icon from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';

const styles = StyleSheet.create({
    button: {
        padding: 5,
        backgroundColor: 'transparent',
        elevation: 3,
    },
    dropdown: {
        position: 'absolute',
        top: 60,
        left: 15,
        width: 200,
        backgroundColor: 'white',
        elevation: 5,
        borderRadius: 5,
        padding: 10,
    },
    item: {
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
    },
    itemText: {
        fontSize: 18,
    },
});

const settingsList = [
    { id: '1', title: 'Change Password', screen: 'ChangePassword' },
    { id: '2', title: 'Logout', screen: 'Logout' },
];

function ProfileScreen({ navigation }) {
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isListVisible, setIsListVisible] = useState(false);

    useEffect(() => {
        client.get('/profile')
        .then((response) => {
            setUserData(response.data.user);
        })
        .catch((error) => {
            console.error('Error fetching profile data:', error);
        })
        .finally(() => {
            setLoading(false);
        });
    }, []);

    const toggleListVisibility = () => {
        setIsListVisible(!isListVisible);
    };

    const handleItemPress = (screen) => {
        if (screen === 'Logout') {
            client
                .post('/auth/logout')
                .then(() => {
                    AsyncStorage.removeItem('accessToken');
                    AsyncStorage.removeItem('refreshToken');
                    navigation.navigate("LoginScreen");   
                })
                .catch((error) => {
                    console.error('Error during logout:', error);
                });
        } else {
            navigation.navigate("ChangePasswordScreen");
        }
    };

    if (loading) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size="large" color="green" />
            </View>
        );
    }

    const handleSave = (updatedData) => {
        client.post('/profile/edit-profile', updatedData)
            .then(response => {
                console.log('Profile updated:', response.data.message);
                setUserData(prevData => ({
                    ...prevData,
                    ...updatedData,
                }));
            })
            .catch(error => {
                console.error('Error updating profile:', error);
                alert('Failed to update profile. Please try again.');
            });
    };

    return (
        <View style={{ flex: 1 }}>
            <View style={{position: 'absolute', top: 20, left: 20, right: 20, flexDirection: 'row', justifyContent: 'space-between', zIndex: 10}}> 
                <TouchableOpacity onPress={toggleListVisibility} style={styles.button}>
                    <Icon name="settings" size={30} color="white" />
                </TouchableOpacity>

        {/* Nút Chat */}
        <TouchableOpacity
          onPress={() => navigation.navigate('ChatScreen')}>
          <Icon name="chatbubble-ellipses" size={30} color="white" />
        </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={
                    () => navigation.navigate('EditProfileScreen', 
                        { 
                            avatar_url: userData.avatar_url, 
                            username : userData.username, 
                            address : userData.address, 
                            gender : userData.gender, 
                            dob : userData.dob, 
                            description : userData.description, 
                            onSave: handleSave 
                        })
                }>
                    <Icon name="pencil" size={30} color="white" />
                </TouchableOpacity>
            </View>

            <PersonalCard 
                user_id={userData.user_id}
                username={userData.username}
                account={userData.email || userData.phone_number}
                
                dob={userData.dob}
                avatar_url={userData.avatar_url}
                gender={userData.gender}
                address={userData.address}
                description={userData.description}
                followersCount={userData.followersCount}
                followingCount={userData.followingCount}
                swipedFoodsCount={userData.swipedFoodsCount}
                swipedRestaurantsCount={userData.swipedRestaurantsCount}
                navigation={navigation} 
            />

            {isListVisible && (
                <View style={styles.dropdown}>
                    <FlatList data={settingsList}
                        renderItem={({ item }) => (
                            <TouchableOpacity 
                                style={styles.item} 
                                onPress={() => handleItemPress(item.screen)}
                            >
                                <Text style={styles.itemText}>{item.title}</Text>
                            </TouchableOpacity>
                        )}
                        keyExtractor={(item) => item.id}
                    />
                </View>
            )}
        </View>
    );
}

export default ProfileScreen;