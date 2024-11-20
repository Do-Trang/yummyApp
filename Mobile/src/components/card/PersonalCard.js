import React from 'react';
import { View, Text, Image, ScrollView, ImageBackground } from 'react-native';
import PersonalCardStyles from './PersonalCardStyles';
import LinearGradient from 'react-native-linear-gradient';

const PersonalCard = (props) => {
    const formatDate = (date) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(date).toLocaleDateString('en-US', options);
    };

    return (
        <View>
            <View style={PersonalCardStyles.profileHeader}>
                <ImageBackground
                    source={{ uri: props.avatar }}
                    style={PersonalCardStyles.cover}
                    resizeMode="contain"
                >
                    <View style={PersonalCardStyles.overlay} />
                </ImageBackground>
            </View>
            <View style={PersonalCardStyles.avatarContainer}>
                <Image
                    source={{ uri: props.avatar }}
                    style={PersonalCardStyles.avatar}
                    resizeMode="cover"
                />
            </View>
            <ScrollView style={PersonalCardStyles.scrollContainer}>
                <View style={PersonalCardStyles.scrollContent}>
                    <Text style={PersonalCardStyles.username}>{props.username}</Text>
                    <Text style={PersonalCardStyles.account}>{props.account}</Text>
                </View>
            </ScrollView>
        </View>
    );
};

export default PersonalCard;
