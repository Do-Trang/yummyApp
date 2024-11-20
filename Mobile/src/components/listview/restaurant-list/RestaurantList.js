import React, { useState, useEffect } from "react";
import { View, FlatList, Text, StyleSheet } from "react-native";
import RestaurantListItem from "./RestaurantListItem";
import client from "../../../utils/axios"

const RestaurantList = ({ selectedButton, listData, onDeleteItem }) => {
    const [data, setData] = useState(listData[selectedButton] || []);

    useEffect(() => {
        setData(listData[selectedButton] || []);
    }, [selectedButton, listData]);

    const handleDeleteItem = async (itemId) => {
        client.delete('/swiped-restaurants/${itemId}')
            .then((response) => {
                if(response.status == 200) {
                    const updatedData = data.filter((item) => item.id !== itemId);
                    setData(updatedData);
                    onDeleteItem(selectedButton);
                }
            })
            .catch((error) => {
                console.error("Error deleting item:", error);
            })
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
                        <RestaurantListItem
                            id={item.id}
                            name={item.name}
                            image_url={item.image_url}
                            onDelete={() => handleDeleteItem(item.id)}
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

export default RestaurantList;