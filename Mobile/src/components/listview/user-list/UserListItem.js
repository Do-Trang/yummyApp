import React, { useState, useRef, useEffect } from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity, Dimensions, Animated } from "react-native";
import client from "../../../utils/axios";
import PersonalDetail from "../../modals/user-modal/UserModal";

const { height: windowHeight } = Dimensions.get('window');

const UserListItem = ({ username, id, avatar_url, onDelete, selectedButton }) => {
    const [isModalVisible, setModalVisible] = useState(false);
    const [personalDetails, setPersonalDetails] = useState(null);
    const modalPosition = useRef(new Animated.Value(windowHeight)).current;

    const buttonTitle = selectedButton === "follower" ? "Unfollow" : "Delete";

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
        client.get(`/profile/${id}`)
            .then(response => {
                setPersonalDetails(response.data);
                console.log(response.data);
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
                    source={{ uri: avatar_url }}
                    style={styles.image}
                />
                <View style={styles.textContainer}>
                    <Text style={styles.name}>{username}</Text>
                </View>
            </TouchableOpacity>
            {isModalVisible && (
                <PersonalDetail
                    modalPosition={modalPosition}
                    onClose={closeModal}
                    modalVisible={isModalVisible}
                    personalDetails={personalDetails}
                />
            )}
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
        fontSize: 17,
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