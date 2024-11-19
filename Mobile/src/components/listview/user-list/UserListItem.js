import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";

const UserListItem = ({ name, id, avatar_url, onDelete, selectedButton }) => {
    // Xác định tiêu đề của nút dựa trên selectedButton
    const buttonTitle = selectedButton === "follower" ? "Unfollow" : "Delete";

    return (
        <View style={styles.itemContainer}>
            <Image
                source={{ uri: avatar_url }}
                style={styles.image}
            />
            <View style={styles.textContainer}>
                <Text style={styles.name}>{name}</Text>
            </View>
            <TouchableOpacity 
                onPress={() => onDelete(id)} 
                style={styles.button}
            >
                <Text style={styles.buttonText}>{buttonTitle}</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    itemContainer: {
        flexDirection: "row",
        alignItems: "center",
        padding: 10,
    },
    image: {
        width: 50,
        height: 50,
        borderRadius: 25,
        marginRight: 10,
        borderWidth: 1,
        borderColor: 'gray'
    },
    textContainer: {
        flex: 1,
    },
    name: {
        fontSize: 17,
        fontWeight: "bold",
    },
    id: {
        fontSize: 14,
        color: "#666",
    },
    button: {
        padding: 10,
        backgroundColor: "red",
        borderRadius: 5,
        justifyContent: "center",
        alignItems: "center",
        paddingVertical: 12,
        paddingHorizontal: 20,
    },
    buttonText: {
        color: "white",
        fontSize: 14,
    },
});

export default UserListItem;