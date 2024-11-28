import React, { useState, useEffect } from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import UserListItem from "./UserListItem";
import client from "../../../utils/axios"

const UserList = ({ selectedButton, listData, onDeleteItem }) => {
    const [data, setData] = useState(listData[selectedButton] || []);

    useEffect(() => {
        setData(listData[selectedButton] || []);
    }, [selectedButton, listData]);

    const handleDeleteItem = async (itemId) => {
        const apiEndpoint = selectedButton === "follower"
            ? `/relations/unfollow/${itemId}`
            : `/relations/deleteFollow/${itemId}`;

        client
            .delete(apiEndpoint)
            .then((response) => {
                if (response.status === 200) {
                    const updatedData = data.filter((item) => item.id !== itemId);
                    setData(updatedData);
                    onDeleteItem(selectedButton);
                }
            })
            .catch((error) => {
                console.error("Error deleting item:", error);
            });
    };

    return (
        <View style={styles.container}>
            {selectedButton === null ? (
                <Text style={styles.emptyText}>Please select a menu</Text>
            ) : (
                <FlatList
                    data={data}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => (
                        <UserListItem
                            username={item.username}
                            id={item.id}
                            avatar_url={item.avatar_url}
                            onDelete={() => handleDeleteItem(item.id)}
                            selectedButton={selectedButton}
                        />
                    )}
                />
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 20,
    },
    emptyText: {
        textAlign: "center",
        fontSize: 16,
        color: "#888",
    },
});

export default UserList;