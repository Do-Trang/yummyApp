import React, { useState, useEffect } from "react";
import { SafeAreaView } from "react-native";
import Menu from "../components/tab/Menu";
import UserList from "../components/listview/user-list/UserList";
import RestaurantList from "../components/listview/restaurant-list/RestaurantList";
import FoodList from "../components/listview/food-list/FoodList";
import client from '../utils/axios'

const ProfileDetailScreen = (props) => {
    console.log(props.route.params.followerCount);
    const [selectedButton, setSelectedButton] = useState("follower");

    const [followerCount, setFollowerCount] = useState(props.route.params.followerCount);
    const [followingCount, setFollowingCount] = useState(props.route.params.followingCount);
    const [favoriteFoodsCount, setFavoriteFoodsCount] = useState(props.route.params.swipedFoodsCount);
    const [favoriteRestaurantsCount, setFavoriteRestaurantsCount] = useState(props.route.params.swipedRestaurantsCount);

    const [followersData, setFollowersData] = useState(null);
    const [followingsData, setFollowingsData] = useState(null);
    const [swipedFoodsData, setSwipedFoodsData] = useState(null);
    const [swipedRestaurantsData, setSwipedRestaurantsData] = useState(null);

    useEffect(() => {
        setFollowerCount(props.followerCount);
        setFollowingCount(props.followingCount);
        setFavoriteFoodsCount(props.favoriteFoodsCount);
        setFavoriteRestaurantsCount(props.favoriteRestaurantsCount);
    }, [props.followerCount, props.followingCount, props.favoriteFoodsCount, props.favoriteRestaurantsCount]);

    useEffect(() => {
        handleFetchData(selectedButton);
    }, [selectedButton]);

    const handleDeleteItem = (type) => {
        switch (type) {
            case "follower":
                setFollowerCount((prev) => {
                    const newCount = prev - 1;
                    props.setFollowerCount(newCount);
                    return newCount;
                });
                break;
            case "following":
                setFollowingCount((prev) => {
                    const newCount = prev - 1;
                    props.setFollowingCount(newCount);
                    return newCount;
                });
                break;
            case "favoriteFoods":
                setFavoriteFoodsCount((prev) => prev - 1);
                setFavoriteFoodsCount((prev) => {
                    const newCount = prev - 1;
                    props.setFavoriteFoodsCount(newCount);
                    return newCount;
                });
                break;
            case "favoriteRestaurants":
                setFavoriteRestaurantsCount((prev) => {
                    const newCount = prev - 1;
                    props.setFavoriteRestaurantsCount(newCount);
                    return newCount;
                });
                break;
            default:
                break;
        }
    };

    const handleFetchData = (type) => {
        if (type === "follower" && !followersData) {
            client.get('/relations/followers')
                .then(response => setFollowersData(response.data))
                .catch(error => console.error('Error fetching followers:', error));
        } else if (type === "following" && !followingsData) {
            client.get('/relations/followings')
                .then(response => setFollowingsData(response.data))
                .catch(error => console.error('Error fetching followings:', error));
        } else if (type === "favoriteFoods" && !swipedFoodsData) {
            client.get('/swiped-foods')
                .then(response => setSwipedFoodsData(response.data.swipedFoods))
                .catch(error => console.error('Error fetching swiped foods:', error));
        } else if (type === "favoriteRestaurants" && !swipedRestaurantsData) {
            client.get('/swiped-restaurants')
                .then(response => setSwipedRestaurantsData(response.data.swipedRestaurants))
                .catch(error => console.error('Error fetching swiped restaurants:', error));
        }
    };
    

    const listData = {
        "follower": followersData || [],
        "following": followingsData || [],
        "favoriteFoods": swipedFoodsData || [],
        "favoriteRestaurants": swipedRestaurantsData || [],
    };

    // Render component tương ứng dựa trên selectedButton
    const renderList = () => {
        switch (selectedButton) {
            case "follower":
                return (
                    <UserList 
                        selectedButton={selectedButton}
                        listData={listData}
                        onDeleteItem={() => handleDeleteItem("follower")}
                    />
                );
            case "following":
                return (
                    <UserList 
                        selectedButton={selectedButton}
                        listData={listData}
                        onDeleteItem={() => handleDeleteItem("following")}
                    />
                );
            case "favoriteFoods":
                return (
                    <FoodList 
                        selectedButton={selectedButton}
                        listData={listData}
                        onDeleteItem={() => handleDeleteItem("favoriteFoods")}
                    />
                );
            case "favoriteRestaurants":
                return (
                    <RestaurantList 
                        selectedButton={selectedButton}
                        listData={listData}
                        onDeleteItem={() => handleDeleteItem("favoriteRestaurants")}
                    />
                );
            default:
                return null;
        }
    };

    return (
        <SafeAreaView style={{ flex: 1 }}>
            {/* Sử dụng component Menu */}
            <Menu 
                followerCount={props.route.params.followerCount}
                followingCount={props.route.params.followingCount}
                favoriteFoodsCount={props.route.params.swipedFoodsCount}
                favoriteRestaurantsCount={props.route.params.swipedRestaurantsCount}
                selectedButton={selectedButton}
                onSelectButton={setSelectedButton}
            />

            {/* Render List Tùy theo selectedButton */}
            {renderList()}
        </SafeAreaView>
    );
};

export default ProfileDetailScreen;