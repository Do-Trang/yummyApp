import React, { useState, useRef, useEffect } from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet, Dimensions, Animated } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import client from "../../../utils/axios";
import RestaurantDetail from "../../modals/restaurant-modal/RestaurantModal"

const { height: windowHeight } = Dimensions.get('window');

const RestaurantListItem = ({ id, name, image_url, onDelete }) => {
    const [isModalVisible, setModalVisible] = useState(false);
    const [restaurantDetails, setRestaurantDetails] = useState(null);
    const modalPosition = useRef(new Animated.Value(windowHeight)).current;

    const openModal = () => {
        setModalVisible(true);
        Animated.timing(modalPosition, {
            toValue: 0,
            duration: 900,
            useNativeDriver: true
        }).start();
    };

    const closeModal = () => {
        Animated.timing(modalPosition, {
            toValue: 0,
            duration: 900,
            useNativeDriver: true
        }).start(() => setModalVisible(false));
    };

    useEffect(() => {
        client.get(`/restaurants/${id}`)
            .then(response => {
                setRestaurantDetails(response.data);
            })
            .catch(error => {
                console.error("Error fetching food details:", error);
            });
    }, [id]);

    return (
        <View style={styles.itemContainer}>
            <TouchableOpacity 
                style={styles.infoContainer}
                onPress={openModal}
            >
                <Image
                    source={{ uri: image_url }}
                    style={styles.image}
                />
                <View style={styles.textContainer}>
                    <Text style={styles.name}>{name}</Text>
                </View>
            </TouchableOpacity>
            {isModalVisible && (
                <RestaurantDetail 
                    id={id} 
                    modalPosition={modalPosition}
                    onClose={closeModal}
                    modalVisible={isModalVisible}
                    restaurantDetails={restaurantDetails}
                />
            )}
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
    infoContainer: {
        flexDirection: "row",
        alignItems: "center",
        flex: 1,
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