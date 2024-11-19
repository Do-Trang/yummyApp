import React, { useState, useRef } from "react";
import { ScrollView, TouchableOpacity, Text, View } from "react-native";
import MenuStyles from './MenuStyles';
import Icon from 'react-native-vector-icons/Ionicons';

const Menu = (props) => {
    const { 
        followerCount, 
        followingCount, 
        favoriteFoodsCount, 
        favoriteRestaurantsCount,
        selectedButton, 
        onSelectButton 
    } = props;

    const scrollViewRef = useRef(null);
    console.log(props)

    const menuData = [
        { id: "follower", name: "follower", count: followerCount },
        { id: "following", name: "following", count: followingCount },
        { id: "favoriteFoods", name: "favorite foods", count: favoriteFoodsCount },
        { id: "favoriteRestaurants", name: "favorite restaurants", count: favoriteRestaurantsCount }
    ];

    const onSelectButtonHandler = (id, index) => {
        onSelectButton(id);
        const offsetX = (index * 140) - 70;
        scrollViewRef.current?.scrollTo({ x: offsetX, animated: true });
    };

    return (
        <View style={MenuStyles.container}>
            <View style={MenuStyles.header}>
                <TouchableOpacity style={MenuStyles.backButton} onPress={() => console.log("Back pressed")}>
                    <Icon name="arrow-back" size={35} color="black" />
                </TouchableOpacity>
                <Text style={MenuStyles.username}>User Name</Text>
            </View>

            <ScrollView
                horizontal={true}
                style={MenuStyles.scrollView}
                ref={scrollViewRef}
                contentContainerStyle={MenuStyles.scrollViewContent}
                showsHorizontalScrollIndicator={true}
                showsVerticalScrollIndicator={false}
                indicatorStyle="black"
            >
                {menuData.map((item, index) => (
                    <TouchableOpacity
                        key={item.id}
                        style={MenuStyles.button}
                        onPress={() => onSelectButtonHandler(item.id, index)}
                    >
                        <Text
                            style={[
                                MenuStyles.buttonText,
                                selectedButton === item.id ? MenuStyles.selectedButtonText : {},
                            ]}
                        >
                            {item.count} {item.name}
                        </Text>
                    </TouchableOpacity>
                ))}
            </ScrollView>
        </View>
    );
};

export default Menu;