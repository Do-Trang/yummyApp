import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";

const RestaurantListItem = ({ id, name, image_url, onDelete }) => {
    return (
        <View style={styles.itemContainer}>
            <Image
                source={{ uri: image_url }}
                style={styles.image}
            />
            <View style={styles.textContainer}>
                <Text style={styles.name}>{name}</Text>
            </View>
            <TouchableOpacity 
                onPress={() => onDelete(id)}
                style={styles.iconButton}
            >
                <Ionicons name="trash-bin" size={24} color="red" />
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
        fontSize: 18,
        fontWeight: "bold",
    },
    iconButton: {
        padding: 10,
        borderRadius: 5,
        justifyContent: "center",
        alignItems: "center",
    },
});

export default RestaurantListItem;